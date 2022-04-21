import { useRef, useState } from "react";
import Envelope from "../envelope/Envelope";
import Keyboard from "../keyboard/Keyboard";
import LFOscillator from "../lfo/LFOscillator";
import Octave from "../octave/Octave";
import Oscillator from "../oscillator/Oscillator";
import Volume from "../volume/Volume";
import params from "./params";
import styles from "./Synth.module.css";

// because audioCtx and friends need to persist, we define them outside of component
var audioCtx = new AudioContext();
const globalVolume = new GainNode(audioCtx, {
  gain: params.globalVolume.init,
});
const osc1Amount = new GainNode(audioCtx, {
  gain: params.osc1.amount.init,
});
const osc2Amount = new GainNode(audioCtx, {
  gain: params.osc2.amount.init,
});
const ampEnvelope = new GainNode(audioCtx, {
  gain: 0, // distinct from knob value, we always want amp envelope to start at 0
});
const lfOscGain = new GainNode(audioCtx);

// the main synthesizer component
function Synth() {
  const [octave, setOctave] = useState(params.keyboardOctave);
  // these need to persist and get recreated in triggerNote so we define them here
  // oscillators can't be `start()`ed more than once, so we just recreate them each
  // time a note is triggered
  const osc1 = useRef(
    new OscillatorNode(audioCtx, {
      type: params.osc1.type,
    })
  );
  const osc2 = useRef(
    new OscillatorNode(audioCtx, {
      type: params.osc2.type,
    })
  );
  const lfOsc = useRef(
    new OscillatorNode(audioCtx, {
      frequency: params.lfo.freq.init,
      type: params.lfo.type,
    })
  );
  const env = useRef({
    attack: params.env.attack.init,
    decay: params.env.decay.init,
    sustain: params.env.sustain.init,
    release: params.env.release.init,
  });

  // callback for playing a note
  const triggerNote = (freq: number) => {
    // disconnect previous oscillators, to create monophonic behavior
    osc1.current.disconnect();
    osc2.current.disconnect();
    lfOsc.current.disconnect();
    // set note start time
    const time = audioCtx.currentTime;
    const noteLength =
      env.current.attack + env.current.decay + env.current.release;
    // set up amplitude envelope
    ampEnvelope.gain.cancelScheduledValues(time);
    ampEnvelope.gain.setValueAtTime(0, time);
    ampEnvelope.gain.linearRampToValueAtTime(1, time + env.current.attack);
    ampEnvelope.gain.linearRampToValueAtTime(
      env.current.sustain,
      time + env.current.attack + env.current.decay
    );
    ampEnvelope.gain.linearRampToValueAtTime(0, time + noteLength);
    // LFO
    lfOscGain.gain.setValueAtTime(1, time);
    lfOsc.current = new OscillatorNode(audioCtx, {
      type: lfOsc.current.type,
      frequency: lfOsc.current.frequency.value,
    });
    lfOsc.current.connect(lfOscGain.gain);
    // osc1 chain
    osc1.current = new OscillatorNode(audioCtx, {
      type: osc1.current.type,
      frequency: freq,
      detune: osc1.current.detune.value,
    });
    osc1.current
      .connect(osc1Amount)
      .connect(lfOscGain)
      .connect(ampEnvelope)
      .connect(globalVolume)
      .connect(audioCtx.destination);
    // osc2 chain
    osc2.current = new OscillatorNode(audioCtx, {
      type: osc2.current.type,
      frequency: freq,
      detune: osc2.current.detune.value,
    });
    osc2.current
      .connect(osc2Amount)
      .connect(lfOscGain)
      .connect(ampEnvelope)
      .connect(globalVolume)
      .connect(audioCtx.destination);
    // start/stop oscillators
    lfOsc.current.start(time);
    lfOsc.current.stop(time + noteLength);
    osc1.current.start(time);
    osc2.current.start(time);
    osc1.current.stop(time + noteLength);
    osc2.current.stop(time + noteLength);
  };

  return (
    <div id={styles.synth}>
      <div id={styles.globalParamWrapper}>
        <Octave
          name="octave"
          octave={params.keyboardOctave}
          setOctave={setOctave}
        />
        <Volume params={params.globalVolume} gainNode={globalVolume} />
        <LFOscillator
          params={params.lfo}
          setFreq={(value: number) => {
            lfOsc.current.frequency.value = value;
          }}
        />
      </div>
      <Oscillator
        name="osc1"
        params={params.osc1}
        oscNode={osc1}
        gainNode={osc1Amount}
      />
      <Oscillator
        name="osc2"
        params={params.osc2}
        oscNode={osc2}
        gainNode={osc2Amount}
      />
      <Envelope name="env" params={params.env} env={env} />
      <Keyboard
        height={150}
        width={500}
        octave={octave}
        triggerNote={triggerNote}
      />
    </div>
  );
}

export default Synth;

import { useRef } from "react";
import Envelope from "../envelope/Envelope";
import Keyboard from "../keyboard/Keyboard";
import Knob from "../knob/Knob";
import useKnobValue from "../knob/useKnobValue";
import Oscillator from "../oscillator/Oscillator";
import params from "./params";
import styles from "./Synth.module.css";

function Synth() {
  // to persist across renders, make these refs
  // for audio, it's crucial these don't change unnecessarily
  var audioCtxRef = useRef(new AudioContext());
  const globalVolume = useRef(
    new GainNode(audioCtxRef.current, {
      gain: params.globalVolume.init,
    })
  );
  const osc1 = useRef(
    new OscillatorNode(audioCtxRef.current, {
      type: params.osc1.type as OscillatorType,
    })
  );
  const osc1Amount = useRef(
    new GainNode(audioCtxRef.current, {
      gain: params.osc1.amount.init,
    })
  );
  const osc2 = useRef(
    new OscillatorNode(audioCtxRef.current, {
      type: params.osc2.type as OscillatorType,
    })
  );
  const osc2Amount = useRef(
    new GainNode(audioCtxRef.current, {
      gain: params.osc2.amount.init,
    })
  );

  // Below, we set and provide callbacks for the main synthesizer parameters.
  // We pass in initial parameter value, min, and max, and a callback for setting value
  // useKnobValue returns value and a callback to pass down to the knob component itself
  const { knobValue: volume, onKnobMouseDown: globalVolumeCallback } =
    useKnobValue({
      initValue: params.globalVolume.init,
      min: params.globalVolume.min,
      max: params.globalVolume.max,
      onChange: (value: number) => {
        globalVolume.current.gain.setValueAtTime(
          value,
          audioCtxRef.current.currentTime
        );
      },
    });

  // callback for playing a note
  const triggerNote = (freq: number) => {
    // osc1 chain
    osc1.current = new OscillatorNode(audioCtxRef.current, {
      type: osc1.current.type,
      frequency: freq,
      detune: osc1.current.detune.value,
    });
    osc1.current
      .connect(osc1Amount.current)
      .connect(globalVolume.current)
      .connect(audioCtxRef.current.destination);
    osc1.current.start(audioCtxRef.current.currentTime);
    osc1.current.stop(audioCtxRef.current.currentTime + 2);
    // osc2 chain
    osc2.current = new OscillatorNode(audioCtxRef.current, {
      type: osc2.current.type,
      frequency: freq,
      detune: osc2.current.detune.value,
    });
    osc2.current
      .connect(osc2Amount.current)
      .connect(globalVolume.current)
      .connect(audioCtxRef.current.destination);
    osc2.current.start(audioCtxRef.current.currentTime);
    osc2.current.stop(audioCtxRef.current.currentTime + 2);
  };

  return (
    <div id={styles.synth}>
      <Knob
        name="volume"
        value={volume}
        minValue={params.globalVolume.min}
        maxValue={params.globalVolume.max}
        onMouseDown={globalVolumeCallback}
      />
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
      <Envelope name="env" />
      <Keyboard
        height={150}
        width={500}
        octave={params.keyboardOctave}
        triggerNote={triggerNote}
      />
    </div>
  );
}

export default Synth;

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
  var audioCtxRef = useRef(new AudioContext());
  const volumeRef = useRef(
    new GainNode(audioCtxRef.current, {
      gain: params.globalVolume.init,
    })
  );
  // TODO: Refactor to pass these down to Oscillator component as props perhaps?
  // then move relevant useKnobValue calls into Oscillator component?
  const osc1Ref = useRef(
    new OscillatorNode(audioCtxRef.current, {
      type: params.osc1.type as OscillatorType,
    })
  );
  const osc1AmountRef = useRef(
    new GainNode(audioCtxRef.current, {
      gain: params.osc1.amount.init,
    })
  );
  const osc2Ref = useRef(
    new OscillatorNode(audioCtxRef.current, {
      type: params.osc2.type as OscillatorType,
    })
  );
  const osc2AmountRef = useRef(
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
        volumeRef.current.gain.setValueAtTime(
          value,
          audioCtxRef.current.currentTime
        );
      },
    });

  const { knobValue: osc1Amount, onKnobMouseDown: osc1AmountCallback } =
    useKnobValue({
      initValue: params.osc1.amount.init,
      min: params.osc1.amount.min,
      max: params.osc1.amount.max,
      onChange: (value: number) => {
        osc1AmountRef.current.gain.setValueAtTime(
          value,
          audioCtxRef.current.currentTime
        );
      },
    });

  const { knobValue: osc1Detune, onKnobMouseDown: osc1DetuneCallback } =
    useKnobValue({
      initValue: params.osc1.detune.init,
      min: params.osc1.detune.min,
      max: params.osc1.detune.max,
      onChange: (value: number) => {
        osc1Ref.current.detune.setValueAtTime(
          value,
          audioCtxRef.current.currentTime
        );
      },
    });

  const { knobValue: osc2Amount, onKnobMouseDown: osc2AmountCallback } =
    useKnobValue({
      initValue: params.osc2.amount.init,
      min: params.osc2.amount.min,
      max: params.osc2.amount.max,
      onChange: (value: number) => {
        osc2AmountRef.current.gain.setValueAtTime(
          value,
          audioCtxRef.current.currentTime
        );
      },
    });

  const { knobValue: osc2Detune, onKnobMouseDown: osc2DetuneCallback } =
    useKnobValue({
      initValue: params.osc2.detune.init,
      min: params.osc2.detune.min,
      max: params.osc2.detune.max,
      onChange: (value: number) => {
        osc2Ref.current.detune.setValueAtTime(
          value,
          audioCtxRef.current.currentTime
        );
      },
    });

  // callback for playing a note
  const triggerNote = (freq: number) => {
    // osc1 chain
    osc1Ref.current = new OscillatorNode(audioCtxRef.current, {
      type: osc1Ref.current.type,
      frequency: freq,
      detune: osc1Detune,
    });
    osc1Ref.current
      .connect(osc1AmountRef.current)
      .connect(volumeRef.current)
      .connect(audioCtxRef.current.destination);
    osc1Ref.current.start(audioCtxRef.current.currentTime);
    osc1Ref.current.stop(audioCtxRef.current.currentTime + 2);
    // osc2 chain
    osc2Ref.current = new OscillatorNode(audioCtxRef.current, {
      type: osc2Ref.current.type,
      frequency: freq,
      detune: osc2Detune,
    });
    osc2Ref.current
      .connect(osc2AmountRef.current)
      .connect(volumeRef.current)
      .connect(audioCtxRef.current.destination);
    osc2Ref.current.start(audioCtxRef.current.currentTime);
    osc2Ref.current.stop(audioCtxRef.current.currentTime + 2);
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
        amount={osc1Amount}
        amountMin={params.osc1.amount.min}
        amountMax={params.osc1.amount.max}
        amountCallback={osc1AmountCallback}
        detune={osc1Detune}
        detuneMin={params.osc1.detune.min}
        detuneMax={params.osc1.detune.max}
        detuneCallback={osc1DetuneCallback}
        type={params.osc1.type as OscillatorType}
        setType={(type: OscillatorType) => {
          osc1Ref.current.type = type;
        }}
      />
      <Oscillator
        name="osc2"
        amount={osc2Amount}
        amountMin={params.osc2.amount.min}
        amountMax={params.osc2.amount.max}
        amountCallback={osc2AmountCallback}
        detune={osc2Detune}
        detuneMin={params.osc2.detune.min}
        detuneMax={params.osc2.detune.max}
        detuneCallback={osc2DetuneCallback}
        type={params.osc2.type as OscillatorType}
        setType={(type: OscillatorType) => {
          osc2Ref.current.type = type;
        }}
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

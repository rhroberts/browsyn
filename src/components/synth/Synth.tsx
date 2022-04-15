import { useRef } from "react";
import Keyboard from "../keyboard/Keyboard";
import Knob from "../knob/Knob";
import useKnobValue from "../knob/useKnobValue";
import styles from "./Synth.module.css";

function Synth() {
  // parameters
  const volumeParams = { init: 0.5, min: 0, max: 1 };
  const octave = 3;

  // to persist across renders, make these refs
  var audioCtxRef = useRef(new AudioContext());
  const volumeRef = useRef(
    new GainNode(audioCtxRef.current, {
      gain: volumeParams.init,
    })
  );

  // callback for playing a note
  const triggerNote = (freq: number) => {
    const osc1 = new OscillatorNode(audioCtxRef.current, {
      type: "sine",
      frequency: freq,
    });
    osc1.connect(volumeRef.current).connect(audioCtxRef.current.destination);
    osc1.start(audioCtxRef.current.currentTime);
    osc1.stop(audioCtxRef.current.currentTime + 1);
  };

  // pass in initial parameter value, min, and max, and a callback for setting value
  // returns value and a callback to pass down to the knob component itself
  const { knobValue: volume, onKnobMouseDown } = useKnobValue({
    initValue: volumeParams.init,
    min: volumeParams.min,
    max: volumeParams.max,
    onChange: (value: number) => {
      volumeRef.current.gain.setValueAtTime(
        value,
        audioCtxRef.current.currentTime
      );
    },
  });

  return (
    <div id={styles.synth}>
      <Knob
        name="volume"
        value={volume}
        minValue={volumeParams.min}
        maxValue={volumeParams.max}
        onMouseDown={onKnobMouseDown}
        width={75}
      />
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

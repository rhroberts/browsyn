import Keyboard from "../keyboard/Keyboard";
import Knob from "../knob/Knob";
import useKnobValue from "../knob/useKnobValue";
import styles from "./Synth.module.css";

// parameters
const volumeParams = { init: 0.5, min: 0, max: 1 };
const octave = 3;

// to persist across renders, keep these out of Synth component
var audioCtx = new AudioContext();
const volumeNode = new GainNode(audioCtx, { gain: volumeParams.init });

// callback for playing a note
const triggerNote = (freq: number) => {
  const osc1 = new OscillatorNode(audioCtx, {
    type: "square",
    frequency: freq,
  });
  osc1.connect(volumeNode).connect(audioCtx.destination);
  osc1.start(audioCtx.currentTime);
  osc1.stop(audioCtx.currentTime + 2);
};

function Synth() {
  // pass in initial parameter value, min, and max, and a callback for setting value
  // returns value and a callback to pass down to the knob component itself
  const { knobValue: volume, onKnobMouseDown } = useKnobValue({
    initValue: volumeParams.init,
    min: volumeParams.min,
    max: volumeParams.max,
    onChange: (value: number) => {
      volumeNode.gain.value = value;
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
        height={100}
        width={350}
        octave={octave}
        triggerNote={triggerNote}
      />
    </div>
  );
}

export default Synth;

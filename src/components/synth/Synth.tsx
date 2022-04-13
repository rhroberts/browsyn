import Knob from "../knob/Knob";
import useKnobValue from "../knob/useKnobValue";
import styles from "./Synth.module.css";

function Synth(props: any) {
  const volumeParams = { init: 50, min: 0, max: 100 };

  // pass in initial parameter value, min, and max, and a callback for setting value
  // returns value and a callback to pass down to the knob component itself
  const { knobValue: volume, onKnobMouseDown } = useKnobValue({
    initValue: volumeParams.init,
    min: volumeParams.min,
    max: volumeParams.max,
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
    </div>
  );
}

export default Synth;

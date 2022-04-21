import Knob from "../knob/Knob";
import useKnobValue from "../knob/useKnobValue";
import styles from "./LFOscillator.module.css";

interface LFOParams {
  freq: {
    init: number;
    min: number;
    max: number;
  };
  type: OscillatorType;
}

function LFOscillator({
  params,
  setFreq,
}: {
  params: LFOParams;
  setFreq: Function;
}) {
  const { freq } = params;
  const { knobValue, onKnobMouseDown } = useKnobValue({
    initValue: freq.init,
    min: freq.min,
    max: freq.max,
    onChange: setFreq,
  });
  return (
    <div id={styles.lfo}>
      <Knob
        name="LFO"
        value={knobValue}
        minValue={freq.min}
        maxValue={freq.max}
        onMouseDown={onKnobMouseDown}
      />
    </div>
  );
}

export default LFOscillator;

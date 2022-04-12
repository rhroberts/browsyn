import { useState } from "react";
import Knob from "../knob/Knob";
import useKnobValue from "../knob/useKnobValue";
import styles from "./Synth.module.css";

function Synth(props: any) {
  const minVolume = 0;
  const maxVolume = 100;
  const [volume, setVolume] = useState(50);

  // pass in parameter value, min, and max, and a callback for setting value
  // returns a callback to pass down to the knob component itself
  const { onKnobMouseDown } = useKnobValue({
    value: volume,
    min: minVolume,
    max: maxVolume,
    setKnobValue: setVolume,
  });

  return (
    <div id={styles.synth}>
      <Knob
        name="volume"
        value={volume}
        minValue={minVolume}
        maxValue={maxVolume}
        onMouseDown={onKnobMouseDown}
        width={75}
      />
    </div>
  );
}

export default Synth;

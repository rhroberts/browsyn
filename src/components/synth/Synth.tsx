import Knob from "../knob/Knob";
import useKnobValue from "../knob/useKnobValue";
import styles from "./Synth.module.css";

function Synth(props: any) {
  const initialVolume = 75;

  const { knobValue: volume, onMouseDown } = useKnobValue({
    initialValue: initialVolume,
  });

  return (
    <div id={styles.synth}>
      <Knob name="volume" value={volume} onMouseDown={onMouseDown} width={75} />
    </div>
  );
}

export default Synth;

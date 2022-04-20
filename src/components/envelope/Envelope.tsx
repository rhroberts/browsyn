// Amplitude Envelope
import Knob from "../knob/Knob";
import styles from "./Envelope.module.css";

function Envelope({ name }: { name: string }) {
  return (
    <div className={styles.envelope}>
      <label>{name.toUpperCase()}</label>
      <Knob
        name="attack"
        value={0}
        minValue={0}
        maxValue={1}
        onMouseDown={() => {}}
      />
      <Knob
        name="decay"
        value={1}
        minValue={0}
        maxValue={1}
        onMouseDown={() => {}}
      />
      <Knob
        name="sustain"
        value={1}
        minValue={0}
        maxValue={1}
        onMouseDown={() => {}}
      />
      <Knob
        name="release"
        value={1}
        minValue={0}
        maxValue={1}
        onMouseDown={() => {}}
      />
    </div>
  );
}

export default Envelope;

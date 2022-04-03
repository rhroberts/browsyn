import { ReactComponent as KnobSvg } from "./knob.svg";
import styles from "./Knob.module.css";

function Knob() {
  return <KnobSvg className={styles.dial} />;
}

export default Knob;

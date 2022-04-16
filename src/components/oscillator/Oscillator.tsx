import { useEffect } from "react";
import Knob from "../knob/Knob";
import styles from "./Oscillator.module.css";

function Oscillator({
  name,
  amount,
  amountMin,
  amountMax,
  amountCallback,
  detune,
  detuneMin,
  detuneMax,
  detuneCallback,
  type,
  setType,
}: {
  name: string;
  amount: number;
  amountMin: number;
  amountMax: number;
  amountCallback: Function;
  detune: number;
  detuneMin: number;
  detuneMax: number;
  detuneCallback: Function;
  type: OscillatorType;
  setType: Function;
}) {
  useEffect(() => {
    const oscTypeEl = document.getElementById(
      styles.selectOscType
    ) as HTMLInputElement;
    oscTypeEl?.addEventListener("change", () => setType(oscTypeEl.value));
    return () => {
      oscTypeEl?.removeEventListener("change", () => setType(oscTypeEl.value));
    };
  }, [setType]);

  return (
    <div className={styles.oscillator}>
      <label>{name.toUpperCase()}</label>
      <Knob
        name="amount"
        value={amount}
        minValue={amountMin}
        maxValue={amountMax}
        onMouseDown={amountCallback}
      />
      <Knob
        name="detune"
        value={detune}
        minValue={detuneMin}
        maxValue={detuneMax}
        onMouseDown={detuneCallback}
      />
      <select id={styles.selectOscType}>
        <option value="sine">sine</option>
        <option value="square">square</option>
        <option value="sawtooth">sawtooth</option>
        <option value="triangle">triangle</option>
      </select>
    </div>
  );
}

export default Oscillator;

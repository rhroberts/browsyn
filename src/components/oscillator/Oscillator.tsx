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
  const oscSelectorId = `${name}Selector`; // css id
  useEffect(() => {
    const oscTypeEl = document.getElementById(
      oscSelectorId
    ) as HTMLInputElement;
    oscTypeEl?.addEventListener("change", () => setType(oscTypeEl.value));
    return () => {
      oscTypeEl?.removeEventListener("change", () => setType(oscTypeEl.value));
    };
  }, [setType, oscSelectorId]);

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
      <select defaultValue={type} id={oscSelectorId}>
        <option value="sine">sine</option>
        <option value="square">square</option>
        <option value="sawtooth">sawtooth</option>
        <option value="triangle">triangle</option>
      </select>
    </div>
  );
}

export default Oscillator;

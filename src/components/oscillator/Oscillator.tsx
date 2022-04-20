import { MutableRefObject, useEffect } from "react";
import Knob from "../knob/Knob";
import useKnobValue from "../knob/useKnobValue";
import styles from "./Oscillator.module.css";

interface OscillatorParams {
  amount: {
    init: number;
    min: number;
    max: number;
  };
  detune: {
    init: number;
    min: number;
    max: number;
  };
  type: OscillatorType;
}

function Oscillator({
  name,
  params,
  oscNode,
  gainNode,
}: {
  name: string;
  params: OscillatorParams;
  oscNode: MutableRefObject<OscillatorNode>;
  gainNode: MutableRefObject<GainNode>;
}) {
  const { amount, detune, type } = params;
  const { knobValue: knobAmount, onKnobMouseDown: knobAmountCallback } =
    useKnobValue({
      initValue: amount.init,
      min: amount.min,
      max: amount.max,
      onChange: (value: number) => {
        gainNode.current.gain.value = value;
      },
    });

  const { knobValue: knobDetune, onKnobMouseDown: knobDetuneCallback } =
    useKnobValue({
      initValue: detune.init,
      min: detune.min,
      max: detune.max,
      onChange: (value: number) => {
        oscNode.current.detune.value = value;
      },
    });

  const oscSelectorId = `${name}Selector`; // css id
  useEffect(() => {
    const setType = (type: OscillatorType) => {
      oscNode.current.type = type;
    };

    const oscTypeEl = document.getElementById(
      oscSelectorId
    ) as HTMLInputElement;
    oscTypeEl?.addEventListener("change", () =>
      setType(oscTypeEl.value as OscillatorType)
    );
    return () => {
      oscTypeEl?.removeEventListener("change", () =>
        setType(oscTypeEl.value as OscillatorType)
      );
    };
  }, [oscNode, oscSelectorId]);

  return (
    <div className={styles.oscillator}>
      <label>{name.toUpperCase()}</label>
      <Knob
        name="amount"
        value={knobAmount}
        minValue={amount.min}
        maxValue={amount.max}
        onMouseDown={knobAmountCallback}
      />
      <Knob
        name="detune"
        value={knobDetune}
        minValue={detune.min}
        maxValue={detune.max}
        onMouseDown={knobDetuneCallback}
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

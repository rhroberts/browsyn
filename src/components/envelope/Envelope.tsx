// Amplitude Envelope
import { MutableRefObject } from "react";
import Knob from "../knob/Knob";
import useKnobValue from "../knob/useKnobValue";
import styles from "./Envelope.module.css";

interface EnvParams {
  attack: {
    init: number;
    min: number;
    max: number;
  };
  decay: {
    init: number;
    min: number;
    max: number;
  };
  sustain: {
    init: number;
    min: number;
    max: number;
  };
  release: {
    init: number;
    min: number;
    max: number;
  };
}

interface EnvRef {
  attack: number;
  decay: number;
  sustain: number;
  release: number;
}

function Envelope({
  name,
  params,
  env,
}: {
  name: string;
  params: EnvParams;
  env: MutableRefObject<EnvRef>;
}) {
  const { attack, decay, sustain, release } = params;
  const { knobValue: knobAttack, onKnobMouseDown: knobAttackCallback } =
    useKnobValue({
      initValue: attack.init,
      min: attack.min,
      max: attack.max,
      onChange: (value: number) => {
        env.current.attack = value;
      },
    });
  const { knobValue: knobDecay, onKnobMouseDown: knobDecayCallback } =
    useKnobValue({
      initValue: decay.init,
      min: decay.min,
      max: decay.max,
      onChange: (value: number) => {
        env.current.decay = value;
      },
    });
  const { knobValue: knobSustain, onKnobMouseDown: knobSustainCallback } =
    useKnobValue({
      initValue: sustain.init,
      min: sustain.min,
      max: sustain.max,
      onChange: (value: number) => {
        env.current.sustain = value;
      },
    });
  const { knobValue: knobRelease, onKnobMouseDown: knobReleaseCallback } =
    useKnobValue({
      initValue: release.init,
      min: release.min,
      max: release.max,
      onChange: (value: number) => {
        env.current.release = value;
      },
    });
  return (
    <div className={styles.envelope}>
      <label>{name.toUpperCase()}</label>
      <Knob
        name="attack"
        value={knobAttack}
        minValue={attack.min}
        maxValue={attack.max}
        onMouseDown={knobAttackCallback}
      />
      <Knob
        name="decay"
        value={knobDecay}
        minValue={decay.min}
        maxValue={decay.max}
        onMouseDown={knobDecayCallback}
      />
      <Knob
        name="sustain"
        value={knobSustain}
        minValue={sustain.min}
        maxValue={sustain.max}
        onMouseDown={knobSustainCallback}
      />
      <Knob
        name="release"
        value={knobRelease}
        minValue={release.min}
        maxValue={release.max}
        onMouseDown={knobReleaseCallback}
      />
    </div>
  );
}

export default Envelope;

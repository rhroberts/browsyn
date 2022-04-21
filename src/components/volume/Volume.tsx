import Knob from "../knob/Knob";
import useKnobValue from "../knob/useKnobValue";
import styles from "./Volume.module.css";
interface VolumeParams {
  init: number;
  min: number;
  max: number;
}

function Volume({
  params,
  gainNode,
}: {
  params: VolumeParams;
  gainNode: GainNode;
}) {
  const { knobValue: volume, onKnobMouseDown } = useKnobValue({
    initValue: params.init,
    min: params.min,
    max: params.max,
    onChange: (value: number) => {
      gainNode.gain.value = value;
    },
  });
  return (
    <div id={styles.globalVolume}>
      <Knob
        name="volume"
        value={volume}
        minValue={params.min}
        maxValue={params.max}
        onMouseDown={onKnobMouseDown}
      />
    </div>
  );
}

export default Volume;

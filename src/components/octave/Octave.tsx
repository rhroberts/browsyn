import { useEffect } from "react";
import styles from "./Octave.module.css";

function Octave({
  name,
  octave,
  setOctave,
}: {
  name: string;
  octave: number;
  setOctave: Function;
}) {
  useEffect(() => {
    const octaveSelectorEl = document.getElementById(
      styles.octaveSelector
    ) as HTMLInputElement;
    octaveSelectorEl?.addEventListener("change", () =>
      setOctave(Number(octaveSelectorEl.value))
    );
    return () => {
      octaveSelectorEl?.removeEventListener("change", () =>
        setOctave(Number(octaveSelectorEl.value))
      );
    };
  }, [setOctave]);
  return (
    <div className={styles.octaveWrapper}>
      <label>{name}</label>
      <select defaultValue={octave} id={styles.octaveSelector}>
        <option value={0}>0</option>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
      </select>
    </div>
  );
}

export default Octave;

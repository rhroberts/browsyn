import { ReactComponent as BlackKeySvg } from "./blackkey.svg";
import { ReactComponent as WhiteKeySvg } from "./whitekey.svg";
import { ReactComponent as WhiteKeyBlackLeftSvg } from "./whitekey_blackleft.svg";
import { ReactComponent as WhiteKeyBlackRightSvg } from "./whitekey_blackright.svg";
import { ReactComponent as WhiteKeyBlackLeftRightSvg } from "./whitekey_blackleftright.svg";
import styles from "./Keyboard.module.css";
import { noteToFreq } from "./utils";
import { audioCtx } from "../../App";
import { FC } from "react";

function Keyboard(props: { octave: number }) {
  const octave = props.octave;
  return (
    <div id={styles.keyboard}>
      <Key octave={octave} note="C" keyComponent={WhiteKeyBlackRight} />
      <Key octave={octave} note="C#" keyComponent={BlackKey} />
      <Key octave={octave} note="D" keyComponent={WhiteKeyBlackLeftRight} />
      <Key octave={octave} note="D#" keyComponent={BlackKey} />
      <Key octave={octave} note="E" keyComponent={WhiteKeyBlackLeft} />
      <Key octave={octave} note="F" keyComponent={WhiteKeyBlackRight} />
      <Key octave={octave} note="F#" keyComponent={BlackKey} />
      <Key octave={octave} note="G" keyComponent={WhiteKeyBlackLeftRight} />
      <Key octave={octave} note="G#" keyComponent={BlackKey} />
      <Key octave={octave} note="A" keyComponent={WhiteKeyBlackLeftRight} />
      <Key octave={octave} note="A#" keyComponent={BlackKey} />
      <Key octave={octave} note="B" keyComponent={WhiteKeyBlackLeft} />
      <Key octave={octave + 1} note="C" keyComponent={WhiteKeyBlackRight} />
      <Key octave={octave + 1} note="C#" keyComponent={BlackKey} />
      <Key octave={octave + 1} note="D" keyComponent={WhiteKeyBlackLeftRight} />
      <Key octave={octave + 1} note="D#" keyComponent={BlackKey} />
      <Key octave={octave + 1} note="E" keyComponent={WhiteKeyBlackLeft} />
      <Key octave={octave + 1} note="F" keyComponent={WhiteKeyBlackRight} />
      <Key octave={octave + 1} note="F#" keyComponent={BlackKey} />
      <Key octave={octave + 1} note="G" keyComponent={WhiteKeyBlackLeftRight} />
      <Key octave={octave + 1} note="G#" keyComponent={BlackKey} />
      <Key octave={octave + 1} note="A" keyComponent={WhiteKeyBlackLeftRight} />
      <Key octave={octave + 1} note="A#" keyComponent={BlackKey} />
      <Key octave={octave + 1} note="B" keyComponent={WhiteKeyBlackLeft} />
      <Key octave={octave + 2} note="C" keyComponent={WhiteKey} />
    </div>
  );
}

function playNote(freq: number) {
  const osc1 = new OscillatorNode(audioCtx, {
    type: "square",
    frequency: freq,
  });
  osc1.connect(audioCtx.destination);
  osc1.start();
  setTimeout(() => osc1.stop(), 1000);
}

function Key(props: { octave: number; note: string; keyComponent: FC }) {
  const freq = noteToFreq(props.octave, props.note);
  return (
    <button className={styles.keyButton} onClick={() => playNote(freq)}>
      <props.keyComponent />
    </button>
  );
}

function BlackKey() {
  return (
    <div className={styles.blackKey}>
      <BlackKeySvg />
    </div>
  );
}

function WhiteKey() {
  return (
    <div className={styles.whiteKey}>
      <WhiteKeySvg />
    </div>
  );
}

function WhiteKeyBlackLeft() {
  return (
    <div className={styles.whiteKeyBlackLeft}>
      <WhiteKeyBlackLeftSvg />
    </div>
  );
}

function WhiteKeyBlackRight() {
  return (
    <div className={styles.whiteKeyBlackRight}>
      <WhiteKeyBlackRightSvg />
    </div>
  );
}

function WhiteKeyBlackLeftRight() {
  return (
    <div className={styles.whiteKeyBlackLeftRight}>
      <WhiteKeyBlackLeftRightSvg />
    </div>
  );
}

export default Keyboard;

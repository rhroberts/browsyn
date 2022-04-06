import { ReactElement } from "react";
import { playNote } from "../../synthesizer/synthesizer";
import styles from "./Keyboard.module.css";
import { noteToFreq } from "./utils";

function Keyboard({
  height,
  width,
  octave,
}: {
  height: number;
  width: number;
  octave: number;
}) {
  const keyHeight = height;
  const keyWidth = width / 15; // specific to a 25-key keyboard
  const blackKeyHeight = keyHeight * 0.55;
  const blackKeyWidth = keyWidth * 0.65;
  let whiteKeys: ReactElement[] = [
    "C",
    "D",
    "E",
    "F",
    "G",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "A",
    "B",
    "C",
  ].map((note, idx) => {
    let oct = octave + Math.floor(idx / 7);
    return (
      <Key
        octave={oct}
        note={note}
        keyHeight={keyHeight}
        keyWidth={keyWidth}
        xPos={keyWidth * idx}
        key={`${note}${oct}`} // unique component identifier
      />
    );
  });
  let skip = 0;
  let blackKeys: ReactElement[] = [
    "C#",
    "D#",
    "F#",
    "G#",
    "A#",
    "C#",
    "D#",
    "F#",
    "G#",
    "A#",
  ].map((note, idx) => {
    let oct = octave + Math.floor(idx / 5);
    if ([2, 5, 7].includes(idx)) skip++;
    return (
      <Key
        octave={oct}
        note={note}
        keyHeight={blackKeyHeight}
        keyWidth={blackKeyWidth}
        xPos={keyWidth * (idx + 1 + skip) - keyWidth / 3}
        key={`${note}${oct}`} // unique component identifier
      />
    );
  });
  return (
    <div id={styles.keyboard}>
      <svg height={height} width={width} stroke="#2f2f2f">
        <g id="whiteKeys" fill="#fff" strokeWidth={2}>
          {whiteKeys}
        </g>
        <g id="blackKeys" fill="#000" strokeWidth={2}>
          {blackKeys}
        </g>
      </svg>
    </div>
  );
}

function Key({
  octave,
  note,
  keyWidth,
  keyHeight,
  xPos,
}: {
  octave: number;
  note: string;
  keyWidth: number;
  keyHeight: number;
  xPos: number;
}) {
  const freq = noteToFreq(octave, note);
  return (
    <svg className={styles.key} onClick={() => playNote(freq)}>
      <rect x={xPos} y={0} rx={2} ry={2} width={keyWidth} height={keyHeight} />
    </svg>
  );
}

export default Keyboard;

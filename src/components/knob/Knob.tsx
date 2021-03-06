import { valueToRotation } from "./utils";
import styles from "./Knob.module.css";

function Knob({
  name,
  value,
  minValue,
  maxValue,
  onMouseDown,
}: {
  name: string;
  value: number;
  minValue: number;
  maxValue: number;
  onMouseDown: Function;
}) {
  const width = 75;
  const oct = width * (Math.sqrt(2) / 2); // special coordinate of octagon
  const dialPad = width * 0.025; // padding distance b/w dial and knob
  const dialLength = width * 0.2; // length of dial line
  // let rot = 0; // knob rotation angle in degrees
  // const rotMax = 270; // maximum knob rotation
  return (
    <div className={styles.knobWrapper}>
      <label className={styles.knobLabel}>{name.toUpperCase()}</label>
      <div className={styles.knob}>
        <svg
          version="1.1"
          width={width}
          height={width}
          xmlns="http://www.w3.org/2000/svg"
          onMouseDown={(e) => onMouseDown(e)}
        >
          <rect width="100%" height="100%" fill="transparent" />
          <g
            id="dial"
            stroke="#999"
            strokeWidth={width * 0.15}
            transform={`translate(${width * 0.5}, ${width * 0.5}) scale(0.4)`}
          >
            <line x1={width + dialPad} x2={width + dialLength} y1="0" y2="0" />
            <line
              x1={oct + dialPad}
              x2={oct + dialLength}
              y1={oct + dialPad}
              y2={oct + dialLength}
            />
            <line
              x1={-(oct + dialPad)}
              x2={-(oct + dialLength)}
              y1={oct + dialPad}
              y2={oct + dialLength}
            />
            <line
              x1={-(width + dialPad)}
              x2={-(width + dialLength)}
              y1="0"
              y2="0"
            />
            <line
              x1={-(oct + dialPad)}
              x2={-(oct + dialLength)}
              y1={-(oct + dialPad)}
              y2={-(oct + dialLength)}
            />
            <line
              x1="0"
              x2="0"
              y1={-(width + dialPad)}
              y2={-(width + dialLength)}
            />
            <line
              x1={oct + dialPad}
              x2={oct + dialLength}
              y1={-(oct + dialPad)}
              y2={-(oct + dialLength)}
            />
          </g>
          <g
            id="knob"
            transform={`rotate(${valueToRotation(value, minValue, maxValue)}, ${
              width * 0.5
            }, ${width * 0.5})`}
          >
            <polygon
              fill="#000"
              stroke="#444"
              strokeWidth={3}
              points={`${width} 0 ${oct} ${oct} 0 ${width} ${-oct} ${oct} ${-width} 0 ${-oct} ${-oct} 0 ${-width} ${oct} ${-oct}`}
              transform={`translate(${width * 0.5}, ${width * 0.5}) scale(0.4)`}
            />
            <circle
              cx={width * 0.5}
              cy={width * 0.5}
              r={width * 0.25}
              fill="#999"
            />
            <circle
              cx={width * 0.275}
              cy={width * 0.725}
              r={width * 0.04}
              fill="#fff"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}

export default Knob;

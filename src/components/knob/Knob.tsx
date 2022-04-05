import styles from "./Knob.module.css";

function mouseDownCallback(e: any) {
  console.log("mouse down!");
}

function mouseUpCallback(e: any) {
  console.log("mouse up!");
}

function Knob() {
  const dim = 200; // main dimension of svg
  const oct = dim * (Math.sqrt(2) / 2); // special coordinate of octagon
  const dialPad = dim * 0.025; // padding distance b/w dial and knob
  const dialLength = dim * 0.2; // length of dial line
  let rot = 0; // knob rotation angle in degrees
  const rotMax = 270; // maximum knob rotation
  return (
    <svg
      version="1.1"
      width={dim}
      height={dim}
      xmlns="http://www.w3.org/2000/svg"
      onMouseDown={mouseDownCallback}
      onMouseUp={mouseUpCallback}
    >
      <rect width="100%" height="100%" fill="transparent" />
      <g
        id="dial"
        stroke="#fff"
        strokeWidth={dim * 0.15}
        transform={`translate(${dim * 0.5}, ${dim * 0.5}) scale(0.4)`}
      >
        <line x1={dim + dialPad} x2={dim + dialLength} y1="0" y2="0" />
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
        <line x1={-(dim + dialPad)} x2={-(dim + dialLength)} y1="0" y2="0" />
        <line
          x1={-(oct + dialPad)}
          x2={-(oct + dialLength)}
          y1={-(oct + dialPad)}
          y2={-(oct + dialLength)}
        />
        <line x1="0" x2="0" y1={-(dim + dialPad)} y2={-(dim + dialLength)} />
        <line
          x1={oct + dialPad}
          x2={oct + dialLength}
          y1={-(oct + dialPad)}
          y2={-(oct + dialLength)}
        />
      </g>
      <g id="knob" transform={`rotate(${rot}, ${dim * 0.5}, ${dim * 0.5})`}>
        <polygon
          fill="#000"
          points={`${dim} 0 ${oct} ${oct} 0 ${dim} ${-oct} ${oct} ${-dim} 0 ${-oct} ${-oct} 0 ${-dim} ${oct} ${-oct}`}
          transform={`translate(${dim * 0.5}, ${dim * 0.5}) scale(0.4)`}
        />
        <circle cx={dim * 0.5} cy={dim * 0.5} r={dim * 0.25} fill="#999" />
        <circle cx={dim * 0.275} cy={dim * 0.725} r={dim * 0.04} fill="#fff" />
      </g>
    </svg>
  );
}

export default Knob;

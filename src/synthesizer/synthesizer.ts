import { audioCtx } from "../App";

function playNote(freq: number) {
  const osc1 = new OscillatorNode(audioCtx, {
    type: "square",
    frequency: freq,
  });
  osc1.connect(audioCtx.destination);
  osc1.start();
  setTimeout(() => osc1.stop(), 1000);
}

export { playNote };

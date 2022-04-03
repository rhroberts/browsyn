import "./App.css";
import Keyboard from "./components/keyboard/Keyboard";
import Knob from "./components/knob/Knob";

var audioCtx = new AudioContext();

let octave = 2;

function App() {
  return (
    <div className="App">
      <div>Hello</div>
      <Knob />
      <Keyboard octave={octave} />
    </div>
  );
}
console.log(audioCtx.state);

export default App;
export { audioCtx };

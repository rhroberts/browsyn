import "./App.css";
import Keyboard from "./components/keyboard/Keyboard";
import Knob from "./components/knob/Knob";

var audioCtx = new AudioContext();

let octave = 3;

function App() {
  return (
    <div className="App">
      <div>Hello</div>
      <Knob name="volume" width={75} />
      <Keyboard height={100} width={350} octave={octave} />
    </div>
  );
}

export default App;
export { audioCtx };

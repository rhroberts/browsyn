import "./App.css";
import Keyboard from "./components/keyboard/Keyboard";
import Synth from "./components/synth/Synth";

var audioCtx = new AudioContext();

let octave = 3;

function App() {
  return (
    <div className="App">
      <div>Hello</div>
      <Synth />
      <Keyboard height={100} width={350} octave={octave} />
    </div>
  );
}

export default App;
export { audioCtx };

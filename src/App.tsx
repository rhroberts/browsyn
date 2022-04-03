import "./App.css";
import Keyboard from "./components/keyboard/Keyboard";
import Knob from "./components/knob/Knob";

let octave = 4;

function App() {
  return (
    <div className="App">
      <div>Hello</div>
      <Knob />
      <Keyboard octave={octave} />
    </div>
  );
}

export default App;

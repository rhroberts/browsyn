import { calcKnobValue } from "./utils";
import { StateInterface } from "./useKnobValue";

enum knobReducerActions {
  start = "start",
  move = "move",
  stop = "stop",
}

interface ActionInterface {
  type: knobReducerActions;
  payload: MouseEvent;
}

const knobReducer =
  (onChange: Function) => (state: StateInterface, action: ActionInterface) => {
    switch (action.type) {
      case "start":
        return { ...state, isActive: true, pageY: action.payload.pageY };
      case "move":
        // const newVal = state.value + (state.pageY - action.payload.pageY);
        const { value, minValue, maxValue, pageY } = state;
        const newPageY = action.payload.pageY;
        const newValue = calcKnobValue(
          value,
          minValue,
          maxValue,
          pageY,
          newPageY
        );
        onChange(newValue);
        return { ...state, pageY: newPageY, value: newValue };
      case "stop":
        return { ...state, isActive: false };
      default:
        throw new Error("Not a valid action!");
    }
  };

export { knobReducer, knobReducerActions };

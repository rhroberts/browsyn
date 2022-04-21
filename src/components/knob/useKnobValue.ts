// Custom hook change value and set proper callbacks for Knob component
// We pass in initial parameter value, min, and max, and a callback for setting value
// useKnobValue returns value and a callback to pass down to the knob component itself
import { useEffect, useReducer } from "react";
import { calcKnobValue } from "./utils";

interface StateInterface {
  isActive: boolean;
  pageY: number;
  value: number;
  minValue: number;
  maxValue: number;
  onChange: Function;
}

enum actionTypes {
  start = "start",
  move = "move",
  stop = "stop",
}

interface ActionInterface {
  type: actionTypes;
  event: MouseEvent;
}

const knobReducer = (state: StateInterface, action: ActionInterface) => {
  switch (action.type) {
    case "start":
      return { ...state, isActive: true, pageY: action.event.pageY };
    case "move":
      const { value, minValue, maxValue, pageY } = state;
      const newPageY = action.event.pageY;
      const newValue = calcKnobValue(
        value,
        minValue,
        maxValue,
        pageY,
        newPageY
      );
      state.onChange(newValue);
      return { ...state, pageY: newPageY, value: newValue };
    case "stop":
      return { ...state, isActive: false };
    default:
      throw new Error("Not a valid action!");
  }
};

export default function useKnobValue({
  initValue,
  min,
  max,
  onChange,
}: {
  initValue: number;
  min: number;
  max: number;
  onChange: Function;
}) {
  const initialState: StateInterface = {
    isActive: false,
    pageY: 0,
    value: initValue,
    minValue: min,
    maxValue: max,
    onChange: onChange,
  };

  const [state, dispatch] = useReducer(knobReducer, initialState);

  const onMouseDown = (e: MouseEvent) =>
    dispatch({ type: actionTypes.start, event: e });
  const onMouseUpOrLeave = (e: MouseEvent) =>
    dispatch({ type: actionTypes.stop, event: e });
  const onMouseMove = (e: MouseEvent) =>
    dispatch({ type: actionTypes.move, event: e });

  useEffect(() => {
    if (state.isActive) {
      // add listeners to document body
      document.body.addEventListener("mousemove", onMouseMove);
      document.body.addEventListener("mouseup", onMouseUpOrLeave);
      document.body.addEventListener("mouseleave", onMouseUpOrLeave);
      // provide function to clean up listeners
      return () => {
        document.body.removeEventListener("mousemove", onMouseMove);
        document.body.removeEventListener("mouseup", onMouseUpOrLeave);
        document.body.removeEventListener("mouseleave", onMouseUpOrLeave);
      };
    }
  }, [state.isActive]);
  return { knobValue: state.value, onKnobMouseDown: onMouseDown };
}

import { useEffect, useReducer } from "react";
import { calcKnobValue } from "./utils";

interface StateInterface {
  isActive: boolean;
  pageY: number;
  value: number;
  minValue: number;
  maxValue: number;
}

enum actionTypes {
  start = "start",
  move = "move",
  stop = "stop",
}

interface ActionInterface {
  type: actionTypes;
  payload: MouseEvent;
}

const knobReducer =
  (onChange: Function) => (state: StateInterface, action: ActionInterface) => {
    switch (action.type) {
      case "start":
        return { ...state, isActive: true, pageY: action.payload.pageY };
      case "move":
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

export default function useKnobValue({
  value,
  min,
  max,
  setKnobValue,
}: {
  value: number;
  min: number;
  max: number;
  setKnobValue: Function;
}) {
  const initialState: StateInterface = {
    isActive: false,
    pageY: 0,
    value: value,
    minValue: min,
    maxValue: max,
  };

  const [state, dispatch] = useReducer(knobReducer(setKnobValue), initialState);

  const onMouseDown = (e: MouseEvent) =>
    dispatch({ type: actionTypes.start, payload: e });
  const onMouseUp = (e: MouseEvent) =>
    dispatch({ type: actionTypes.stop, payload: e });
  const onMouseMove = (e: MouseEvent) =>
    dispatch({ type: actionTypes.move, payload: e });

  useEffect(() => {
    if (state.isActive) {
      // add listeners to document body
      document.body.addEventListener("mousemove", onMouseMove);
      document.body.addEventListener("mouseup", onMouseUp);
      // provide function to clean up listeners
      return () => {
        document.body.removeEventListener("mousemove", onMouseMove);
        document.body.removeEventListener("mouseup", onMouseUp);
      };
    }
  }, [state.isActive]);
  return { onKnobMouseDown: onMouseDown };
}

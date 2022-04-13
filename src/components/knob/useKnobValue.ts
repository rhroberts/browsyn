import { useCallback, useEffect, useReducer } from "react";
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
}: {
  initValue: number;
  min: number;
  max: number;
}) {
  const initialState: StateInterface = {
    isActive: false,
    pageY: 0,
    value: initValue,
    minValue: min,
    maxValue: max,
  };

  const [state, dispatch] = useReducer(knobReducer, initialState);

  const onMouseDown = useCallback(
    (e: MouseEvent) => dispatch({ type: actionTypes.start, event: e }),
    []
  );
  const onMouseUp = (e: MouseEvent) =>
    dispatch({ type: actionTypes.stop, event: e });
  const onMouseMove = (e: MouseEvent) =>
    dispatch({ type: actionTypes.move, event: e });

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
  return { knobValue: state.value, onKnobMouseDown: onMouseDown };
}

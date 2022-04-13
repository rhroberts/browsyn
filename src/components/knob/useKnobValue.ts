import { useEffect, useReducer } from "react";
import { knobReducer, knobReducerActions } from "./knobReducer";

export interface StateInterface {
  isActive: boolean;
  pageY: number;
  value: number;
  minValue: number;
  maxValue: number;
}

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
    dispatch({ type: knobReducerActions.start, payload: e });
  const onMouseUp = (e: MouseEvent) =>
    dispatch({ type: knobReducerActions.stop, payload: e });
  const onMouseMove = (e: MouseEvent) =>
    dispatch({ type: knobReducerActions.move, payload: e });

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

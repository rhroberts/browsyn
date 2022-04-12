import { useEffect, useState } from "react";
import { calcKnobValue } from "./utils";

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
  const [isActive, setIsActive] = useState(false);
  const [initY, setInitY] = useState(0);

  const onMouseDown = (e: MouseEvent) => {
    setIsActive(true);
    setInitY(e.pageY);
  };

  const onMouseUp = () => {
    setIsActive(false);
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const newKnobValue = calcKnobValue(value, min, max, initY, e.pageY);
      // update initial Y to that of current value
      setInitY(e.pageY);
      setKnobValue(newKnobValue);
    };
    if (isActive) {
      // add listeners to document body
      document.body.addEventListener("mousemove", onMouseMove);
      document.body.addEventListener("mouseup", onMouseUp);
      // provide function to clean up listeners
      return () => {
        document.body.removeEventListener("mousemove", onMouseMove);
        document.body.removeEventListener("mouseup", onMouseUp);
      };
    }
  }, [isActive, initY, value, min, max, setKnobValue]);
  return { onKnobMouseDown: onMouseDown };
}

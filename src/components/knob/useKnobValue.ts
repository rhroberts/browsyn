import { useEffect, useState } from "react";

const coordsToKnobValue = (x1: number, y1: number, x2: number, y2: number) => {
  const knobValue = Math.sqrt(
    Math.pow(Math.abs(x2 - x1), 2) + Math.pow(Math.abs(y2 - y1), 2)
  );
  return knobValue;
};

export default function useKnobValue({
  initialValue,
}: {
  initialValue: number;
}) {
  const [isActive, setIsActive] = useState(false);
  const [initX, setInitX] = useState(0);
  const [initY, setInitY] = useState(0);
  const [knobValue, setKnobValue] = useState(initialValue);

  const onMouseDown = (e: MouseEvent) => {
    console.log("Down!", `pageX: ${e.pageX}, pageY: ${e.pageY}`);
    setIsActive(true);
    setInitX(e.pageX);
    setInitY(e.pageY);
  };
  const onMouseUp = () => {
    console.log("Up!");
    setIsActive(false);
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const knobValue = coordsToKnobValue(initX, initY, e.pageX, e.pageY);
      setKnobValue(knobValue);
      console.log("Moving"!, `pageX: ${e.pageX}, pageY: ${e.pageY}`);
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
  }, [isActive, initX, initY]);
  return { knobValue, onMouseDown };
}

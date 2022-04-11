import { useEffect, useState } from "react";

// const coordsToKnobValue = (x1: number, y1: number, x2: number, y2: number) => {
//   // normalize to 0 -> 100
//   const pointDistance = (x1: number, x2: number, y1: number, y2: number) => {
//     return Math.sqrt(
//       Math.pow(Math.abs(x2 - x1), 2) + Math.pow(Math.abs(y2 - y1), 2)
//     );
//   };
//   if (y1 < y2) {
//   }
//   const dragDistance = pointDistance(x1, x2, y1, y2);
//   const bodyDiag = pointDistance(
//     0,
//     0,
//     document.body.clientWidth,
//     document.body.clientHeight
//   );
//   return (dragDistance / bodyDiag) * 100;
// };

export default function useKnobValue({
  initialValue,
}: {
  initialValue: number;
}) {
  const [isActive, setIsActive] = useState(false);
  const [initY, setInitY] = useState(0);
  const [currentY, setCurrentY] = useState(0);

  const calcKnobValue = () => {
    const pageHeight = document.body.clientHeight;
    const diff = ((initY - currentY) / pageHeight) * 100;
    return initialValue + diff;
  };

  const onMouseDown = (e: MouseEvent) => {
    setIsActive(true);
    setInitY(e.pageY);
  };
  const onMouseUp = () => {
    setIsActive(false);
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setCurrentY(e.pageY);
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
  }, [isActive, initY]);
  return { knobValue: calcKnobValue(), onMouseDown };
}

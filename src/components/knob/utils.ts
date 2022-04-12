const MIN_ROT = 0;
const MAX_ROT = 270;

function clamp(val: number, min: number, max: number) {
  val = Math.round(val);
  if (val < min) return min;
  if (val > max) return max;
  return val;
}

function clampKnobRotation(rot: number) {
  return clamp(rot, MIN_ROT, MAX_ROT);
}

function calcKnobValue(initVal: number, initY: number, currentY: number) {
  // NOTE: this obviously isn't very robust, but good enough for prototyping
  const diff = initY - currentY;
  return clampKnobRotation(initVal + diff);
}

function rotationToValue(rot: number, min: number, max: number) {
  // convert angle to parameter value
  const value = (rot / (MAX_ROT - MIN_ROT)) * (max - min) + min;
  return clamp(value, min, max);
}

function valueToRotation(val: number, min: number, max: number) {
  // convert parameter value to angle
  const rot = (val / (max - min)) * (MAX_ROT - MIN_ROT) + MIN_ROT;
  return clampKnobRotation(rot);
}

export {
  clampKnobRotation,
  calcKnobValue,
  rotationToValue,
  valueToRotation,
  MIN_ROT,
  MAX_ROT,
};

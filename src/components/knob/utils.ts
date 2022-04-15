const MIN_ROT = 0;
const MAX_ROT = 270;
const VIEWPORT_HEIGHT = Math.max(
  document.documentElement.clientHeight || 0,
  window.innerHeight || 0
);

function clamp(val: number, min: number, max: number) {
  if (val < min) return min;
  if (val > max) return max;
  return val;
}

function clampKnobRotation(rot: number) {
  return clamp(rot, MIN_ROT, MAX_ROT);
}

function calcKnobValue(
  initVal: number,
  minVal: number,
  maxVal: number,
  initY: number,
  currentY: number
) {
  const normVal = initVal / (maxVal - minVal);
  const normPixDiff = (initY - currentY) / (VIEWPORT_HEIGHT / 4);
  const val = (normVal + normPixDiff) * (maxVal - minVal) + minVal;
  return clamp(Math.round(val * 100) / 100, minVal, maxVal);
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

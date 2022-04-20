const params = {
  globalVolume: { init: 0.5, min: 0, max: 1 },
  keyboardOctave: 3,
  osc1: {
    amount: {
      init: 0.5,
      min: 0,
      max: 0.5, // keep this low to prevent clipping
    },
    detune: {
      init: 0,
      min: -100,
      max: 100,
    },
    type: "sine" as OscillatorType,
  },
  osc2: {
    amount: {
      init: 0.1667,
      min: 0,
      max: 0.5, // keep this low to prevent clipping
    },
    detune: {
      init: 0,
      min: -100,
      max: 100,
    },
    type: "sawtooth" as OscillatorType,
  },
};

export default params;

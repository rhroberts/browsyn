const params = {
  globalVolume: { init: 0.5, min: 0, max: 1 },
  keyboardOctave: 2,
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
  env: {
    attack: {
      init: 0,
      min: 0,
      max: 1,
    },
    decay: {
      init: 0.3333,
      min: 0,
      max: 1,
    },
    sustain: {
      // pertains to gain level (all other env params are temporal)
      init: 0.5,
      min: 0,
      max: 1,
    },
    release: {
      init: 0.3333,
      min: 0,
      max: 1,
    },
  },
};

export default params;

# WebSynth

Name is TBD. A web-based synthesizer.

Possible names:

- Browbeat
  - better for a drum machine :p
- Browsyn

I'm imagining that this will be a collection of tools down the road, so perhaps
they should be namespaced somehow. For example, a namespace of "Carbon" would
give "Carbon Synth", "Carbon Kit", etc. Will wait for better inspiration to
strike though...

## Design

### Synth

- MIDI input?
  - Otherwise would need to provide a keyboard...
    - Might need this regardless for better useability and prototyping
  - I added a keyboard, but I'm struggling to find a good way to abstract out
    the actual synthesis part from the keyboard component...
    - For now, just going to keep any callbacks in a separate file and try to
      write them such that they aren't keyboard specific and could take MIDI
      data
      - Will write the actual MIDI functionality later, though
- Monophonic?
  - The way the Web Audio API works, this might not actually be very
    straightforward.
    - AFAIK no way to check if an OscillatorNode is playing to determinine
      whether or not to stop it when a new note is played
    - Can't just suspend the AudioContext, as it will continue from it's
      previous state once resumed and the original note will keep playing
- Two or three oscillators
  - each oscillator can be one of triangle, square, sin, etc. wave
- Amplitude Envelope
  - Good example
    [here](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Advanced_techniques)
  - `GainNode`
- Filters
  - Gain
    - `GainNode`
  - Delay
    - `DelayNode`
  - Reverb
    - `ConvolverNode`
  - Low-Pass Filter
    - `BiquadFilterNode`
  - Distortion
    - `WaveShaperNode`
  - (maybe) Compression
    - `DynamicsCompressorNode`
    - I doubt this will have a major effect on the sound, given that the levels
      generated from the `OscillatorNode` will be rather even.

### Application

#### Color Palette

- Background: #2f2f2f
- Foreground: #ffffff
- Accent 1: #fffa77
- Accent 2: #56eca6
- Accent 3: #3dbdd4

## Assets

- [x] Knob
  - [x] Knob itself
  - [x] Outer dial
- [ ] Button
- [x] Logo/Favicon
- [x] Keyboard (25-key)
  - [x] White Keys
    - [x] Black to left
    - [x] Black to right
    - [x] Black to left and right
    - [x] No Black
  - [x] Black Key

## Outstanding Questions

- Translating knob rotation to usable value
  - I've got the rotation bit figured out with the SVG
  - However, tracking the mouse events will be interesting...
    - Can add a callback for the `mousedown` event on the SVG element
    - But typically the user will drag outside of the element to change the
      value, so the `mousemove` and `mouseup` events needs to be on the document
      or some other higher up element
      - need to track initial XY coords and track distance dragged while
        converting to degrees for the knob itself
- Reproducing a monophonic behavior
- External MIDI input

let notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

function noteToFreq(octave: number, note: string) {
  // given the octive and name of a note, return the frequency in Hz.
  const halfSteps = halfStepsFromMiddleA(octave, note);
  return 440 * Math.pow(Math.pow(2, 1 / 12), halfSteps);
}

function halfStepsFromMiddleA(octave: number, note: string) {
  // given the octave and name of a note, return the number of half steps that
  // note is away from middle A. (What we refer to as "middle A" is the 9th index
  // of the 4th octave.)
  const noteIndex = notes.indexOf(note);
  return 12 * (octave - 4) + (noteIndex - 9);
}

export { noteToFreq, halfStepsFromMiddleA };

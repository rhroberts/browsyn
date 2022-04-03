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
  const midAOctave = 4;
  const midAIndex = 9;
  const noteIndex = notes.indexOf(note);
  const sign =
    octave < midAOctave || (octave === midAOctave && noteIndex < midAIndex)
      ? -1
      : 1;
  return (
    sign *
    (12 * Math.abs(midAOctave - octave) + Math.abs(midAIndex - noteIndex))
  );
}

export { noteToFreq, halfStepsFromMiddleA };

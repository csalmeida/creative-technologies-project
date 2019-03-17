import * as p5 from "p5"
import "p5/lib/addons/p5.sound"

/* === === === ===
P5 Function Group
=== === === === */

/* Creates a sound wave.
   Accepts a frequency and amplitude can be enabled.
*/
export const singleNote = (frequency = 200, amplitude = false) => {
  const wave = new p5.Oscillator()
  wave.setType("sine")
  if (amplitude) {
    wave.amp(0.1, 1)
  }
  wave.freq(frequency)
  wave.start()
  return wave
}

/* Creates a sound with predetermined duration.
   Every aspect can be configured through an option object.
*/
export const createEnvelope = (
  options = {
    attackLevel: 1.0,
    releaseLevel: 0,
    attackTime: 0.001,
    decayTime: 0.3,
    susPercent: 0.2,
    releaseTime: 0.5,
  },
) => {
  const envelope = new p5.Envelope()
  envelope.setADSR(
    options.attackTime,
    options.decayTime,
    options.susPercent,
    options.releaseTime,
  )
  envelope.setRange(options.attackLevel, options.releaseLevel)

  return envelope
}

/* Creates a sound mode, taking a note and envelope to set its properties.
   This function is deprecated.
*/
export const createSoundMode = (waveOptions, envelopeOptions) => {
  let envelope = envelope(envelopeOptions)
  singleNote(waveOptions).amp(envelope)
  return envelope
}

/* Stops all P5 notes passed to it. */
export const stopAllNotes = notes => {
  for (let index = 0; index < notes.length; index++) {
    const note = notes[index]
    note.stop()
  }
}

/* Mode with similar properties of the Theremin.
   Maps note frequency to the position of the arm.
*/
export const theremin = (poses, note) => {
  if (typeof poses[0] !== "undefined" && typeof poses[0].pose !== "undefined") {
    // Control sound signal (frequency) based on left wrist's position.
    note.freq(poses[0].pose.keypoints[9].position.x)
    console.log("Pose Data", poses[0])
  }
}

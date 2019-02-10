import * as p5 from "p5"
import "p5/lib/addons/p5.sound"

// Creating a sound wave.
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

export const createSoundMode = (waveOptions, envelopeOptions) => {
  let envelope = envelope(envelopeOptions)
  singleNote(waveOptions).amp(envelope)
  return envelope
}

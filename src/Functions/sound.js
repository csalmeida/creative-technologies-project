import * as p5 from "p5"
import "p5/lib/addons/p5.sound"
import * as Tone from "tone"

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
  if (notes !== undefined && Array.isArray(notes)) {
    for (let index = 0; index < notes.length; index++) {
      const note = notes[index]
      note.stop()
    }
  }
}

/* Mode with similar properties of the Theremin.
   Maps note frequency to the position of the arm.
*/
export const theremin = (poses, note) => {
  if (typeof poses[0] !== "undefined" && typeof poses[0].pose !== "undefined") {
    if (!Array.isArray(note) || note.length === 1) {
      note = note.length === 1 ? note[0] : note
      // Control sound signal (frequency) based on left wrist's position.
      note.freq(poses[0].pose.keypoints[9].position.x)
      console.log("Pose Data", poses[0])
    }

    if (Array.isArray(note) && note.length > 1) {
      // Control sound signal (frequency) of both wrists.
      note[0].freq(poses[0].pose.keypoints[9].position.y)
      note[1].freq(poses[0].pose.keypoints[0].position.x)
    }
  }
}

// export const sprinkles = (poses, notes) => {
//   switch (poses.length) {
//         case 1:
//           if (!this.posePlayedRoot) {
//             console.log("Pose played?", this.posePlayedRoot)
//             notes[1].play()
//             this.posePlayedRoot = true

//             this.posePlayedMinThird = false
//             this.posePlayedPerfectFifth = false
//             console.log(`Pose number is now: ${poses.length}
//         Previous was ${this.previousLength}
//         Root is ${this.posePlayedRoot}, Minor Third is ${
//               this.posePlayedMinThird
//             }, and Perfect Fifth is ${this.posePlayedPerfectFifth}`)
//             console.log("Poses: ", poses)
//           }
//           break
//         case 2:
//           if (!this.posePlayedMinThird) {
//             console.log("Pose played?", this.posePlayedMinThird)
//             notes[2].play()
//             this.posePlayedMinThird = true

//             this.posePlayedPerfectFifth = false
//             console.log(`Pose number is now: ${poses.length}
//         Previous was ${this.previousLength}
//         Root is ${this.posePlayedRoot}, Minor Third is ${
//               this.posePlayedMinThird
//             }, and Perfect Fifth is ${this.posePlayedPerfectFifth}`)
//             console.log("Poses: ", poses)
//           }
//           break
//         case 3:
//           if (!this.posePlayedPerfectFifth) {
//             console.log("Pose played?", this.posePlayedPerfectFifth)
//             notes[3].play()
//             this.posePlayedPerfectFifth = true
//             console.log(`Pose number is now: ${poses.length}
//         Previous was ${this.previousLength}
//         Root is ${this.posePlayedRoot}, Minor Third is ${
//               this.posePlayedMinThird
//             }, and Perfect Fifth is ${this.posePlayedPerfectFifth}`)
//             console.log("Poses: ", poses)
//           }

//         case 4 || 0:
//           this.posePlayedRoot = false
//           this.posePlayedMinThird = false
//           this.posePlayedPerfectFifth = false
//           console.log(`Pose number is now: ${poses.length}
//         Previous was ${this.previousLength}
//         Root is ${
//           this.posePlayedRoot
//         }, Minor Third is ${this.posePlayedMinThird}, and Perfect Fifth is ${this.posePlayedPerfectFifth}`)
//           console.log("Poses: ", poses)
//         default:
//           break
//       }

//       if (poses.length === 0) {
//         this.posePlayedRoot = false
//         console.log(`Pose number is now: ${poses.length}
//         Previous was ${this.previousLength}
//         Root is ${this.posePlayedRoot}, Minor Third is ${
//           this.posePlayedMinThird
//         }, and Perfect Fifth is ${this.posePlayedPerfectFifth}`)
//         console.log("Poses: ", poses)
//       }
// }

/* === === === ===
Tone Function Group
=== === === === */

/* Mode allows control of filters applied on pre made composition.
  Composition includes keys, bass and a membrane synth.
*/
export const synthComposition = () => {
  console.clear()

  var lowpass = new Tone.Filter(200, "lowpass").toMaster()
  let autoWah = new Tone.AutoWah(50, 6, -30).toMaster()
  let vibrato = new Tone.Vibrato().toMaster()
  var phaser = new Tone.Phaser({
    frequency: 20,
    octaves: 5,
    baseFrequency: 500,
  }).toMaster()

  const keys = {
    synth: new Tone.PolySynth(6, Tone.DuoSynth).connect(autoWah),
    notes: ["C4"],
    gain: new Tone.Gain(0.4),
  }

  keys.synth.connect(keys.gain)

  const bass = {
    synth: new Tone.DuoSynth().connect(vibrato),
    notes: ["C2", ["A2", "C2"], "Eb2", "G2", "Bb2"],
    gain: new Tone.Gain(0.6),
  }

  bass.synth.connect(bass.gain)

  const membrane = {
    synth: new Tone.MembraneSynth().connect(phaser),
    notes: ["C2", ["C2", "C2"], "C2", "C2", "C2"],
    gain: new Tone.Gain(0.2).toMaster(),
  }

  membrane.synth.connect(membrane.gain)
  membrane.synth.oscillator.type = "sine"

  const rhythmSeq = new Tone.Sequence(
    function(time, note) {
      membrane.synth.triggerAttackRelease(note, "4n", time)
    },
    membrane.notes,
    "4n",
  )

  const bassSeq = new Tone.Sequence(
    function(time, note) {
      bass.synth.triggerAttackRelease(note, "4n", time)
    },
    bass.notes,
    "4n",
  )

  let keysSeq = new Tone.Part(
    function(time, note) {
      keys.synth.triggerAttackRelease(note, "8n", time)
    },
    [[0, ["F3", "Ab3", "C3"]], ["0:2", ["C3", "Eb3", "G3"]], ["0:3:2", "G2"]],
  )
  keysSeq.loop = true

  rhythmSeq.start()
  bassSeq.start()
  keysSeq.start()

  return {
    effects: {
      lowpass,
      autoWah,
      vibrato,
      phaser,
    },
    sequence: {
      rhythmSeq,
      bassSeq,
      keysSeq,
    },
    toggle: Tone.Transport.toggle(),
  }
}

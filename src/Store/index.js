import { createStore } from "redux"
import rootReducer from "./Reducers"

const initialState = {
  videoStream: {
    width: 640,
    height: 480,
    camera: false,
    video: true,
    mirror: true,
    fullscreen: false,
    facingMode: "user",
    framerate: 30,
    aspectRatio: 2.5,
  },
  poseEstimation: {
    flipHorizontal: false,
    detectionType: "single",
    imageScaleFactor: 0.5,
    outputStride: 32,
    maxPoseDetections: 1,
    scoreThreshold: 0.5,
    nmsRadius: 20,
    multiplier: 1.01,
    output: {
      skeleton: true,
      color: "#f9e5de",
    },
  },
  soundMapping: {
    mode: "Synth Comp",
    synthComposition: {
      transport: false,
      lowpass: 200,
      autoWahQ: 0, // Up to 10.
      vibratoDepth: 0, // Up tp 1.
      phaserOctave: 6, // Up to 8.
      phaserBaseFrequency: 500, // Up to 1000.
    },
  },
}

export const Store = createStore(
  rootReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

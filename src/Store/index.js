import { createStore } from 'redux'
import rootReducer from './Reducers'

const initialState = {
  videoStream: {
    camera: false,
    video: false,
    mirror: false,
    fullscreen: false,
    facingMode: "user",
    framerate: 30
  },
  poseEstimation: {
    flipHorizontal: false,
    detectionType: 'single',
    imageScaleFactor: 0.50,
    outputStride: 16,
    maxPoseDetections: 5,
    scoreThreshold: 0.5,
    nmsRadius: 20, 
    output: {
      skeleton: false,
      color: "#FFFFFF",
    },
  },
  soundMapping: {}
}

export const Store = createStore(rootReducer, initialState,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
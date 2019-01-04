import { createStore } from 'redux'
import { VIDEOSTREAM } from './Actions/types'

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
    skeleton: false,
    color: "#FFFFFF",
    flipHorizontal: false,
    poseDetection: 'single',
    imageScaleFactor: 0.5,
    outputStride: 8
  },
  soundMapping: {}
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case VIDEOSTREAM.CAMERA_TOGGLE:
      return {
        ...state,
        videoStream: {
          camera: !state.videoStream.camera
        }
      }
      // return Object.assign({}, state, {
      //   videoStream: todos(state.todos, action)
      // })
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

export const Store = createStore(rootReducer, initialState,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
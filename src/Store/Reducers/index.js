import { VIDEOSTREAM } from '../Actions/types'

const rootReducer = (state = {}, action) => {
  switch (action.type) {
    case VIDEOSTREAM.CAMERA_TOGGLE:
      return {
        ...state,
        videoStream: {
          ...state.videoStream,
          camera: !state.videoStream.camera
        }
      }
      case VIDEOSTREAM.VIDEO_TOGGLE:
      return {
        ...state,
        videoStream: {
          ...state.videoStream,
          video: !state.videoStream.video
        }
      }
      case VIDEOSTREAM.MIRROR_TOGGLE:
      return {
        ...state,
        videoStream: {
          ...state.videoStream,
          mirror: !state.videoStream.mirror
        }
      }
      case VIDEOSTREAM.FULLSCREEN_TOGGLE:
      return {
        ...state,
        videoStream: {
          ...state.videoStream,
          fullscreen: !state.videoStream.fullscreen
        }
      }
      case VIDEOSTREAM.FACINGMODE_UPDATE:
      return {
        ...state,
        videoStream: {
          ...state.videoStream,
          facingMode: action.payload
        }
      }
      case VIDEOSTREAM.FRAMERATE_UPDATE:
      return {
        ...state,
        videoStream: {
          ...state.videoStream,
          framerate: action.payload
        }
      }
    default:
      return state
  }
}

export default rootReducer
import { VIDEOSTREAM } from "../Actions/types"

export default function reducer(state = null, action) {
  switch (action.type) {
    case VIDEOSTREAM.CAMERA_TOGGLE:
      return {
        ...state,
        camera: !state.camera,
      }
    case VIDEOSTREAM.VIDEO_TOGGLE:
      return {
        ...state,
        video: !state.video,
      }
    case VIDEOSTREAM.MIRROR_TOGGLE:
      return {
        ...state,
        mirror: !state.mirror,
      }
    case VIDEOSTREAM.FULLSCREEN_TOGGLE:
      return {
        ...state,
        fullscreen: !state.fullscreen,
      }
    case VIDEOSTREAM.FACINGMODE_UPDATE:
      return {
        ...state,
        facingMode: action.payload,
      }
    case VIDEOSTREAM.FRAMERATE_UPDATE:
      return {
        ...state,
        framerate: action.payload,
      }
    default:
      return state
  }
}

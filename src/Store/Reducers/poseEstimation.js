import { POSEESTIMATION } from '../Actions/types'

export default function reducer(state = null, action) {
  switch (action.type) {
    case POSEESTIMATION.SKELETON_TOGGLE:
      return {
        ...state,
        skeleton: !state.skeleton
      }
    case POSEESTIMATION.FLIPHORIZONTAL_TOGGLE:
      return {
        ...state,
        flipHorizontal: !state.flipHorizontal
      }
      case POSEESTIMATION.POSEDETECTION_UPDATE:
      return {
        ...state,
        poseDetection: action.payload
      }
      case POSEESTIMATION.IMAGESCALEFACTOR_UPDATE:
      return {
        ...state,
        imageScaleFactor: action.payload
      }
      case POSEESTIMATION.COLOR_UPDATE:
      return {
        ...state,
        color: action.payload
      }
      case POSEESTIMATION.OUTPUTSTRIDE_UPDATE:
      return {
        ...state,
        outputStride: action.payload
      }
    default:
      return state
  }
}
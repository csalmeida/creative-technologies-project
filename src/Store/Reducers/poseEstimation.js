import { POSEESTIMATION } from "../Actions/types"

export default function reducer(state = null, action) {
  switch (action.type) {
    case POSEESTIMATION.SKELETON_TOGGLE:
      return {
        ...state,
        output: {
          ...state.output,
          skeleton: !state.output.skeleton,
        },
      }
    case POSEESTIMATION.FLIPHORIZONTAL_TOGGLE:
      return {
        ...state,
        flipHorizontal: !state.flipHorizontal,
      }
    case POSEESTIMATION.DETECTIONTYPE_UPDATE:
      return {
        ...state,
        detectionType: action.payload,
      }
    case POSEESTIMATION.IMAGESCALEFACTOR_UPDATE:
      return {
        ...state,
        imageScaleFactor: action.payload,
      }
    case POSEESTIMATION.COLOR_UPDATE:
      return {
        ...state,
        output: {
          ...state.output,
          color: action.payload,
        },
      }
    case POSEESTIMATION.OUTPUTSTRIDE_UPDATE:
      return {
        ...state,
        outputStride: action.payload,
      }
    case POSEESTIMATION.MULTIPLIER_UPDATE:
      return {
        ...state,
        multiplier: action.payload,
      }
    case POSEESTIMATION.MINCONFIDENCE_UPDATE:
      return {
        ...state,
        minConfidence: action.payload,
      }
    case POSEESTIMATION.MAXPOSEDETECTIONS_UPDATE:
      return {
        ...state,
        maxPoseDetections: action.payload,
      }
    case POSEESTIMATION.NMSRADIUS_UPDATE:
      return {
        ...state,
        nmsRadius: action.payload,
      }
    case POSEESTIMATION.SCORETHRESHOLD_UPDATE:
      return {
        ...state,
        scoreThreshold: action.payload,
      }
    default:
      return state
  }
}

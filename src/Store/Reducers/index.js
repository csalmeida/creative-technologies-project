import { combineReducers } from "redux"
import videoStream from "./videoStream"
import poseEstimation from "./poseEstimation"
import soundMapping from "./soundMapping"

export default combineReducers({
  videoStream,
  poseEstimation,
  soundMapping,
})

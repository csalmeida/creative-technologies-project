import { combineReducers } from "redux"
import videoStream from "./videoStream"
import poseEstimation from "./poseEstimation"

export default combineReducers({
  videoStream,
  poseEstimation,
})

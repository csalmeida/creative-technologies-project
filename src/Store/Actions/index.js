import { VIDEOSTREAM } from './types'

// Action creator.
export function cameraToggle(toggle) {
  console.log("Video stream")
  return {
    type: VIDEOSTREAM.CAMERA_TOGGLE,
    payload: toggle
  }
}
import React, { Component, Fragment } from 'react'
import testFrame1 from '../../Assets/Images/test_frame_1_square.png'
import * as posenet from '@tensorflow-models/posenet'
const imageScaleFactor = 0.5;
const outputStride = 16;
const flipHorizontal = false;

async function estimatePoseOnImage(imageElement) {
  // load the posenet model from a checkpoint
  const net = await posenet.load()
  const pose = await net.estimateSinglePose(imageElement, imageScaleFactor, flipHorizontal, outputStride)
  return pose
}

class PoseNet extends Component {
  drawKeypoints(keypoints) {
    const canvas = this.canvas
    const context = canvas.getContext("2d")
    for (let i = 0; i < keypoints.length; i++) {
      context.beginPath()
      context.arc(
        keypoints[i].position.x,
        keypoints[i].position.y,
        5,0,2*Math.PI)
      context.fill()
    }
  }

  componentDidMount() {
    // running the code here is not working, try something else
    let pose = estimatePoseOnImage(this.image)
    .then((data) => {
      // Drawing has to occur when promise is fulfilled.
      this.drawKeypoints(data.keypoints)
    })
    console.log("Pose Estimation...")
    console.log(this.image)
    console.log("Pose data:", pose)

    // This code runs a video stream.
    // const video = this.video
    // navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    // .then(function(stream) {
    //     video.srcObject = stream
    //     video.play()
    //     console.log("Video is playing from component")
    // })
    // .catch(function(err) {
    //     console.log("An error occurred! " + err)
    // })
  }

  render() {
    return(
      <Fragment>
        <p>Hi from Posenet.</p>
        <img
          ref={ image => {
              this.image = image
          }}
          src={testFrame1}
          alt="Test frame."
          width="500"
          height="500"
           />
          <video
            ref={ video => {
                this.video = video
            }}
            width="500"
            height="500"
          >Video stream is not available.</video>
          <canvas
            ref={ canvas => {
                this.canvas = canvas
            }}
            width="500"
            height="500"
          >Canvas is not available in this browser.</canvas>
      </Fragment>
    )
  }
}

export default PoseNet

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
  //const pose = await net.estimateMultiplePoses(imageElement, imageScaleFactor, flipHorizontal, outputStride)
  return pose
}

class PoseNet extends Component {
  drawKeypoints(keypoints) {
    const canvas = this.canvas,
          context = canvas.getContext("2d"),
          radius = 2,
          startAngle = 0,
          endAngle = 2*Math.PI


    for (let i = 0; i < keypoints.length; i++) {
      context.beginPath()
      context.arc(
        keypoints[i].position.x,
        keypoints[i].position.y,
        radius,
        startAngle,
        endAngle)
      context.fill()
    }
  }

  screenInit(video) {
    const screen = this.screen
    screen.height = 500
    screen.width = 500
    let context = screen.getContext('2d')
    context.drawImage(video, 0, 0, screen.width, screen.height)
    console.log("Screen", screen);
  }

  componentDidMount() {
    // running the code here is not working, try something else
    const pose = estimatePoseOnImage(this.image)
    .then((data) => {
      // Drawing has to occur when promise is fulfilled.
      this.drawKeypoints(data[0].keypoints)
      this.screenInit(video)
      console.info("Points: ", data)
    })
    console.log("Pose Estimation...")
    console.log(this.image)
    console.log("Pose data:", pose)

    // This code runs a video stream.
    const video = this.video
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(function(stream) {
        video.srcObject = stream
        video.play()
        console.log("Video is playing from component")
    })
    .catch(function(err) {
        console.log("An error occurred! " + err)
    })
  }

  componentDidUpdate() {

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
            ref={ screen => {
                this.screen = screen
            }}
            width="500"
            height="500"
          >Canvas is not available in this browser.</canvas>
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

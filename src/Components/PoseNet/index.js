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
  componentDidMount() {
    // running the code here is not working, try something else
    let pose = estimatePoseOnImage(this.image)
    console.log("Pose Estimation...")
    console.log(this.image)
    console.log("Pose data:", pose)

    This code runs a video stream.
    const video = this.video
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(function(stream) {
        video.srcObject = stream;
        video.play();
        console.log("Video is playing from component");
    })
    .catch(function(err) {
        console.log("An error occurred! " + err);
    });


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
            width="500"
            height="500"
          ></canvas>
      </Fragment>
    )
  }
}

export default PoseNet

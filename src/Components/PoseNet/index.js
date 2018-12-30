import React, { Component, Fragment } from 'react'
import * as p5 from 'p5'
// Add .min for production version
import "p5/lib/addons/p5.dom"
import "p5/lib/addons/p5.sound"
import * as ml5 from 'ml5'
import { Container } from './styles'

const draw = (sketch, video, poses) => {
  sketch.resizeCanvas(sketch.windowWidth, sketch.windowHeight)
  sketch.image(video, 0, 0, sketch.windowWidth, sketch.windowHeight)
  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints(sketch, poses)
  drawSkeleton(sketch, poses)
}

// A function to draw ellipses over the detected keypoints
const drawKeypoints = (sketch, poses) => {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j]
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        sketch.fill(255,255,255)
        sketch.noStroke()
        sketch.ellipse(keypoint.position.x, keypoint.position.y, 10, 10)
      }
    }
  }
}

// A function to draw the skeletons
const drawSkeleton = (sketch, poses) => {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0]
      let partB = skeleton[j][1]
      sketch.stroke(255,255,255)
      sketch.line(partA.position.x, partA.position.y, partB.position.x, partB.position.y)
    }
  }
}

class PoseNet extends Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
  }

  componentDidMount() {
    // const wave = new p5.Oscillator()
    // wave.setType("sine")
    // wave.start()
    // wave.amp(0.1, 1)
    // wave.freq(200)
    // console.log("Wave", wave)

    const sketch = new p5(() => {}, this.container.current)
    sketch.createCanvas(640, 480)
    const constraints = {
      video: {
        width: sketch.width,
        height: sketch.height,
        facingMode: undefined,
        frameRate: 30,
        aspectRatio: 2.5,
      },
      audio: false
    }
    const video = sketch.createCapture(constraints, p5.VIDEO)
    // console.log("width", sketch.width, "height", sketch.height);
    // console.log("P5 Video", sketch.VIDEO);
    video.size(sketch.windowWidth, sketch.windowHeight)


    // Detects pose and hides video
    const poseOptions = { 
      imageScaleFactor: 0.2,
      outputStride: 16,
      flipHorizontal: false,
      minConfidence: 0.5,
      maxPoseDetections: 5,
      scoreThreshold: 0.5,
      nmsRadius: 20,
      detectionType: 'single',
      multiplier: 0.75,
     }
    const poseNet = ml5.poseNet(video, poseOptions)
    poseNet.on('pose', function(poses) {
      if (typeof poses[0] !== 'undefined' && typeof poses[0].pose !== 'undefined') {
        // Control sound signal (frequency)
        // console.log("Poses", poses[0].pose.keypoints[0].position.x)
        // wave.freq(poses[0].pose.keypoints[0].position.x)
      }
      draw(sketch, video, poses)
    })
    video.hide()

  }

  render() {
    return(
      <Fragment>
        <Container ref={this.container} />
      </Fragment>
    )
  }
}

export default PoseNet

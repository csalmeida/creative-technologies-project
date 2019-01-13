import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import * as p5 from 'p5'
// Add .min for production version (this will turn off debug mode)
import "p5/lib/addons/p5.dom"
import "p5/lib/addons/p5.sound"
import * as ml5 from 'ml5'
import { Container } from './styles'

import { draw } from '../../Functions'

class PoseNet extends Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
  }

  startPoseDetection = () => {
    // Creating a sound wave.
    // const wave = new p5.Oscillator()
    // wave.setType("sine")
    // wave.start()
    // wave.amp(0.1, 1)
    // wave.freq(200)
    // console.log("Wave", wave)

    console.log("Props on poseDetection: ", this.props)

    const sketch = new p5(() => {}, this.container.current)
    sketch.createCanvas(this.props.videoStream.width, this.props.videoStream.height)
    const constraints = {
      video: {
        width: sketch.width,
        height: sketch.height,
        facingMode: this.props.videoStream.facingMode,
        frameRate: this.props.videoStream.frameRate,
        aspectRatio: this.props.videoStream.aspectRatio,
      },
      audio: false
    }
    const video = sketch.createCapture(constraints, p5.VIDEO)
    // console.log("width", sketch.width, "height", sketch.height);
    // console.log("P5 Video", sketch.VIDEO);
    // This affects the size of the video size. Use .windowWidth and .windowHeight to make it larger. 
    video.size(sketch.width, sketch.height)
    const color = this.props.poseEstimation.output.color
    const drawOptions = {
      skeleton: this.props.poseEstimation.output.skeleton,
      video: this.props.videoStream.video
    }
    console.log(color)

    // Detects pose and hides video
    // This can come from the store now.
    const poseOptions = { 
      ...this.poseEstimation
      // imageScaleFactor: 0.2,
      // outputStride: 16,
      // flipHorizontal: false,
      // //minConfidence: 0.5,
      // maxPoseDetections: 5,
      // scoreThreshold: 0.5,
      // nmsRadius: 20,
      // detectionType: 'single',
      // multiplier: 1.01,
    }
    const poseNet = ml5.poseNet(video, poseOptions)
    poseNet.on('pose', function(poses) {
      if (typeof poses[0] !== 'undefined' && typeof poses[0].pose !== 'undefined') {
        // Control sound signal (frequency)
        // console.log("Poses", poses[0].pose.keypoints[0].position.x)
        // wave.freq(poses[0].pose.keypoints[0].position.x)
      }
      draw(sketch, video, poses, color, drawOptions)
    })
    video.hide()
  }

  componentDidUpdate() {
    this.props.videoStream.camera &&
    this.startPoseDetection()
  }

  render() {
    return(
      this.props.videoStream.camera ? (
      <Fragment>
        <Container ref={this.container} mirror={this.props.videoStream.mirror} />
      </Fragment>
      ) : (
        <p>Camera off.</p>
      )
    )
  }
}

const mapStateToProps = (state) => ({
  videoStream: state.videoStream,
  poseEstimation: state.poseEstimation,
})

export default connect(mapStateToProps, null)(PoseNet)

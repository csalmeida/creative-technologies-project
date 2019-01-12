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

  componentDidMount() {
    // Creating a sound wave.
    // const wave = new p5.Oscillator()
    // wave.setType("sine")
    // wave.start()
    // wave.amp(0.1, 1)
    // wave.freq(200)
    // console.log("Wave", wave)

    console.log("Props on mount: ", this.props)

    const sketch = new p5(() => {}, this.container.current)
    sketch.createCanvas(this.props.videoStream.width, this.props.videoStream.width)
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
    video.size(sketch.windowWidth, sketch.windowHeight)
    const color = this.props.poseEstimation.output.color
    console.log(color)

    // Detects pose and hides video
    // This can come from the store now.
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
      draw(sketch, video, poses, color)
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

const mapStateToProps = (state) => ({
  videoStream: state.videoStream,
  poseEstimation: state.poseEstimation,
})

export default connect(mapStateToProps, null)(PoseNet)

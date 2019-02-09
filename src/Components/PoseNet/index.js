import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import * as p5 from "p5"
// Add .min for production version (this will turn off debug mode)
import "p5/lib/addons/p5.dom"
import "p5/lib/addons/p5.sound"
import * as ml5 from "ml5"
import { Container } from "./styles"

import { draw } from "../../Functions"
import { singleNote, envelope, createEnvelope } from "../../Functions/sound"

class PoseNet extends Component {
  constructor(props) {
    super(props)
    this.container = React.createRef()
  }

  startPoseDetection = () => {
    // Creating a sound wave.
    // const modeOne = singleNote(false)
    // this.modeOne = modeOne
    const modeTwo = createEnvelope()
    singleNote(false).amp(modeTwo)
    this.modeTwo = modeTwo

    console.log("Props on poseDetection: ", this.props)

    const sketch = new p5(() => {}, this.container.current)
    sketch.createCanvas(
      this.props.videoStream.width,
      this.props.videoStream.height,
    )
    const constraints = {
      video: {
        width: sketch.width,
        height: sketch.height,
        facingMode: this.props.videoStream.facingMode,
        frameRate: this.props.videoStream.frameRate,
        aspectRatio: this.props.videoStream.aspectRatio,
      },
      audio: false,
    }
    this.video = sketch.createCapture(constraints, p5.VIDEO)
    const video = this.video
    // console.log("width", sketch.width, "height", sketch.height);
    // console.log("P5 Video", sketch.VIDEO);
    // This affects the size of the video size. Use .windowWidth and .windowHeight to make it larger. Required value to be changed on draw as well.
    video.size(sketch.width, sketch.height)
    const color = this.props.poseEstimation.output.color
    const drawOptions = {
      skeleton: this.props.poseEstimation.output.skeleton,
      video: this.props.videoStream.video,
    }
    console.log(color)
    video.hide()
    console.log("Video: ", video)

    // Detects pose and hides video
    // This can come from the store now.
    const poseOptions = {
      ...this.props.poseEstimation,
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

    this.posePlayedFirst = false

    const poseNet = ml5.poseNet(video, poseOptions, () => {
      console.log("model ready")
    })
    console.log("PoseNet", poseNet)
    window.x = poseNet
    poseNet.on("pose", function(poses) {
      if (
        typeof poses[0] !== "undefined" &&
        typeof poses[0].pose !== "undefined"
      ) {
        // Control sound signal (frequency)
        //modeOne.freq(poses[0].pose.keypoints[9].position.x)
        if (!this.posePlayed) {
          console.log("Pose played?", this.posePlayed)
          modeTwo.play()
          this.posePlayed = true
          console.log("Pose played?", this.posePlayed)
        }
        // console.log('Pose Data', poses[0])
      }

      if (
        typeof poses[1] !== "undefined" &&
        typeof poses[1].pose !== "undefined"
      ) {
        if (!this.posePlayed) {
          console.log("Pose played?", this.posePlayed)
          modeTwo.play()
          this.posePlayed = true
          console.log("Pose played?", this.posePlayed)
        }
      }

      if (poses.length === 0) {
        this.posePlayed = false
      }

      draw(sketch, video, poses, color, drawOptions)
    })

    // console.log('Detection type: ', poseNet.detectionType)
  }

  // componentDidUpdate() {
  //   this.props.videoStream.camera &&
  //   this.startPoseDetection()
  // }

  stopPoseDetection() {
    this.video.stop()
    // Turn sounds off here as well.
    // this.modeOne.stop()
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.videoStream.camera && this.props.videoStream.camera) {
      this.startPoseDetection()
    }

    if (prevProps.videoStream.camera && !this.props.videoStream.camera) {
      this.stopPoseDetection()
    }
  }

  render() {
    return this.props.videoStream.camera ? (
      <Fragment>
        <Container
          ref={this.container}
          mirror={this.props.videoStream.mirror}
        />
      </Fragment>
    ) : (
      <p>Camera off.</p>
    )
  }
}

const mapStateToProps = state => ({
  videoStream: state.videoStream,
  poseEstimation: state.poseEstimation,
})

export default connect(
  mapStateToProps,
  null,
)(PoseNet)

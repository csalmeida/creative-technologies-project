import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import * as p5 from "p5"
// Add .min for production version (this will turn off debug mode)
import "p5/lib/addons/p5.dom"
import * as ml5 from "ml5"
import { Container, Message } from "./styles"

import { drawColorMapping } from "../../Functions/draw"
import {
  singleNote,
  stopAllNotes,
  theremin,
  synthComposition,
  updateSynthCompEffects,
} from "../../Functions/sound"
import { palette } from "../../Styles/colors"

class PoseNet extends Component {
  constructor(props) {
    super(props)
    // Reference of a custom element to hold the sketch.
    this.container = React.createRef()
  }

  startPoseDetection = () => {
    const soundMode = this.props.soundMapping.mode
    let notes = []
    const synthComp = synthComposition()
    this.synthComp = synthComp

    if (soundMode === "theremin") {
      notes = [singleNote(220.0, false)]
      this.notes = notes
    }

    if (soundMode === "synth comp") {
      this.synthComp.transport.start()
      window.tone = this.synthComp
    }

    window.p5 = p5

    console.log("Props on poseDetection: ", this.props)

    const sketch = new p5(() => {}, this.container.current)
    sketch.createCanvas(
      this.props.videoStream.width,
      this.props.videoStream.height,
    )
    window.sketch = sketch
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
    }

    const poseNet = ml5.poseNet(video, poseOptions, () => {
      console.log("model ready")
    })
    console.log("PoseNet", poseNet)
    window.x = poseNet
    window.poseEstimation = this.props.poseEstimation
    poseNet.on("pose", function(poses) {
      //console.log("Pose value: ", poses[0].pose.keypoints[9].position.y)
      if (
        typeof poses[0] !== "undefined" &&
        typeof poses[0].pose !== "undefined"
      ) {
        if (soundMode === "theremin") {
          theremin(poses, notes[0])
        }

        if (soundMode === "synth comp") {
          let effects = {
            autoWahQ: sketch.map(
              poses[0].pose.keypoints[13].position.x,
              10,
              sketch.width,
              0,
              8,
              true,
            ), // Up to 10.
            vibratoDepth: sketch.map(
              poses[0].pose.keypoints[14].position.x,
              10,
              sketch.width,
              0,
              1,
              true,
            ), // Up tp 1.
            phaserOctave: sketch.map(
              poses[0].pose.keypoints[10].position.y,
              0,
              sketch.height,
              8,
              1,
              true,
            ), // Up to 8.
            phaserBaseFrequency: sketch.map(
              poses[0].pose.keypoints[9].position.y,
              0,
              sketch.height,
              1000,
              100,
              true,
            ), // Up to 1000.
          }
          updateSynthCompEffects(synthComp, effects)
        }
        drawColorMapping(sketch, video, poses, palette.highlight, drawOptions)
      }
    })
    // console.log('Detection type: ', poseNet.detectionType)
  }

  // Turns off video and sound.
  stopPoseDetection() {
    this.video.stop()
    if (this.props.soundMapping.mode === "theremin") {
      stopAllNotes(this.notes)
    }

    if (this.props.soundMapping.mode === "synth comp") {
      this.synthComp.transport.stop()
    }
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
      <Message>Turn camera on to start.</Message>
    )
  }
}

const mapStateToProps = state => ({
  videoStream: state.videoStream,
  poseEstimation: state.poseEstimation,
  soundMapping: state.soundMapping,
})

export default connect(
  mapStateToProps,
  null,
)(PoseNet)

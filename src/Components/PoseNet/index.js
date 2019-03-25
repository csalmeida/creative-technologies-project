import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import * as p5 from "p5"
// Add .min for production version (this will turn off debug mode)
import "p5/lib/addons/p5.dom"
import "p5/lib/addons/p5.sound"
import * as ml5 from "ml5"
import { Container, Message } from "./styles"

import { drawColorMapping } from "../../Functions/draw"
import {
  stopAllNotes,
  theremin,
  synthComposition,
  updateSynthCompEffects,
} from "../../Functions/sound"
import { palette } from "../../Styles/colors"

class PoseNet extends Component {
  constructor(props) {
    super(props)
    this.container = React.createRef()
  }

  startPoseDetection = () => {
    // const notes = [singleNote(220.0 , false)]
    // this.notes = notes
    const synthComp = synthComposition()
    this.synthComp = synthComp
    // updateSynthCompEffects(this.synthComp, this.props.soundMapping.synthComposition.effect)
    this.synthComp.transport.start()
    window.tone = this.synthComp
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
      // Mode 1 and 3.
      //theremin(poses, notes[0])
      //   window.poses = poses
      //   //console.log("Poses: ", poses)

      if (
        typeof poses[0] !== "undefined" &&
        typeof poses[0].pose !== "undefined"
      ) {
        let effects = {
          autoWahQ: 0, // Up to 10.
          vibratoDepth: 0, // Up tp 1.
          phaserOctave: 2, // Up to 8.
          phaserBaseFrequency: poses[0].pose.keypoints[0].position.x, // Up to 1000.}
        }

        updateSynthCompEffects(synthComp, effects)
        drawColorMapping(sketch, video, poses, palette.highlight, drawOptions)
      }
    })
    // console.log('Detection type: ', poseNet.detectionType)
  }

  // Turns off video and sound.
  stopPoseDetection() {
    this.video.stop()
    console.log("Notes: ", this.notes)
    stopAllNotes(this.notes)
    this.synthComp.transport.stop()
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

// const mapDispatchToProps = dispatch => {
//   return {
//     alternate(toggle, type) {
//       dispatch(alternate(toggle, type))
//     },
//   }
// }

export default connect(
  mapStateToProps,
  null,
)(PoseNet)

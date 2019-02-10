import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import * as p5 from "p5"
// Add .min for production version (this will turn off debug mode)
import "p5/lib/addons/p5.dom"
import "p5/lib/addons/p5.sound"
import * as ml5 from "ml5"
import { Container } from "./styles"

import { draw } from "../../Functions"
import { singleNote, createEnvelope } from "../../Functions/sound"

class PoseNet extends Component {
  constructor(props) {
    super(props)
    this.container = React.createRef()
    window.p5 = p5
  }

  startPoseDetection = () => {
    // Creating a sound wave.
    // const modeOne = singleNote(220.00)
    // this.modeOne = modeOne

    const filter = new p5.BandPass(),
    noise = new p5.Noise()
    noise.disconnect()
    noise.connect(filter)
    noise.start()
    const modeThree = filter

    const root = createEnvelope(),
      minThird = createEnvelope(),
      perfectFifth = createEnvelope()
    singleNote(261.63).amp(root)
    singleNote(311.13).amp(minThird)
    singleNote(392.0).amp(perfectFifth)
    this.root = root
    this.minThird = minThird
    this.perfectFifth = perfectFifth
    this.previousLength = 0

    window.p5 = p5

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
    }

    this.posePlayedRoot = false
    this.posePlayedMinThird = false
    this.posePlayedPerfectFifth = false

    const poseNet = ml5.poseNet(video, poseOptions, () => {
      console.log("model ready")
    })
    console.log("PoseNet", poseNet)
    window.x = poseNet
    poseNet.on("pose", function(poses) {
      // Mode 1.
      // if (
      //   typeof poses[0] !== "undefined" &&
      //   typeof poses[0].pose !== "undefined"
      // ) {
      //   // Control sound signal (frequency)
      //   modeOne.freq(poses[0].pose.keypoints[9].position.x)
      //   // console.log('Pose Data', poses[0])
      // }

      // Mode 2.
      // switch (poses.length) {
      //   case 1:
      //     if (!this.posePlayedRoot) {
      //       console.log("Pose played?", this.posePlayedRoot)
      //       root.play()
      //       this.posePlayedRoot = true

      //       this.posePlayedMinThird = false
      //       this.posePlayedPerfectFifth = false
      //       console.log(`Pose number is now: ${poses.length}
      //   Previous was ${this.previousLength}
      //   Root is ${this.posePlayedRoot}, Minor Third is ${
      //         this.posePlayedMinThird
      //       }, and Perfect Fifth is ${this.posePlayedPerfectFifth}`)
      //       console.log("Poses: ", poses)
      //     }
      //     break
      //   case 2:
      //     if (!this.posePlayedMinThird) {
      //       console.log("Pose played?", this.posePlayedMinThird)
      //       minThird.play()
      //       this.posePlayedMinThird = true

      //       this.posePlayedPerfectFifth = false
      //       console.log(`Pose number is now: ${poses.length}
      //   Previous was ${this.previousLength}
      //   Root is ${this.posePlayedRoot}, Minor Third is ${
      //         this.posePlayedMinThird
      //       }, and Perfect Fifth is ${this.posePlayedPerfectFifth}`)
      //       console.log("Poses: ", poses)
      //     }
      //     break
      //   case 3:
      //     if (!this.posePlayedPerfectFifth) {
      //       console.log("Pose played?", this.posePlayedPerfectFifth)
      //       perfectFifth.play()
      //       this.posePlayedPerfectFifth = true
      //       console.log(`Pose number is now: ${poses.length}
      //   Previous was ${this.previousLength}
      //   Root is ${this.posePlayedRoot}, Minor Third is ${
      //         this.posePlayedMinThird
      //       }, and Perfect Fifth is ${this.posePlayedPerfectFifth}`)
      //       console.log("Poses: ", poses)
      //     }

      //   case 4 || 0:
      //     this.posePlayedRoot = false
      //     this.posePlayedMinThird = false
      //     this.posePlayedPerfectFifth = false
      //     console.log(`Pose number is now: ${poses.length}
      //   Previous was ${this.previousLength}
      //   Root is ${
      //     this.posePlayedRoot
      //   }, Minor Third is ${this.posePlayedMinThird}, and Perfect Fifth is ${this.posePlayedPerfectFifth}`)
      //     console.log("Poses: ", poses)
      //   default:
      //     break
      // }

      // if (poses.length === 0) {
      //   this.posePlayedRoot = false
      //   console.log(`Pose number is now: ${poses.length}
      //   Previous was ${this.previousLength}
      //   Root is ${this.posePlayedRoot}, Minor Third is ${
      //     this.posePlayedMinThird
      //   }, and Perfect Fifth is ${this.posePlayedPerfectFifth}`)
      //   console.log("Poses: ", poses)
      // }
      
      // Mode 3.
      // if (
      //   typeof poses[0] !== "undefined" &&
      //   typeof poses[0].pose !== "undefined"
      // ) {
      //   // Control sound signal (frequency)
      //   let freq = poses[0].pose.keypoints[9].position.x
      //   modeThree.freq(freq)
      //   // give the filter a narrow band (lower res = wider bandpass)
      //   modeThree.res(50)
      //   // console.log('Pose Data', poses[0])
      // }

      window.poses = poses
      draw(sketch, video, poses, color, drawOptions)
    })

    // console.log('Detection type: ', poseNet.detectionType)
  }

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

import React, { Component, Fragment } from "react"

class videoCanvas extends Component {
  constructor(props) {
    super(props)
    this.video = React.createRef()
    this.canvas = React.createRef()
    this.screen = React.createRef()
  }

  drawKeypoints(keypoints) {
    const canvas = this.canvas.current,
      context = canvas.getContext("2d"),
      radius = 2,
      startAngle = 0,
      endAngle = 2 * Math.PI

    for (let i = 0; i < keypoints.length; i++) {
      context.beginPath()
      context.arc(
        keypoints[i].position.x,
        keypoints[i].position.y,
        radius,
        startAngle,
        endAngle,
      )
      context.fill()
    }
  }

  drawFrame = video => {
    const screen = this.screen.current
    screen.height = 500
    screen.width = 500
    let context = screen.getContext("2d")
    context.drawImage(
      this.video.current,
      0,
      0,
      screen.width,
      screen.height,
      0,
      0,
      screen.width,
      screen.height,
    )
    requestAnimationFrame(this.drawFrame)
  }

  componentDidMount() {
    //console.log("Screen data: ", this.screen.current.toDataURL);

    const image = this.image.current
    const pose = estimatePoseOnImage(this.screen.current).then(data => {
      // Drawing has to occur when promise is fulfilled.
      this.drawKeypoints(data.keypoints)
      console.info("Points: ", data)
    })
    console.log("Pose Estimation...")
    console.log(image)
    console.log("Pose data:", pose)

    // This code runs a video stream.
    const video = this.video.current
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then(stream => {
        video.srcObject = stream
        video.play()
        video.addEventListener("play", this.drawFrame(video), false)
        console.log("Video is playing from component")
      })
      .catch(function(err) {
        console.log("An error occurred! " + err)
      })
  }

  componentDidUpdate() {}

  render() {
    return (
      <Fragment>
        <p>Hi from Posenet.</p>
        <img
          ref={this.image}
          src={testFrame1}
          alt="Test frame."
          width="500"
          height="500"
        />
        <video ref={this.video} width="500" height="500">
          Video stream is not available.
        </video>
        <canvas ref={this.screen}>
          Canvas is not available in this browser.
        </canvas>
        <canvas ref={this.canvas} width="500" height="500">
          Canvas is not available in this browser.
        </canvas>
      </Fragment>
    )
  }
}

export default videoCanvas

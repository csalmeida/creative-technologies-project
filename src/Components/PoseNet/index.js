import React, { Component, Fragment } from 'react'
import * as p5 from 'p5'
import "p5/lib/addons/p5.dom";
//import * as p5DOM from '../../Libraries/p5.dom'
import * as ml5 from 'ml5'

console.info("ML5", ml5)
console.info("P5", p5)

const draw = (sketch, video, poses) => {
  sketch.image(video, 0, 0, video.width, video.height)
  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints(sketch, poses)
  //this.drawSkeleton();
}

// A function to draw ellipses over the detected keypoints
const drawKeypoints = (sketch, poses) => {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        sketch.fill(255,255,255);
        sketch.noStroke();
        sketch.ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }
}

// A function to draw the skeletons
// drawSkeleton = () => {
//   // Loop through all the skeletons detected
//   for (let i = 0; i < poses.length; i++) {
//     let skeleton = poses[i].skeleton;
//     // For every skeleton, loop through all body connections
//     for (let j = 0; j < skeleton.length; j++) {
//       let partA = skeleton[j][0];
//       let partB = skeleton[j][1];
//       stroke(c.r,c.g,c.b);
//       line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
//     }
//   }
// }

class PoseNet extends Component {
  constructor(props) {
    super(props);
    this.video = React.createRef();
  }

  componentDidMount() {
    const sketch = new p5()
    sketch.createCanvas(640, 480)
    const video = sketch.createCapture(p5.VIDEO)
    video.size(sketch.width, sketch.height)


    const poseNet = ml5.poseNet(video);
    poseNet.on('pose', function(poses) {
      console.log("Poses", poses)
      draw(sketch, video, poses)
      // save this to state poses = results;
    })
    video.hide()
  }

  render() {
    return(
      <Fragment>
        <p>Posenet</p>
      </Fragment>
    )
  }
}

export default PoseNet

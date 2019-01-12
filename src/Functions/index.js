function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
  } : null;
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

// A function to draw ellipses over the detected keypoints
const drawKeypoints = (sketch, poses, color) => {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j]
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        sketch.fill(color.r,color.g,color.b)
        sketch.noStroke()
        sketch.ellipse(keypoint.position.x, keypoint.position.y, 10, 10)
      }
    }
  }
}

// A function to draw the skeletons
const drawSkeleton = (sketch, poses, color) => {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0]
      let partB = skeleton[j][1]
      sketch.fill(color.r,color.g,color.b)
      sketch.line(partA.position.x, partA.position.y, partB.position.x, partB.position.y)
    }
  }
}

export const draw = (sketch, video, poses, color) => {
  sketch.resizeCanvas(sketch.windowWidth, sketch.windowHeight)
  sketch.image(video, 0, 0, video.width, video.height)
  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints(sketch, poses, hexToRgb(color))
  drawSkeleton(sketch, poses, hexToRgb(color))
}
import { palette } from "../Styles/colors"

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

// A function to draw ellipses over the detected keypoints
const drawKeypoints = (sketch, poses, color) => {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j]
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        sketch.fill(color.r, color.g, color.b)
        sketch.noStroke()
        sketch.ellipse(keypoint.position.x, keypoint.position.y, 7, 7)
      }
    }
  }
}

// A function to draw the skeletons
const drawSkeleton = (sketch, poses, color) => {
  // console.log("LINES BEING DRAWN")
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0]
      let partB = skeleton[j][1]
      sketch.stroke(color.r, color.g, color.b)
      sketch.line(
        partA.position.x,
        partA.position.y,
        partB.position.x,
        partB.position.y,
      )
    }
  }
}

export const drawColor = (
  sketch,
  video,
  poses,
  color,
  options = { skeleton: true },
) => {
  // Use .windowWidth and .windowHeight to make it larger.
  sketch.resizeCanvas(sketch.width, sketch.height)
  if (options.video) {
    sketch.image(video, 0, 0, video.width, video.height)
  }

  // We can call both functions to draw all keypoints and the skeletons
  if (options.skeleton && poses) {
    const third = sketch.width / 3
    let position = poses[0].pose.keypoints[0].position.x

    if (position >= 0 && position <= third) {
      drawKeypoints(sketch, poses, hexToRgb("#f02d3a"))
      drawSkeleton(sketch, poses, hexToRgb("#f02d3a"))
    } else if (position >= third && position <= third * 2) {
      drawKeypoints(sketch, poses, hexToRgb(palette.highlight))
      drawSkeleton(sketch, poses, hexToRgb(palette.highlight))
    } else if (position >= third * 2 && position <= third * 3) {
      drawKeypoints(sketch, poses, hexToRgb(palette.text))
      drawSkeleton(sketch, poses, hexToRgb(palette.text))
    }
  }
}

export const draw = (
  sketch,
  video,
  poses,
  color,
  options = { skeleton: true },
) => {
  // Use .windowWidth and .windowHeight to make it larger.
  sketch.resizeCanvas(sketch.width, sketch.height)
  if (options.video) {
    sketch.image(video, 0, 0, video.width, video.height)
  }

  // We can call both functions to draw all keypoints and the skeletons
  if (options.skeleton && poses) {
    drawKeypoints(sketch, poses, hexToRgb(color))
    drawSkeleton(sketch, poses, hexToRgb(color))
  }
}

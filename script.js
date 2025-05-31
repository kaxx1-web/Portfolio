//refrenced the star effect from this tut code: https://editor.p5js.org/guojiabao62/sketches/NsmXD8iY8 and the m15 handpose html
//LINK THIS TO MY PAGE
// Camera and hand tracking variables
let capture;
let handPose;
let hands = [];

let radius = 60;
let accelX = 0.0;
let accelY = 0.0;

const MIN_RADIUS = 10;
const MAX_RADIUS = 120;
const SMOOTHING_FACTOR = 0.1;

// UI elements
let button;

function preload() {
  handPose = ml5.handPose();
}

function setup() {
  // Create canvas matching window dimensions
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  // Create video capture with horizontal flip
  capture = createCapture(VIDEO);
  capture.size(width, height);
  capture.hide();

  // Initialize hand tracking
  handPose.detectStart(capture, gotHands);

  centerX = width / 2;
  centerY = height / 2;

  // Create save button
  button = createButton("Save My Picture");
  button.style("font-size", "16px");
  button.style("padding", "8px 16px");
  positionButton();
  button.mousePressed(savePic);
}

function draw() {
  background(220);

  // Draw the video capture, flipped horizontally
  push();
  translate(width, 0);
  scale(-1, 1);
  image(capture, 0, 0, width, height);
  pop();

  // Hand tracking and visualization
  checkFingerCollision();

  // Draw stars on hand keypoints
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    for (let j = 0; j < hand.keypoints.length; j++) {
      let keypoint = hand.keypoints[j];
      // Adjust for the horizontal flip we did with the video
      drawStar(width - keypoint.x, keypoint.y, 5, 10, 5);
    }
  }
}

function checkFingerCollision() {
  let isColliding = false;
  if (hands.length > 0) {
    let hand = hands[0];
    for (let j = 0; j < hand.keypoints.length; j++) {
      let keypoint = hand.keypoints[j];
      // Adjust for the horizontal flip
      let adjustedX = width - keypoint.x;
      let d = dist(adjustedX, keypoint.y, centerX, centerY);
      let ellipseWidth = radius * 2 + abs(accelX) * 10;
      let ellipseHeight = radius * 1.5 + abs(accelY) * 5;
      let halfWidth = ellipseWidth / 2;
      let halfHeight = ellipseHeight / 2;
      if (
        ((adjustedX - centerX) * (adjustedX - centerX)) /
          (halfWidth * halfWidth) +
          ((keypoint.y - centerY) * (keypoint.y - centerY)) /
            (halfHeight * halfHeight) <=
        1
      ) {
        isColliding = true;
        break;
      }
    }
  }
}

function gotHands(results) {
  hands = results;
}

function drawStar(x, y, radius1, radius2, npoints) {
  fill(255, 192, 203, 200);
  stroke(225, 255, 255, 200);
  strokeWeight(2);
  let angle = 360 / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < 360; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function savePic() {
  // Save the picture
  saveCanvas("photo", "jpg");
}

function positionButton() {
  // Center the button horizontally
  let x = width / 2 - button.width / 2;
  // Place it near the bottom
  let y = height - 40;
  button.position(x, y);
}

function windowResized() {
  // Handle window resizing
  resizeCanvas(windowWidth, windowHeight);
  capture.size(width, height);
  positionButton();
}

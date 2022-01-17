let mover;
let scoreDisplay;
let mouseVec;

function setup() {
  createCanvas(windowWidth, windowHeight);
  scoreDisplay = createGraphics(300, 200)
  colorMode(HSL, 359, 100, 100, 100);
  mover = new Mover(width/2,height/2);
  mouseVec = createVector(mouseX, mouseY);
  background(50);
  scoreDisplay.background(100);
  textSize(20);
}

function draw() {
  mover.update();
  mover.show();
  
  // MOUSE MAGNET
  if (mouseIsPressed) {
    mover.pullMouse();
  }
  
  // SCORE
  if (mover.pos.x > 0 && mover.pos.x < width) {
    if (mover.pos.y > 0 && mover.pos.y < height) {
      mover.score++;
    }
  }
  
  // SCOREBOARD/TEXT AREA
  image(scoreDisplay, width-300, 0);

  // SCORE/TEXT DISPLAY
  fill(100);
  text('Score:', width-200, 20);
  text(mover.score, width-200, 45);
  text('Velocity: ' + mover.vel.mag().toFixed(2), width-200, 100);
  text('Heading: ' + mover.vel.heading().toFixed(2), width-200, 130);
}

function drawArrow(base, vec) {
  push();
  stroke(0, 0, 0);
  strokeWeight(2);
  fill(0, 0, 0);
  translate(base.x, base.y);
  rotate(vec.heading());
  line(0, 0, 14, 0);
  let arrowSize = 7;
  translate(vec.mag() - arrowSize, 0);
  pop();
}
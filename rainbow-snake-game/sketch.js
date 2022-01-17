class Mover {
  constructor(x,y) {
    this.pos = createVector(x,y);
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(6));
    this.score = 0;
  }
  update() {
    this.acc = p5.Vector.random2D();
    this.acc.setMag(0.1);
    this.vel.add(this.acc);
    this.pos.add(this.vel);
  }
  show() {
    noStroke();
    fill(this.score % 359, 100, 70);
    ellipse(this.pos.x, this.pos.y, 32, 32);
    drawArrow(this.pos, this.vel);
  }
  pullMouse() {
    
  }
}

let mover;
let scoreDisplay;

function setup() {
  frameRate(15);
  createCanvas(windowWidth, windowHeight);
  scoreDisplay = createGraphics(300, 200)
  colorMode(HSL, 359, 100, 100, 100);
  mover = new Mover(width/2,height/2);
  background(50);
  scoreDisplay.background(100);
  textSize(20);
}

function draw() {
  mover.update();
  mover.show();
  image(scoreDisplay, width-300, 0);
  if (mover.pos.x > 0 && mover.pos.x < width) {
    if (mover.pos.y > 0 && mover.pos.y < height) {
      mover.score++;
    }
  }
  if (mouseIsPressed) {
    frameRate(5);
  } else {
    frameRate(15);
  }
  // MOUSE DISPLAY
  fill(0, 100, 50);
  ellipse(mouseX, mouseY, 20, 20);

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
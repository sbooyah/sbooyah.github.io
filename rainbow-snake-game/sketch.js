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
  }
}

let mover;
let scoreDisplay;

function setup() {
  createCanvas(windowWidth, windowHeight);
  scoreDisplay = createGraphics(300, 200)
  colorMode(HSL, 359, 100, 100, 100);
  mover = new Mover(width/2,height/2);
  background(50);
  scoreDisplay.background(100);
  textSize(40);
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
  fill(100);
  text('Score:', width-200, 50);
  text(mover.score, width-200, 100);
}

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
    mouseVec.set(mouseX, mouseY)
    this.acc = p5.Vector.sub(mouseVec, this.pos)
    this.acc.setMag(0.05)
    this.vel.add(this.acc)
  }
}
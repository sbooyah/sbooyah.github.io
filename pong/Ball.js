class Ball {
  constructor(x, y, width, height) {
    this.x = x,
    this.y = y,
    this.width = width,
    this.height = height,
    this.dx = Math.random() -0.5;
    this.dy = Math.random() > 0.5 ? -0.5 : 0.5
  }
  update() {
      if (this.dx < 0.15 && this.dx > -0.15) {
        if (Math.sign(this.dx) === 1) {
          this.dx = Math.max(0.2, Math.random() - 0.5)
        } else {
          this.dx = Math.min(-0.2, -Math.random() + 0.5)
        }
    }
    this.x = this.x + this.dx * deltaTime;
    this.y = this.y + this.dy * deltaTime;
  }
  draw() {
    ellipse(this.x, this.y, this.width, this.height);
  }
  collides(paddle) {
    if (this.x > paddle.x + paddle.width ||
        paddle.x > this.x + this.width / 2) {
            return false;
        }
    if (this.y > paddle.y + paddle.height ||
        paddle.y > this.y + this.height / 2) {
            return false;
        }
    return true;
    }
  reset() {
    this.x = windowWidth / 2;
    this.y = windowHeight / 2;
    this.dx = Math.random() - 0.5;
    this.dy = Math.random() > 0.5 ? -0.5 : 0.5;
  }
}
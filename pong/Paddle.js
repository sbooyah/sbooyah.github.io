class Paddle {
    constructor(x, y, width, height) {
        this.x = x,
        this.y = y,
        this.width = width,
        this.height = height,
        this.dy = 0,
        this.paddleSpeed = 0.6
    }
    update() {
        // this prevents the paddle from going off screen
        if (this.dy < 0) {
            this.y = Math.max(0, this.y + this.dy * deltaTime);
        } else {
            this.y = Math.min(windowHeight - this.height, this.y + this.dy * deltaTime);
        }
    }
    draw() {
        rect(this.x, this.y, this.width, this.height);
    }
}
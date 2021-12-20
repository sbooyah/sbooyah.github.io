let gameState = "start";
let basa = {}
let player1 = {}
let player2 = {}
let player1Score;
let player2Score;
let servingPlayer;
let blipSound;
let blipSound2;
let wallBounceSound;
let scoreSound;
let victorySound;
let pongSong;

function preload() {
  soundFormats('wav');
  blipSound = loadSound('sounds/Blip-pong.wav');
  blipSound2 = loadSound('sounds/Blip-pong-low.wav');
  wallBounceSound = loadSound('sounds/Bounce-pong.wav');
  scoreSound = loadSound('sounds/Score-pong.wav');
  victorySound = loadSound('sounds/Cool.wav');
  pongSong = loadSound('sounds/pong-song.wav')
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSL, 359, 100, 100, 100);
  basa = new Ball(windowWidth / 2, windowHeight / 2, 25, 25);
  player1 = new Paddle(10, windowHeight / 2, 15, 150);
  player2 = new Paddle(windowWidth - 25, windowHeight / 2, 15, 150);
  frameRate(144);
  pongSong.play();
}

function draw() {
  background(40);
  textFont('Arial');
  textSize(80)
  fill('white');

  if (gameState == "serve") {
    if (player1Score >= 10 || player2Score >= 10) {
      victorySound.play();
      gameState = "victory";
    }
    background(40);
    textSize(80);
    text(player1Score, windowWidth / 2 - 150, windowHeight / 5)
    text(player2Score, windowWidth / 2 + 130, windowHeight / 5)

    // UPDATE PADDLES WITH KEY INPUT
    if (keyIsDown(87)) {
      player1.dy = -player1.paddleSpeed;
      player1.update();
    } else if (keyIsDown(83)) {
      player1.dy = player1.paddleSpeed;
      player1.update();
    } else {
      player1.dy = 0;
    }
    if (keyIsDown(UP_ARROW)) {
      player2.dy = -player2.paddleSpeed;
      player2.update();
    } else if (keyIsDown(DOWN_ARROW)) {
      player2.dy = player2.paddleSpeed;
      player2.update();
    } else {
      player2.dy = 0;
    }

    textAlign(CENTER);
    textSize(20);
    text('Press ENTER to serve', windowWidth / 2, windowHeight / 3);
    player1.draw();
    player2.draw();
    basa.draw();
    basa.dy = Math.random() - 0.5;
    if (servingPlayer == 1) {
      basa.dx = max(0.4, Math.random() - 0.3);
    } else {
      basa.dx = max(0.4, Math.random() - 0.3) * -1;
    }
    if (keyIsDown(13)) {
      gameState = "play";
    }

  }
  if (gameState == "start") {
    player1Score = 0;
    player2Score = 0;
    servingPlayer = 1;
    textAlign(CENTER);
    text('Wanna Play Pong?!', windowWidth / 2, windowHeight / 2);
    textSize(40);
    text('Press Any Key', windowWidth / 2, windowHeight / 2 + 80);
    if (keyIsPressed) {
      gameState = "serve";
    }
  }
  if (gameState == "play") {
    text(player1Score, windowWidth / 2 - 150, windowHeight / 5)
    text(player2Score, windowWidth / 2 + 130, windowHeight / 5)

    // CHECK BALL PADDLE COLLISION
    if (basa.collides(player1)) {
      basa.dx = -basa.dx * 1.03;
      basa.x = player1.x + player1.width + basa.width / 2 + 1;
      blipSound.play();


      if (basa.dy < 0) {
        basa.dy = -Math.random();
      } else {
        basa.dy = Math.random();
      }
    }

    if (basa.collides(player2)) {
      basa.dx = -basa.dx * 1.03;
      basa.x = player2.x - basa.width / 2;
      blipSound2.play();

      if (basa.dy < 0) {
        basa.dy = -Math.random();
      } else {
        basa.dy = Math.random();
      }
    }

    // CHECK IF BALL IS PAST PADDLES
    // PLAYER 1 SCORE
    if (basa.x - basa.width / 2 > windowWidth) {
      scoreSound.play();
      player1Score++;
      servingPlayer = 2;
      basa.reset();
      gameState = 'serve';
    }
    // PLAYER 2 SCORE
    if (basa.x + basa.width / 2 < 0) {
      scoreSound.play();
      player2Score++;
      servingPlayer = 1;
      basa.reset();
      gameState = 'serve';
    }

    // CHECK IF BALL HITS TOP OR BOTTOM WALL
    if (basa.y + basa.height / 2 > windowHeight) {
      basa.y = windowHeight - basa.height / 2;
      basa.dy = -basa.dy
      wallBounceSound.play();
    }
    if (basa.y - basa.height / 2 < 0) {
      basa.y = 0 + basa.height / 2;
      basa.dy = -basa.dy
      wallBounceSound.play();
    }

    // UPDATE PADDLES WITH KEY INPUT
    if (keyIsDown(87)) {
      player1.dy = -player1.paddleSpeed;
      player1.update();
    } else if (keyIsDown(83)) {
      player1.dy = player1.paddleSpeed;
      player1.update();
    } else {
      player1.dy = 0;
    }
    if (keyIsDown(UP_ARROW)) {
      player2.dy = -player2.paddleSpeed;
      player2.update();
    } else if (keyIsDown(DOWN_ARROW)) {
      player2.dy = player2.paddleSpeed;
      player2.update();
    } else {
      player2.dy = 0;
    }

    basa.update();
    basa.draw();
    player1.draw();
    player2.draw();
    // text to show FPS
    textSize(20)
    fill(10);
    text(`FPS: ${Math.round(frameRate())}`, 60, 20);
    text(`Ball.dx = ${basa.dx.toFixed(2)}`, 30, 40);
    text(`Ball.dy = ${basa.dy.toFixed(2)}`, 30, 60);
  }
  if (gameState == "victory") {
    background(40);
    textSize(80);
    text(player1Score, windowWidth / 2 - 150, windowHeight / 5)
    text(player2Score, windowWidth / 2 + 130, windowHeight / 5)
    textAlign(CENTER);
    text(`Whoa! Player ${servingPlayer == 2 ? 1 : 2} wins! Nice work!`, windowWidth / 2, windowHeight / 2);
    textSize(40);
    text(`Press ENTER to reset`, windowWidth / 2, windowHeight / 2 + 100);
    if (keyIsDown(13)) {
      gameState = 'start';
    }
  }
}
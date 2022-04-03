class Card {
  static gap = 50
  static xMargin = 120
  static yMargin = 115
  constructor (x, y, id, content) {
    this.x = x
    this.y = y
    this.id = id
    this.content = content
    this.size = 100
    this.revealed = false
  }

  drawSquare () {
    if (this.revealed) {
      image(this.content, this.x, this.y)
    } else {
      fill(0)
      rect(this.x, this.y, this.size, this.size)
    }
  }

  flip () {
    this.revealed = true
  }

  unflip () {
    this.revealed = false
  }
}

const spots = []

let randomSpots = []
let first = true
let guess
let gameState = 'start'
let sprite = []
const randomNumber = Math.floor(Math.random() * 4) // FOR RANDOM BACKGROUND
const bodyStuff = document.querySelector('body')
bodyStuff.style.backgroundColor = `HSL(${randomNumber * 100}, 80%, 50%)`

function preload () {
  for (let i = 0; i < 8; i++) {
    sprite[i] = loadImage(`sprites/sprite (${i + 1}).png`)
  }
}

function setup () {
  // FILL SPOTS ARRAY WITH TWO OF EACH SPRITE
  sprite.forEach(sprite => {
    spots.push(sprite)
    spots.push(sprite)
  })

  // RANDOMIZE LIST OF SPRITES AND ASSIGN X & Y COORDINATES FOR PLACEMENT
  for (let i = 0; i <= 15; i++) {
    let x = (i % 4) * (Card.gap + 100) + Card.xMargin
    let y = Math.floor(i / 4) * 150 + Card.yMargin
    let randomIndex = Math.floor(Math.random() * spots.length)

    randomSpots.push(new Card(x, y, i, spots[randomIndex]))

    spots.splice(randomIndex, 1)
  }

  sprite.forEach(sprite => {
    sprite.resize(100, 100)
  })

  createCanvas(800, 800)
  colorMode(HSL, 359, 100, 100, 100)
}

function mouseReleased () {
  if (gameState === 'play') {

    let clickedSpot = null
    randomSpots.forEach(spot => {
      if (
        mouseX > spot.x &&
        mouseX < spot.x + spot.size &&
        mouseY > spot.y &&
        mouseY < spot.y + spot.size &&
        !spot.revealed
      ) {
        clickedSpot = spot
      } else {
        return
      }
    })

    // FIRST CLICK/GUESS
    if (first && clickedSpot) {
      first = false
      clickedSpot.flip()
      guess = clickedSpot

      // SECOND CLICK/GUESS
    } else if (clickedSpot) {
      clickedSpot.flip()
      first = true

      // CHECK FOR MATCH
      if (
        guess.content === clickedSpot.content &&
        guess.id !== clickedSpot.id
      ) {
        // SUCCESSFUL MATCH

        // DISABLE THE MATCHED CARDS
        guess.revealed = true
        clickedSpot.revealed = true
        first = true

        // CHECK FOR COMPLETION
        if (
          randomSpots.every(spot => {
            return spot.revealed
          })
        ) {
          gameState = 'win'
        }
      } else {
        // NO MATCH! NO MATCH! NO MATCH!
        gameState = 'pause'
        setTimeout(() => {
          clickedSpot.unflip()
          guess.unflip()
          gameState = 'play'
        }, 1200)
      }
    }
  }

  if (gameState === 'start') {
    gameState = 'play'
  }
}

function draw () {
  background(randomNumber * 100, 80, 50)
  if (gameState === 'play' || gameState === 'pause') {
    stroke(100)

      randomSpots.forEach(spot => {
        spot.drawSquare()
      })
  }

  if (gameState === 'win') {
    fill(100)
    textSize(100)
    textAlign(CENTER)
    text('You win!', 400, 330)
    textSize(50)
    text('Reloading shortly ;)', 400, 530)
    setTimeout(() => {
      location.reload()
    }, 5000)
  }

  if (gameState === 'start') {
    fill(100)
    textSize(90)
    textAlign(CENTER)
    textStyle(BOLD)
    noStroke()
    text('Boogie Matching', 400, 250)
    textSize(30)
    text('Click anywhere to start!', 400, 600)
  }

  //! GRID OVERLAY
  // strokeWeight(3)
  // for (let i = 0; i < width; i += 50) {
  //   line(0, i, width, i)
  //   line(i, 0, i, height)
  // }
}

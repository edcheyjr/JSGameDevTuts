/**
 * @type {HTMLCanvasElement}
 */

// utils function
function getLocalStorageItems(key) {
  return localStorage.getItem(key)
}
function setLocalStorageItems(key, value) {
  localStorage.setItem(key, value)
  return data
}

const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
let canvasPosition = canvas.getBoundingClientRect()

// collusion canvas
const collusionCanvas = document.getElementById('collusionCanvas')
const collusionCtx = collusionCanvas.getContext('2d')
collusionCanvas.width = window.innerWidth
collusionCanvas.height = window.innerHeight

// global variables
const highestScoreKey = 'bestScore'
let timeToNextRaven = 0
let ravenInterval = 500
let lastTime = 0
let ravens = []
let explosions = []
let particles = []
let hearts = []
let maxNoOfHearts = 3
let score = 0
let currentHighestScore = getLocalStorageItems(highestScoreKey) || 0
let gameOver = false

const raven_sounds = [
  './assets/raven-x3.mp3',
  './assets/crow_caw.wav',
  './assets/crow.mp3',
]

function drawScore() {
  ctx.font = '900 32px Arial'
  ctx.fillStyle = 'black'
  ctx.fillText('SCORE: ' + score, 50, 75)
  ctx.fillStyle = 'white'
  ctx.fillText('SCORE: ' + score, 54, 78)
}

function drawBestScore() {
  ctx.font = '900 32px Arial'
  ctx.fillStyle = 'black'
  ctx.fillText('HIGHEST SCORE: ' + currentHighestScore, canvas.width - 430, 75)
  ctx.fillStyle = 'white'
  ctx.fillText('HIGHEST SCORE: ' + currentHighestScore, canvas.width - 434, 78)
}

function drawGameOver() {
  ctx.save()
  ctx.fillStyle = 'Black'
  ctx.globalAlpha = 0.5
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.restore()
  ctx.font = '800 32px '
  ctx.textAlign = 'center'
  ctx.fillStyle = 'Black'
  if (score > currentHighestScore) {
    // say gameover show that the new high score
    ctx.fillText(
      `GAME OVER NEW SCORE: ${score}!!!`,
      canvas.width / 2 - 15,
      canvas.height / 2 - 15
    )
    ctx.fillStyle = 'White'
    ctx.fillText(
      `GAME OVER NEW SCORE: ${score}!!!`,
      canvas.width / 2 - 15 + 3,
      canvas.height / 2 - 15 + 3
    )
    setLocalStorageItems(highestScoreKey, score)
  } else {
    ctx.fillText(
      `GAME OVER YOUR SCORE: ${score}`,
      canvas.width / 2 - 15,
      canvas.height / 2 - 15
    )
    ctx.fillStyle = 'White'
    ctx.fillText(
      `GAME OVER YOUR SCORE: ${score}`,
      canvas.width / 2 - 15 + 3,
      canvas.height / 2 - 15 + 3
    )
  }
}

function createAnimation(e) {
  let PositionX = e.x - canvasPosition.left
  let PositionY = e.y - canvasPosition.top
  explosions.push(
    new Explosion(
      PositionX,
      PositionY,
      './assets/boom.png',
      './assets/boom.wav'
    )
  )
}

// push 3 hearts
for (let i = 0; i < maxNoOfHearts; i++) {
  hearts.push(new Heart(50, 90, 45))
}

window.addEventListener('click', (e) => {
  const detectPixelColor = collusionCtx.getImageData(e.x, e.y, 1, 1)
  const pc = detectPixelColor.data
  for (let i = 0; i < ravens.length; i++) {
    if (
      ravens[i].randomColors[0] === pc[0] &&
      ravens[i].randomColors[1] === pc[1] &&
      ravens[i].randomColors[2] === pc[2]
    ) {
      createAnimation(e)
      ravens[i].markedForDeletion = true
      score++
    }
  }
})

function animate(timestamp) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  collusionCtx.clearRect(0, 0, canvas.width, canvas.height)

  // game over
  if (hearts.length === 0) {
    gameOver = true
  }
  let deltatime = timestamp - lastTime
  lastTime = timestamp
  timeToNextRaven += deltatime
  if (timeToNextRaven > ravenInterval) {
    ravens.push(
      new Raven(
        canvas.width,
        canvas.height,
        './assets/enemy_raven.png',
        raven_sounds // sounds of ravaens
      )
    )
    timeToNextRaven = 0
    ravens.sort((a, b) => a.width - b.width)
  }
  for (let i = 0; i < maxNoOfHearts; i++) {
    if (i > 0) {
      hearts[i].update(hearts[i - 1])
    }
  }

  ;[...particles, ...ravens, ...explosions].forEach((obj) =>
    obj.update(deltatime, particles)
  )
  ;[...particles, ...hearts, ...ravens, ...explosions].forEach((obj) =>
    obj.draw(ctx, collusionCtx)
  )
  // reduce number of hearts until there are none
  for (let i = 0; i < ravens.length; i++) {
    if (ravens[i].x < 0 - ravens[i].width) {
      if (hearts.length != 0) {
        hearts[hearts.length - 1].markedForDeletion = true
        hearts = hearts.filter((heart) => !heart.markedForDeletion)
        maxNoOfHearts--
      }
    }
  }

  // remove all deleted objects
  //TODO:replace with object pooling strategy instead
  ravens = ravens.filter((object) => !object.markedForDeletion)
  explosions = explosions.filter((object) => !object.markedForDeletion)
  particles = particles.filter((object) => !object.markedForDeletion)

  drawScore()
  drawBestScore()

  // stop loop if game over
  if (gameOver) {
    drawGameOver()
  } else {
    requestAnimationFrame(animate)
  }
}

animate(0)

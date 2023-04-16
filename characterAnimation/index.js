// dom elements
const canvas = document.getElementById('canvas1')
const select = document.querySelector('#animations')
console.log('select', select)
// events
let playerState = 'idle'

select.addEventListener('change', (e) => {
  playerState = e.target.value
})
// context
const ctx = canvas.getContext('2d')
const CANVAS_WIDTH = (canvas.width = 600)
const CANVAS_HEIGHT = (canvas.height = 600)

const playerImage = new Image()
playerImage.src = 'assets/shadow_dog.png'
const spriteWidth = 575
const spriteHeight = 523

let frameX = 0
let frameY = 0
let gameFrame = 0
const staggerFrames = 5
const spriteAnimations = []
const animationState = [
  {
    name: 'idle',
    frames: 7,
  },
  {
    name: 'jump',
    frames: 7,
  },
  {
    name: 'fall',
    frames: 7,
  },
  {
    name: 'run',
    frames: 9,
  },
  {
    name: 'dizzy',
    frames: 11,
  },
  {
    name: 'sit',
    frames: 5,
  },
  {
    name: 'roll',
    frames: 7,
  },
  {
    name: 'bite',
    frames: 7,
  },
  {
    name: 'ko',
    frames: 12,
  },
  {
    name: 'getHit',
    frames: 4,
  },
]
animationState.forEach((state, index) => {
  let frames = {
    loc: [],
  }
  for (let j = 0; j < state.frames; j++) {
    let positionX = j * spriteWidth
    let positionY = index * spriteHeight
    frames.loc.push({ x: positionX, y: positionY })
  }
  spriteAnimations[state.name] = frames
})

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  // ctx.drawImage(image, sx, sy,  sw, sh, dx, dy, dw, dh)

  let position =
    Math.floor(gameFrame / staggerFrames) %
    spriteAnimations[playerState].loc.length
  frameX = spriteWidth * position
  frameY = spriteAnimations[playerState].loc[position].y
  ctx.drawImage(
    playerImage,
    frameX,
    frameY,
    spriteWidth,
    spriteHeight,
    0,
    0,
    spriteWidth,
    spriteHeight
  )
  gameFrame++
  requestAnimationFrame(animate)
}

// start game animation fxn
animate()

/**
 * @type {HTMLCanvasElement} Canvas Methods
 */

const KEY_DOWN = 'ArrowDown'
const KEY_UP = 'ArrowUp'
const KEY_RIGHT = 'ArrowRight'
const KEY_LEFT = 'ArrowLeft'
const ENTER = 'Enter'
const SWIPE_UP = 'SwipeUp'
const SWIPE_DOWN = 'SwipeDown'

let enemies = []
let score = 0
let GAME_OVER = false

window.addEventListener('load', () => {
  const canvas = document.getElementById('canvas1')
  const CANVAS_WIDTH = (canvas.width = 800)
  const CANVAS_HEIGHT = (canvas.height = 720)
  const ctx = canvas.getContext('2d')

  class InputHandler {
    constructor() {
      this.keys = []
      window.addEventListener('keydown', (e) => {
        if (
          (e.key == KEY_DOWN ||
            e.key == KEY_UP ||
            e.key == KEY_LEFT ||
            e.key == KEY_RIGHT) &&
          this.keys.indexOf(e.key) === -1
        ) {
          this.keys.push(e.key)
        }
      })
      window.addEventListener('keyup', (e) => {
        if (
          e.key === KEY_DOWN ||
          e.key == KEY_UP ||
          e.key == KEY_LEFT ||
          e.key == KEY_RIGHT
        ) {
          this.keys.splice(this.keys.indexOf(e.key), 1)
        }
      })
    }
  }
  class Player {
    constructor(gameWidth, gameHeight) {
      this.gameWidth = gameWidth
      this.gameHeight = gameHeight
      this.width = 200
      this.height = 200
      this.x = 0
      this.y = gameHeight - this.height
      this.image = document.querySelector('#player')
      this.frameX = 0
      this.frameY = 1
      this.speed = 0
      this.vy = 0
      this.gravity = 1
      this.offsetPixel = 5
      this.jumpVelocity = 24
      this.frameTimer = 0
      this.maxFrame = this.frameY == 1 ? 6 : 8
      this.fps = 50
      this.frameInterval = 1000 / this.fps
    }
    draw(context) {
      context.strokeStyle = 'White'
      context.strokeRect(this.x, this.y, this.width, this.height)
      context.drawImage(
        this.image,
        this.width * this.frameX,
        this.height * this.frameY,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      )
    }
    update(deltaTime, input) {
      // animating frames
      if (this.frameTimer > this.frameInterval) {
        if (this.frameX >= this.maxFrame) {
          this.frameX = 0
        } else {
          this.frameX++
        }
        this.frameTimer = 0
      } else {
        this.frameTimer += deltaTime
      }

      // player inputs
      if (input.keys.indexOf(KEY_RIGHT) > -1) {
        this.speed = 5
      } else if (input.keys.indexOf(KEY_LEFT) > -1) {
        this.speed = -5
      } else if (input.keys.indexOf(KEY_UP) > -1 && this.#onGround()) {
        this.vy -= this.jumpVelocity
      } else {
        this.speed = 0
      }
      // horizontal movement;
      this.x += this.speed
      if (this.x < 0) {
        this.x = 0
      } else if (this.x > this.gameWidth - this.width) {
        this.x = this.gameWidth - this.width
      }

      // vertical movement
      this.y += this.vy
      if (!this.#onGround()) {
        this.vy += this.gravity
        this.frameY = 1 // jump animation
      } else {
        this.frameY = 0 // run animation
        this.vy = 0
      }

      // ground level vertical boundary
      if (this.y >= this.gameHeight - this.height) {
        this.y = this.gameHeight - this.height
      }
    }

    // checks if the player is on ground
    #onGround() {
      return this.y >= this.gameHeight - this.height - this.offsetPixel
    }
    restart() {
      this.x = 80
      this.y = this.gameHeight - this.height
    }
  }

  class Background {
    constructor(gameWidth, gameHeight) {
      this.gameWidth = gameWidth
      this.gameHeight = gameHeight
      this.image = document.getElementById('bg')
      this.x = 0
      this.y = 0
      this.width = 2400
      this.height = 720
      this.speed = 5
    }
    draw(context) {
      context.drawImage(this.image, this.x, this.y, this.width, this.height)
      context.drawImage(
        this.image,
        this.x + this.width - this.speed,
        this.y,
        this.width,
        this.height
      )
    }

    update() {
      this.x -= this.speed
      if (this.x < 0 - this.width) this.x = 0
    }
    restart() {
      this.x = 0
    }
  }
  class Enemy {
    constructor(gameWidth, gameHeight) {
      this.gameWidth = gameWidth
      this.gameHeight = gameHeight
      this.width = 160
      this.height = 119
      this.image = document.getElementById('enemy')
      this.x = this.gameWidth
      this.y = this.gameHeight - this.height
      this.fps = 20
      this.frameTimer = 0
      this.maxFrame = 5
      this.frameInterval = 1000 / this.fps
      this.frameX = 0
      this.speed = 8
      this.isMarkedDeletion = false
    }
    draw(context) {
      context.strokeStyle = 'white'
      context.strokeRect(this.x, this.y, this.width, this.height)
      context.drawImage(
        this.image,
        this.frameX * this.width,
        0,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      )
    }
    update(deltaTime) {
      if (this.frameTimer > this.frameInterval) {
        if (this.frameX >= this.maxFrame) {
          this.frameX = 0
        } else {
          this.frameX++
        }
        this.frameTimer = 0
      } else {
        this.frameTimer += deltaTime
      }
      this.x -= this.speed
      if (this.x < 0 - this.width) this.isMarkedDeletion = true
    }
  }

  let enemyTimer = 0
  const enemyInterval = 1000
  let randomInterval = Math.random() * 2000 + 100

  function handleEnemies(deltaTime) {
    if (enemyTimer > enemyInterval + randomInterval) {
      enemies.push(new Enemy(CANVAS_WIDTH, CANVAS_HEIGHT))
      randomInterval = Math.random() * 2000 + 100
      enemyTimer = 0
    } else {
      enemyTimer += deltaTime
    }
    enemies.forEach((enemy) => {
      enemy.draw(ctx)
      enemy.update(deltaTime)
    })
    enemies = enemies.filter((enemy) => !enemy.isMarkedDeletion)
  }
  function handleDisplayStatusTxt(context) {
    context.fillStyle = 'black'
    context.font = '40px  Helvetica'
    context.fillText('Score:' + score, 20, 50)
    context.fillStyle = 'white'
    context.font = '40px  Helvetica'
    context.fillText('Score:' + score, 18, 49)
  }

  const input = new InputHandler()
  const player = new Player(CANVAS_WIDTH, CANVAS_HEIGHT)
  const background = new Background(CANVAS_WIDTH, CANVAS_HEIGHT)

  let lastTime = 0

  function restartGame() {
    player.restart()
    background.restart()
    enemies = []
    score = 0
    GAME_OVER = false
    animate(0)
  }

  // animation loop
  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime
    lastTime = timeStamp
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    background.draw(ctx)
    background.update()
    player.draw(ctx)
    player.update(deltaTime, input)

    handleDisplayStatusTxt(ctx)
    handleEnemies(deltaTime)
    requestAnimationFrame(animate)
  }

  animate(0)
})

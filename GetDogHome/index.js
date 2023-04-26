/**
 * @type {HTMLCanvasElement} Canvas Methods
 */

const KEY_DOWN = 'ArrowDown'
const KEY_UP = 'ArrowUp'
const KEY_RIGHT = 'ArrowRight'
const KEY_LEFT = 'ArrowLeft'

window.addEventListener('load', () => {
  const canvas = document.getElementById('canvas1')
  const CANVAS_WIDTH = (canvas.width = 800)
  const CANVAS_HEIGHT = (canvas.height = 800)
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
    }
    update(deltaTime, input) {
      this.x += this.speed

      // horizontal movement;
      if (
        input.keys.indexOf(KEY_RIGHT) > -1 &&
        this.x < this.gameWidth - this.width
      ) {
        this.speed = 5
      } else if (input.keys.indexOf(KEY_LEFT) > -1 && this.x > 0) {
        this.speed = -5
      } else {
        this.speed = 0
      }
      this.y += this.vy
      // vertical movement
    }
    draw(context) {
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
  }

  class Background {}
  class Enemy {}

  function handleEnemies() {}
  function handleDisplayStatusTxt() {}

  const input = new InputHandler()
  const player = new Player(CANVAS_WIDTH, CANVAS_HEIGHT)
  // animation loop
  function animate(deltaTime) {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    player.draw(ctx)
    player.update(deltaTime, input)
    requestAnimationFrame(animate)
  }

  animate(0)
})

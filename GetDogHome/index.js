/**
 * @type {HTMLCanvasElement} Canvas Methods
 */

// utils function
function getLocalStorageItems(key) {
  return localStorage.getItem(key)
}
function setLocalStorageItems(key, value) {
  localStorage.setItem(key, value)
}

const KEY_DOWN = 'ArrowDown'
const KEY_UP = 'ArrowUp'
const KEY_RIGHT = 'ArrowRight'
const KEY_LEFT = 'ArrowLeft'
const ENTER = 'Enter'
const SWIPE_UP = 'SwipeUp'
const SWIPE_DOWN = 'SwipeDown'
const SWIPE_RIGHT = 'SwipeRight'
const SWIPE_LEFT = 'SwipeLeft'

let enemies = []
let score = 0
let GAME_OVER = false
let TimeoutID = 0

window.addEventListener('load', () => {
  const canvas = document.getElementById('canvas1')
  const fullscreenBtn = document.getElementById('fullscreenBtn')
  const CANVAS_WIDTH = (canvas.width = 800)
  const CANVAS_HEIGHT = (canvas.height = 720)
  const ctx = canvas.getContext('2d')

  class InputHandler {
    constructor() {
      this.keys = []
      this.touchY = ''
      this.touchX = ''
      this.touchTreshold = 30
      this.rightTouchTreshold = 60

      //keypress events
      window.addEventListener('keydown', (e) => {
        if (
          (e.key == KEY_DOWN ||
            e.key == KEY_UP ||
            e.key == KEY_LEFT ||
            e.key == KEY_RIGHT) &&
          this.keys.indexOf(e.key) === -1
        ) {
          this.keys.push(e.key)
        } else if (e.key == ENTER && GAME_OVER) {
          restartGame()
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

      // Touch events
      window.addEventListener('touchstart', (e) => {
        // console.log('change touches', e.changedTouches[0])
        this.touchY = e.changedTouches[0].pageY
        this.touchX = e.changedTouches[0].pageX
      })
      window.addEventListener('touchmove', (e) => {
        // console.log(e)
        const swipeYDistance = e.changedTouches[0].pageY - this.touchY
        const swipeXDistance = e.changedTouches[0].pageX - this.touchX
        if (
          swipeYDistance < -this.touchTreshold &&
          this.keys.indexOf(SWIPE_UP) === -1
        ) {
          this.keys.push(SWIPE_UP)
        } else if (
          swipeYDistance > this.touchTreshold &&
          this.keys.indexOf(SWIPE_DOWN) === -1
        ) {
          this.keys.push(SWIPE_DOWN)
          if (GAME_OVER) {
            restartGame()
          }
        } else if (
          swipeXDistance < this.rightTouchTreshold &&
          this.keys.indexOf(SWIPE_RIGHT) === -1
        ) {
          this.keys.push(SWIPE_RIGHT)
        } else if (
          swipeXDistance < -this.rightTouchTreshold &&
          this.keys.indexOf(SWIPE_LEFT) === -1
        ) {
          this.keys.push(SWIPE_LEFT)
        }
      })
      window.addEventListener('touchend', (e) => {
        console.log('keys', this.keys)
        // clean up keys
        this.keys.splice(this.keys.indexOf(SWIPE_UP), 1)
        this.keys.splice(this.keys.indexOf(SWIPE_DOWN), 1)
        this.keys.splice(this.keys.indexOf(SWIPE_RIGHT), 1)
        this.keys.splice(this.keys.indexOf(SWIPE_LEFT), 1)
      })
    }
  }
  class Player {
    constructor(gameWidth, gameHeight) {
      this.gameWidth = gameWidth
      this.gameHeight = gameHeight
      this.width = 200
      this.height = 200
      this.x = 80
      this.y = gameHeight - this.height
      this.image = document.querySelector('#player')
      this.frameX = 0
      this.frameY = 1
      this.speed = 0
      this.vy = 0
      this.gravity = 1
      this.offsetPixel = 5
      this.jumpVelocity = 28
      this.frameTimer = 0
      this.maxFrame = this.frameY == 1 ? 6 : 8
      this.fps = 50
      this.frameInterval = 1000 / this.fps
      this.collided = false
    }
    draw(context) {
      // context.strokeStyle = 'White'
      // context.strokeRect(this.x, this.y, this.width, this.height)
      // context.beginPath()
      // context.arc(
      //   this.x + this.width / 2,
      //   this.y + this.height / 2,
      //   this.width / 2,
      //   0,
      //   Math.PI * 2
      // )
      // context.stroke()
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
    update(deltaTime, input, enemies) {
      // collusion detection
      enemies.forEach((enemy) => {
        const dx = enemy.x + enemy.width / 2 - (this.x + this.width / 2) //distance in x plane between the two cirle
        const dy = enemy.y + enemy.height / 2 - (this.y + this.height / 2) // distance in y plane between the two circle

        const distance = Math.sqrt(dx * dx + dy * dy) //hypo
        // console.log('distance', distance < enemy.width / 2 + this.width / 2)
        if (distance < enemy.width / 2 + this.width / 2) {
          this.collided = true
          GAME_OVER = true
        }
      })
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

      //left right inputs
      if (
        input.keys.indexOf(KEY_RIGHT) > -1 ||
        input.keys.indexOf(SWIPE_RIGHT) > -1
      ) {
        this.speed = 5
      } else if (
        input.keys.indexOf(KEY_LEFT) > -1 ||
        input.keys.indexOf(SWIPE_LEFT) > -1
      ) {
        this.speed = -5
      } else {
        this.speed = 0
      }

      // vertical inputs
      if (
        (input.keys.indexOf(KEY_UP) > -1 ||
          input.keys.indexOf(SWIPE_UP) > -1) &&
        this.#onGround()
      ) {
        this.vy -= this.jumpVelocity
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
      // context.strokeStyle = 'white'
      // context.strokeRect(this.x, this.y, this.width, this.height)
      // context.strokeRect(this.x, this.y, this.width, this.height)
      // context.beginPath()
      // context.arc(
      //   this.x + this.width / 2,
      //   this.y + this.height / 2,
      //   this.width / 2,
      //   0,
      //   Math.PI * 2
      // )
      // context.stroke()
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
      if (this.x < 0 - this.width) {
        this.isMarkedDeletion = true
        score += 1
      }
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
    const scoreTxt = 'Score:'
    const gameOverTxt = 'GAME OVER! press Enter to restart'

    context.textAlign = 'left'
    context.fillStyle = 'black'
    context.font = '40px  Helvetica'
    context.fillText(scoreTxt + score, 20, 50)
    context.fillStyle = 'white'
    context.fillText(scoreTxt + score, 18, 49)

    // GAME OVER TXT
    if (GAME_OVER) {
      context.save()
      context.globalAlpha = 0.7
      context.fillStyle = 'black'
      context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
      context.restore()
      context.textAlign = 'center'
      context.font = '40px  Montserrat-Alternative'
      context.fillStyle = 'black'
      context.fillText(
        gameOverTxt,
        CANVAS_WIDTH / 2 - 2.5,
        CANVAS_HEIGHT / 2 + 2.5
      )
      context.fillStyle = 'aqua'
      context.fillText(gameOverTxt, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2)
    }
  }
  /**
   *
   * @param {any} context
   * @return {void}
   */
  function handleHighScore(context) {
    const SHADOW_TEXT_WIDTH = CANVAS_WIDTH - 48
    const SHADOW_TEXT_HEIGHT = 50
    const TEXT_WIDTH = CANVAS_WIDTH - 50
    const TEXT_HEIGHT = 49

    const highScoreTxt = 'High Score:'
    const highScore = getLocalStorageItems(highScoreTxt)
    context.textAlign = 'right'
    context.fillStyle = 'black'
    context.font = '40px  Helvetica'
    if (highScore) {
      context.fillText(
        highScoreTxt + highScore,
        SHADOW_TEXT_WIDTH,
        SHADOW_TEXT_HEIGHT
      )
      context.fillStyle = 'white'
      context.fillText(highScoreTxt + highScore, TEXT_WIDTH, TEXT_HEIGHT)
    } else {
      context.fillText(
        highScoreTxt + score,
        SHADOW_TEXT_WIDTH,
        SHADOW_TEXT_HEIGHT
      )
      context.fillStyle = 'white'
      context.fillText(highScoreTxt + score, TEXT_WIDTH, TEXT_HEIGHT)
      // when game is over
      if (GAME_OVER) {
        setLocalStorageItems(highScoreTxt, score)
      }
    }
    if (score > highScore) {
      // context.save()
      // const WowHighScore = 'Wow! New High Score ' + score
      // context.font = '40px  Helvetica'
      // context.fillStyle = 'white'
      // context.fillText(WowHighScore, CANVAS_WIDTH / 2 - 180, 100)
      // // do a cool animation with gobal alpha on atext prompting highscore
      // TimeoutID = setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     context.globalAlpha = 1 - 0.1
      //   }
      //   context.fillText('', CANVAS_WIDTH / 2 - 150, 100)
      // }, 2000)
      if (GAME_OVER) {
        setLocalStorageItems(highScoreTxt, score)
      }
      // context.restore()
    }
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
    player.update(deltaTime, input, enemies)

    handleEnemies(deltaTime)
    GAME_OVER || requestAnimationFrame(animate)
    handleHighScore(ctx)
    handleDisplayStatusTxt(ctx) //should be the last in order to overlay the other objects
  }
  // only animate when not gameover
  animate(0)

  // once loop ends
  clearTimeout(TimeoutID)
})

/**
 * @type {HTMLCanvasElement}
 * @class Enemies blueprint
 *
 * will act as the base class for each enemy class
 */
class Enemy {
  constructor(gameObj) {
    this.image = gameObj.image
    this.name = gameObj.name
    this.image.src = gameObj.imageSrc
    this.spriteWidth = gameObj.spriteWidth
    this.spriteHeight = gameObj.spriteHeight
    this.ratio = gameObj.ratio
    this.width = this.spriteWidth / this.ratio
    this.height = this.spriteHeight / this.ratio
    this.x = gameObj.x
    this.y = gameObj.y
    this.frame = 0
    this.update
    this.draw
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }
}

/**
 * Bat One enemy
 */

class BatEnemy extends Enemy {
  constructor(
    image,
    name = 'bat2',
    imageSrc = './assets/enemy1.png',
    ratio = 2.5
  ) {
    super({
      image,
      name,
      imageSrc,
      spriteWidth: 293,
      spriteHeight: 155,
      x: Math.random() * (canvas.width - 293 / ratio),
      y: Math.random() * (canvas.height - 155 / ratio),
      ratio,
    })
    this.flapSpeed = Math.floor(Math.random() * 4 + 1)
  }
  update(gameFrame) {
    this.x += Math.random() * 15 - 7.5
    this.y += Math.random() * 5 - 2.5

    // animate sprite
    if (gameFrame % this.flapSpeed === 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++
    }
  }
}

/**
 * Bat Two enemy
 */
class BatTwoEnemy extends Enemy {
  constructor(
    image,
    name = 'bat2',
    imageSrc = './assets/enemy2.png',
    ratio = 2.5
  ) {
    super({
      image,
      name,
      imageSrc,
      spriteWidth: 266,
      spriteHeight: 188,
      x: Math.random() * (canvas.width - 266 / ratio),
      y: Math.random() * (canvas.height - 188 / ratio),
      ratio,
    })
    this.flapSpeed = Math.floor(Math.random() * 4 + 1)
    this.speed = Math.random() * 3 + 1
    this.angle = 0
    this.angleSpeed = Math.random() * 0.2
    this.curve = Math.random() * 7
  }
  update(gameFrame) {
    this.x -= this.speed
    this.y += this.curve * Math.sin(this.angle)
    this.angle += this.angleSpeed

    // check if the character is out of the canvas therefore reset their position
    this.x + this.width < 0 && (this.x = canvas.width)

    // animate sprite
    if (gameFrame % this.flapSpeed === 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++
    }
  }
}

/**
 * Ghost Enemy
 */

class GhostEnemy extends Enemy {
  constructor(
    image,
    name = 'ghost',
    imageSrc = './assets/enemy3.png',
    ratio = 2.5
  ) {
    super({
      image,
      name,
      imageSrc,
      spriteWidth: 218,
      spriteHeight: 177,
      x: Math.random() * (canvas.width - 218 / ratio),
      y: Math.random() * (canvas.height - 177 / ratio),
      ratio,
    })
    this.speed = Math.random() * 3 + 1
    this.angle = Math.random() * 500
    this.angleSpeed = Math.random() * 1 + 0.5
    this.curve = Math.random() * 200 + 100
    this.flapSpeed = Math.floor(Math.random() * 4 + 1)
  }
  update(gameFrame) {
    this.x =
      (canvas.width / 2 - this.width / 2) *
        Math.sin((this.angle * Math.PI) / 400) +
      canvas.width / 2 -
      this.width / 2
    this.y =
      (canvas.height / 2 - this.height) *
        Math.cos((this.angle * Math.PI) / 500) +
      canvas.height / 2 -
      this.height / 2

    this.angle += this.angleSpeed

    // check if the character is out of the canvas therefore reset their position
    this.x + this.width < 0 && (this.x = canvas.width)

    // animate sprite
    if (gameFrame % this.flapSpeed === 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++
    }
  }
}

class SpikeEnemy extends Enemy {
  constructor(
    image,
    name = 'spike',
    imageSrc = './assets/enemy4.png',
    ratio = 2.5
  ) {
    super({
      image,
      name,
      imageSrc,
      spriteWidth: 213,
      spriteHeight: 213,
      x: Math.random() * (canvas.width - 218 / ratio),
      y: Math.random() * (canvas.height - 177 / ratio),
      ratio,
    })
    this.newX = Math.random() * (canvas.width - 218 / ratio)
    this.newY = Math.random() * (canvas.height - 177 / ratio)
    this.speed = Math.random() * 3 + 1
    this.angle = Math.random() * 500
    this.interval = Math.floor(Math.random() * 200 + 50)
    this.spinSpeed = Math.floor(Math.random() * 4 + 1)
  }
  update(gameFrame) {
    if (gameFrame % this.interval === 0) {
      this.newX = Math.random() * (canvas.width - 218 / this.ratio)
      this.newY = Math.random() * (canvas.height - 177 / this.ratio)
    }

    let dx = this.x - this.newX
    let dy = this.y - this.newY
    this.x -= dx / 20
    this.y -= dy / 20
    // this.x = 0
    // this.y = 0
    // check if the character is out of the canvas therefore reset their position
    this.x + this.width < 0 && (this.x = canvas.width)

    // animate sprite
    if (gameFrame % this.spinSpeed === 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++
    }
  }
}

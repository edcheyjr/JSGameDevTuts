//const worm = document.getElementById('enemy_worm')

class Enemy {
  constructor(game, addRect = false) {
    this.game = game
    this.markedForDeletion = false
    this.frameX = 0
    this.maxFrame = 5 // could be different for every enemy
    this.frameInterval = 100
    this.frameTimer = 0
    this.addRect = addRect // rectangle for debugging
  }
  update(deltaTime) {
    // calculate the time to server frames for every computer
    if (this.frameTimer > this.frameInterval) {
      if (this.frameX < this.maxFrame) {
        // while the frames have not reach the max frame increment
        this.frameX++
      } else {
        // else return to the first frame
        this.frameX = 0
      }
      this.frameTimer = 0
    } else {
      this.frameTimer += deltaTime
    }
    this.x -= this.speed * deltaTime
    if (this.x < -this.width) {
      this.markedForDeletion = true
    }
  }
  draw(ctx) {
    ctx.drawImage(
      this.image, //image  sprite
      this.frameX * this.spriteWidth, // sx
      0, //sy
      this.spriteWidth, //sw
      this.spriteHeight, //sy
      this.x, //x position in the canvas where the image is placed
      this.y, //y position in the canvas where the image is placed
      this.width, // width size of where the canvas we the image is placed
      this.height // height of where we are placing the image
    )
    // ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}

class Worm extends Enemy {
  constructor(game) {
    super(game)
    this.spriteWidth = 228
    this.spriteHeight = 171
    this.height = this.spriteHeight / 2
    this.width = this.spriteWidth / 2
    this.x = this.game.width
    this.y = this.game.height - this.height
    this.image = enemy_worm
    this.speed = Math.random() * 0.05 + 0.1
  }
}

class Spider extends Enemy {
  // SPIDER SPEED
  spiderSpeed = Math.random() * 0.1 + 0.1
  constructor(game, addRect) {
    super(game, addRect)
    this.spriteWidth = 310
    this.spriteHeight = 175
    this.height = this.spriteHeight / 2
    this.width = this.spriteWidth / 2
    this.x = Math.random() * this.game.width
    this.y = 0 - this.height
    this.image = enemy_spider
    this.speed = 0
    this.speedY = this.spiderSpeed
    this.maxLength = Math.random() * (this.game.height - this.width)
  }
  update(deltaTime) {
    super.update(deltaTime)
    this.y += this.speedY * deltaTime
    if (this.y > this.maxLength) this.speedY *= -1
    //  filter style
    // if (this.y < -this.height * 2) {
    //   this.markedForDeletion = true
    // }
    //Simple Object pooling implimentation
    if (this.y < -this.height * 2) {
      this.x = Math.random() * this.game.width
      this.speedY = this.spiderSpeed
    }
  }
  draw(ctx) {
    ctx.beginPath()
    ctx.moveTo(this.x + this.width * 0.5, 0)
    ctx.lineTo(this.x + this.width * 0.5, this.y + this.height * 0.5)
    ctx.stroke()
    console.log('super.addRect', super.addRect)
    if (this.addRect) {
      ctx.save()
      ctx.globalAlpha = 0.5
      ctx.fillRect(this.x, this.y, this.width, this.height)
      ctx.restore()
    }
    super.draw(ctx)
  }
}

class Ghost extends Enemy {
  constructor(game) {
    super(game)
    this.spriteWidth = 261
    this.spriteHeight = 209
    this.height = this.spriteHeight / 2
    this.width = this.spriteWidth / 2
    this.x = this.game.width
    this.y = Math.random() * this.game.height * 0.6
    this.image = enemy_ghost
    this.opacity = Math.random() * 0.9 + 0.4
    this.speed = Math.random() * 0.05 + 0.1
    this.angle = 0
    this.curve = Math.random() * 3
  }

  update(deltaTime) {
    super.update(deltaTime)
    this.y += Math.sin(this.angle) * this.curve
    this.angle += 0.04
  }

  draw(ctx) {
    ctx.save()
    ctx.globalAlpha = this.opacity
    super.draw(ctx)
    ctx.restore()
  }
}

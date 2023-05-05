class Raven {
  constructor(canvasWidth, canvasHeight, imageSrc, soundArr) {
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
    this.spriteWidth = 271
    this.spriteHeight = 194
    this.sizeModifier = Math.random() * 0.6 + 0.4
    this.width = this.spriteWidth * this.sizeModifier
    this.height = this.spriteHeight * this.sizeModifier
    this.x = this.canvasWidth
    this.y = Math.random() * (this.canvasHeight - this.height)
    this.directionX = Math.random() * 5 + 3
    this.directionY = Math.random() * 5 - 2.5
    this.markedForDeletion = false
    this.image = new Image()
    this.image.src = imageSrc
    this.sound_index = Math.floor(Math.random() * raven_sounds.length)
    this.sound = new Audio()
    this.sound.src =
      soundArr[Math.floor(Math.random() * soundArr.length)] ||
      './assets/crow_caw.wav'
    this.frame = 0
    this.maxFrame = 4
    this.timeSinceFlap = 0
    this.flapInterval = Math.random() * 50 + 50
    this.red = Math.floor(Math.random() * 255)
    this.green = Math.floor(Math.random() * 255)
    this.blue = Math.floor(Math.random() * 255)
    this.randomColors = [this.red, this.green, this.blue]
    this.color = `rgb(${this.red},${this.green},${this.blue})`
    this.isPlaySound = Math.floor(Math.random() * 4)
    this.hasTrail = Math.random() > 0.5
  }

  update(deltatime, particles) {
    // console.log('this.sound.src', this.sound.src)
    if (this.frame === 0 && this.isPlaySound === 1) {
      this.sound.play().catch((E) => {
        console.error('Error', E)
      })
    }

    this.x -= this.directionX
    this.y += this.directionY
    if (this.y < 0 || this.y > this.canvasHeight - this.height) {
      this.directionY = -this.directionY
    }
    // mark for deletion if it goes
    if (this.x < 0 - this.width) this.markedForDeletion = true

    // if deleted stop playing sound and remove sound obj
    if (this.markedForDeletion) {
      this.sound.pause()
    }
    this.timeSinceFlap += deltatime
    if (this.timeSinceFlap > this.flapInterval) {
      if (this.frame > this.maxFrame) {
        this.frame = 0
      } else {
        this.frame++
        if (this.hasTrail) {
          for (let i = 0; i < 3; i++) {
            particles.push(
              new Particle(this.x, this.y, this.height, this.color)
            )
          }
        }
      }
      this.timeSinceFlap = 0
    }
  }
  draw(ctx, collusionCtx) {
    collusionCtx.fillStyle = this.color
    collusionCtx.fillRect(this.x, this.y, this.width, this.height)
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

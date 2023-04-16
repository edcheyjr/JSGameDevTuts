class Explosion {
  constructor(x, y, imageSrc, soundSrc) {
    this.spriteWidth = 200
    this.spriteHeight = 179
    this.width = this.spriteWidth * 0.7
    this.height = this.spriteWidth * 0.7
    this.x = x
    this.y = y
    this.image = new Image()
    this.image.src = imageSrc
    this.sound = new Audio()
    this.sound.src = soundSrc
    this.frame = 0
    this.timeSinceLastFrame = 0
    this.frameInterval = 200
    this.markedForDeletion = false

    this.angle = Math.random() * 6.2
  }
  update(deltatime) {
    if (this.frame === 0) this.sound.play()
    this.timeSinceLastFrame += deltatime
    if (this.timeSinceLastFrame > this.frameInterval) {
      ++this.frame
      this.timeSinceLastFrame = 0
      if (this.frame > 5) this.markedForDeletion = true
    }
  }
  draw(ctx) {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.angle)
    ctx.drawImage(
      this.image,
      this.spriteWidth * this.frame,
      0,
      this.spriteWidth,
      this.spriteHeight,
      0 - this.width * 0.5,
      0 - this.height * 0.5,
      this.width,
      this.height
    )
    ctx.restore()
  }
}

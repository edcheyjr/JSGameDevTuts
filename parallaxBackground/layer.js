class Layer {
  constructor(image, gameSpeed, speedModifier, width = 2400, height = 700) {
    this.x = 0
    this.y = 0
    this.width = width
    this.height = height
    // this.gameFrame = 0
    this.image = image
    this.speedModifier = speedModifier
    this.speed = gameSpeed * this.speedModifier
  }
  update() {
    this.speed = gameSpeed * this.speedModifier
    if (this.x < -this.width) {
      this.x = 0
    }

    this.x = Math.floor(this.x - this.speed)

    // this.x = (this.gameFrame * this.speed) % this.width
  }
  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    ctx.drawImage(
      this.image,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    )
    // this.gameFrame--
  }
}

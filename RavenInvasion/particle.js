class Particle {
  constructor(x, y, size, color) {
    this.size = size
    this.x = x + this.size + Math.random() * 50 - 25
    this.y = y + this.size * 0.33333
    this.radius = Math.random() * (this.size * 0.1)
    this.maxRadius = Math.random() * 20 + 35
    this.speedX = Math.random() * 1 + 0.5
    this.markedForDeletion = false
    this.color = color
    this.globalAlpha = 0
  }
  update() {
    this.x += this.speedX
    this.reflectionX += this.speedX
    this.radius += 0.3
    this.globalAlpha -= 0.1
    if (this.radius > this.maxRadius) this.markedForDeletion = true
  }
  draw(ctx) {
    ctx.save()
    ctx.globalAlpha = 1 - this.radius / this.maxRadius
    ctx.beginPath()
    // ctx.strokeStyle = this.color
    ctx.fillStyle = this.color
    // ctx.lineWidth = 2.5
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    // ctx.stroke()
    ctx.fill()
    ctx.closePath()
    ctx.restore()
  }
}

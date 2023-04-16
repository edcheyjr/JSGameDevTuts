class Circle {
  constructor(x, y, radius = 10, startAngle = 0, endAngle = 2) {
    this.x = x
    this.y = y
    this.radius = radius
    this.startAngle = startAngle
    this.endAngle = endAngle * Math.PI
    this.fillStyle = 'black'
  }
  update(mouseX, mouseY, fillStyle = 'black') {
    this.x = mouseX - this.radius * 0.5
    this.y = mouseY - this.radius * 0.5
    this.fillStyle = fillStyle
  }
  draw(ctx) {
    ctx.beginPath()
    ctx.fillStyle = this.fillStyle
    ctx.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle)
    ctx.stroke()
    ctx.fill()
    ctx.closePath()
  }
}

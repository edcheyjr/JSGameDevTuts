class Rectangle {
  constructor(x, y, width, height, fillStyle) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.fillStyle = fillStyle
  }
  update(mouseX, mouseY, fillStyle) {
    // on mouse click update the position of the rectangle to the place clicked
    this.x = mouseX - this.width * 0.5
    this.y = mouseY - this.height * 0.5
    this.fillStyle = fillStyle
  }
  draw(ctx) {
    ctx.fillStyle = this.fillStyle
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}

class Heart {
  constructor(x, y, size) {
    this.x = x
    this.y = y
    this.image = new Image()
    this.image.src = './assets/heart.png'
    this.size = size
    this.markedForDeletion = false
  }
  update(heart) {
    if (heart) {
      this.x = heart.x + 50
    }
  }
  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.size, this.size)
  }
}

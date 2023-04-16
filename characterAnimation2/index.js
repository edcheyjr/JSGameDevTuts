/**
 * @type {HTMLCanvasElement}
 */

window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas1')
  const ctx = canvas.getContext('2d')

  const CANVAS_WIDTH = (canvas.width = 800)
  const CANVAS_HEIGHT = (canvas.height = 600)

  let lastTime = 1
  const game = new Game(ctx, CANVAS_WIDTH, CANVAS_HEIGHT)
  function animate(timeStamp) {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    const deltaTime = timeStamp - lastTime
    game.update(deltaTime)
    game.draw()
    lastTime = timeStamp
    requestAnimationFrame(animate)
  }
  animate(0)
})

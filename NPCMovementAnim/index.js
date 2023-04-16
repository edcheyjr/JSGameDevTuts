/**
 * NPC players momement animation
 *
 *
 * @type {HTMLCanvasElement}
 */

const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')

CANVAS_WIDTH = canvas.width = 500
CANVAS_HEIGHT = canvas.height = 1000
const numberOfEnemies = 100
const enemiesArray = []
let gameFrame = 0

const enemyImage = new Image()

for (let i = 0; i < numberOfEnemies; i++) {
  enemiesArray.push(new SpikeEnemy(enemyImage))
}

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  enemiesArray.forEach((enemy) => {
    enemy.draw(ctx)
    enemy.update(gameFrame)
  })
  gameFrame++
  requestAnimationFrame(animate)
}

animate()

/**
 * NPC players momement animation
 *
 *
 * @type {HTMLCanvasElement}
 */

const Enemies = ['spike', 'bat', 'bat2', 'ghost']

const canvas = document.getElementById('canvas1')
const select = document.querySelector('#npc')
const ctx = canvas.getContext('2d')
// console.log('select', select)
// events
let enemyState = Enemies[0]
let enemiesArray = []
let isAnimating = true

select.addEventListener('change', (e) => {
  enemyState = e.target.value
})

CANVAS_WIDTH = canvas.width = 500
CANVAS_HEIGHT = canvas.height = 1000
const numberOfEnemies = 100
let gameFrame = 0
for (let i = 0; i < numberOfEnemies; i++) {
  enemiesArray.push(new SpikeEnemy(new Image(), Enemies[0]))
  enemiesArray.push(new BatEnemy(new Image(), Enemies[1]))
  enemiesArray.push(new BatTwoEnemy(new Image(), Enemies[2]))
  enemiesArray.push(new GhostEnemy(new Image(), Enemies[3]))
}

console.log('enemiesArray', enemiesArray)
isAnimating = true
if (Enemies.includes(enemyState)) {
  isAnimating = true
}
if (isAnimating) {
  function animate() {
    // canvas.height = 1000
    // canvas.width = 500
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    if (enemyState == Enemies[0]) {
      enemiesArray
        .filter((enemy) => enemy.name == Enemies[0])
        .forEach((enemy) => {
          enemy.draw(ctx)
          enemy.update(gameFrame)
        })
    } else if (enemyState == Enemies[1]) {
      enemiesArray
        .filter((enemy) => enemy.name == Enemies[1])
        .forEach((enemy) => {
          enemy.draw(ctx)
          enemy.update(gameFrame)
        })
    } else if (enemyState == Enemies[2]) {
      enemiesArray
        .filter((enemy) => enemy.name == Enemies[2])
        .forEach((enemy) => {
          enemy.draw(ctx)
          enemy.update(gameFrame)
        })
    } else if (enemyState == Enemies[3]) {
      enemiesArray
        .filter((enemy) => enemy.name == Enemies[3])
        .forEach((enemy) => {
          enemy.draw(ctx)
          enemy.update(gameFrame)
        })
    } else {
      isAnimating = false
      console.log('Not valid')
    }

    gameFrame++
    requestAnimationFrame(animate)
  }

  animate()
}

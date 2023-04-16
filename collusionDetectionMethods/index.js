/**
 * @type {HTMLCanvasElement}
 */

const Options = {
  RECTANGLE: 'rectangle',
  CIRCLE: 'circle',
}

const canvas = document.getElementById('canvas')
const select = document.querySelector('#shapes')
const ctx = canvas.getContext('2d')
const CANVAS_WIDTH = (canvas.width = 800)
const CANVAS_HEIGHT = (canvas.height = 800)
const canvasPosition = canvas.getBoundingClientRect()

// options selection
let option = Options.RECTANGLE
select.addEventListener('change', (e) => {
  option = e.target.value
})
// canvas Offset
let mouseX = 0
let mouseY = 0
canvas.addEventListener('click', (e) => {
  e.preventDefault()
  mouseX = e.x - canvasPosition.left
  mouseY = e.y - canvasPosition.top
})

// new rectangle
const rect1 = new Rectangle(
  CANVAS_WIDTH * 0.5 - 100,
  CANVAS_HEIGHT * 0.5 - 100,
  200,
  200,
  'black'
)
const rect2_color = 'green'
const rect2 = new Rectangle(-500, -500, 200, 200, rect2_color)

// NEW circle
const circle1 = new Circle(-500, -500, 100)
const circle2 = new Circle(
  CANVAS_WIDTH * 0.5 - 100,
  CANVAS_HEIGHT * 0.5 - 100,
  100
)

let isAnimate = true
if (option == Options.RECTANGLE || (option == Options) == Options.CIRCLE) {
  isAnimate = true
}

if (isAnimate) {
  function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    console.log('option', option)
    if (option == Options.RECTANGLE) {
      rect1.draw(ctx)
      rect2.draw(ctx)
      const isTouched = checkRectangleCollusion(rect1, rect2)
      rect2.update(mouseX, mouseY, isTouched ? 'red' : rect2_color)
    } else if (option == Options.CIRCLE) {
      circle2.draw(ctx)
      circle1.draw(ctx)
      const isCollided = checkCircleCollusion(circle1, circle2)
      circle1.update(mouseX, mouseY, isCollided ? 'red' : rect2_color)
    } else {
      console.log('this option is not developed yet!')
      isAnimate = false
    }
    requestAnimationFrame(animate)
  }

  animate()
}

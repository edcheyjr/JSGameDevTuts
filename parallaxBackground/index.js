const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
const CANVAS_WIDTH = (canvas.width = 800)
const CANVAS_HEIGHT = (canvas.height = 700)

let gameSpeed = 4

// bg images
const backgroundLayer1 = new Image()
backgroundLayer1.src = './assets/layer-1.png'

const backgroundLayer2 = new Image()
backgroundLayer2.src = './assets/layer-2.png'

const backgroundLayer3 = new Image()
backgroundLayer3.src = './assets/layer-3.png'

const backgroundLayer4 = new Image()
backgroundLayer4.src = './assets/layer-4.png'

const backgroundLayer5 = new Image()
backgroundLayer5.src = './assets/layer-5.png'

window.addEventListener('load', () => {
  // slider
  const slider = document.getElementById('slider')
  const showGameSpeed = document.getElementById('showGameSpeed')
  slider.value = gameSpeed
  slider.min = 0
  slider.max = 20
  showGameSpeed.innerHTML = gameSpeed

  slider.addEventListener('change', (e) => {
    gameSpeed = e.target.value
    showGameSpeed.innerHTML = gameSpeed
  })

  // layers intialization
  const layer5 = new Layer(backgroundLayer5, gameSpeed, 0.6)
  const layer4 = new Layer(backgroundLayer4, gameSpeed, 0.4)
  const layer3 = new Layer(backgroundLayer3, gameSpeed, 0.2)
  const layer2 = new Layer(backgroundLayer2, gameSpeed, 0.2)
  const layer1 = new Layer(backgroundLayer1, gameSpeed, 0.2)

  const gameObject = [layer1, layer2, layer3, layer4, layer5]

  function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    gameObject.forEach((obj) => {
      obj.update()
      obj.draw(ctx)
    })
    requestAnimationFrame(animate)
  }

  animate()
})

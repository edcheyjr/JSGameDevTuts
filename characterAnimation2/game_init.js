// game intialization
class Game {
  constructor(ctx, width, height) {
    this.ctx = ctx
    this.width = width
    this.height = height
    this.enemies = [] // enemies array
    this.enemyInterval = 200
    this.enemyTimer = 0
    this.numberOfEmemies = {
      worm: 0,
      spider: 10,
      ghost: 0,
    } // enemies with zero not implemented to object pool
    this.enemyType = ['worm', 'ghost', 'spider']
    this.isReady = false // change this state only when all intial object are loaded to various object data holders enemy for this instance this will be done like will game is loading
  }
  update(deltaTime) {
    // first add all spiders which will be intially loaded
    if (!this.isReady) {
      // this code execute only the first time game is loaded
      // Spider Initialization
      for (let i = 0; i < this.numberOfEmemies.spider; i++) {
        let spider
        if (i == 0) {
          spider = new Spider(this, true)
        } else {
          spider = new Spider(this)
        }
        this.enemies.push(spider)
      }
      //  Initialization
      this.isReady = true
    } else {
      // Timer for adding new enemies
      if (this.enemyTimer > this.enemyInterval) {
        this.#addNewEnemy()
        this.enemyTimer = 0
        // TODO: impliment object pooling instead of deleting the object on screen load them at runtime and reuse to improve performance
        this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion)
      } else {
        this.enemyTimer += deltaTime
      }
      this.enemies.forEach((obj) => obj.update(deltaTime))
      console.log('enemies', this.enemies)
    }
  }
  draw() {
    this.isReady && this.enemies.forEach((obj) => obj.draw(this.ctx))
  }

  //private function for add new enemy
  #addNewEnemy() {
    const randomEnemy =
      this.enemyType[Math.floor(Math.random() * this.enemyType.length)]
    if (randomEnemy == this.enemyType[0]) this.enemies.push(new Worm(this))
    else if (randomEnemy == this.enemyType[1])
      this.enemies.push(new Ghost(this))
    // else if (randomEnemy == this.enemyType[2])
    //   this.enemies.push(new Spider(this))
    // sort the enemies from top to bottom how they overlap
    this.enemies.sort((a, b) => a.y - b.y)
  }
}

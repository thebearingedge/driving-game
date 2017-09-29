const rotations = {
  north: 0,
  east: 90,
  south: 180,
  west: 270
}

class Car {
  constructor($marker, direction, location) {
    this.$marker = $marker
    this.direction = direction
    this.location = location
    this.lastInterval = null
    this.currentInterval = null
    this.topSpeed = 5
    this.currentSpeed = 0
    this.acceleration = 0.1
    this.traction = 0.05
    this.isStarted = false
    this.isAccelerating = false
    const [ x, y ] = location
    $marker.style.left = x + 'px'
    $marker.style.top = y + 'px'
    $marker.style.transform = 'rotate(' + rotations[direction] + 'deg)'
  }
  accelerate() {
    this.isAccelerating = this.isStarted
  }
  coast() {
    this.isAccelerating = false
  }
  update() {
    const { currentSpeed, isAccelerating } = this

    if (!currentSpeed && !isAccelerating) return

    const { direction, location } = this

    switch (direction) {
      case 'east':
        location[0] += currentSpeed
        break
      case 'south':
        location[1] += currentSpeed
        break
      case 'west':
        location[0] -= currentSpeed
        break
      case 'north':
        location[1] -= currentSpeed
    }

    const [ x, y ] = location
    const { $marker } = this

    $marker.style.left = x + 'px'
    $marker.style.top = y + 'px'

    const { topSpeed, acceleration, traction } = this

    this.currentSpeed = isAccelerating
      ? Math.min(topSpeed, currentSpeed + acceleration)
      : Math.max(0, currentSpeed - traction)
  }
  start() {
    this.isStarted = true
    if (this.lastInterval) clearInterval(this.lastInterval)
    const newInterval = this.currentInterval = setInterval(() => {
      if (newInterval !== this.currentInterval) {
        clearInterval(newInterval)
      }
      this.update()
    }, 16)
  }
  stop() {
    this.coast()
    this.isStarted = false
    this.lastInterval = this.currentInterval
  }
  turn(direction) {
    this.direction = direction
    this.$marker.style.transform = 'rotate(' + rotations[direction] + 'deg)'
  }
}

const $car = document.createElement('img')
$car.setAttribute('src', 'images/viper.png')
$car.setAttribute('class', 'car')

const viper = new Car($car, 'east', [0, 0])

const directions = {
  'ArrowUp': 'north',
  'ArrowRight': 'east',
  'ArrowDown': 'south',
  'ArrowLeft': 'west'
}

document.body.appendChild($car)
document.addEventListener('keydown', ({ key }) => {
  if (key in directions && viper.isStarted) {
    return viper.turn(directions[key])
  }
  if (key === 's') {
    return viper.isStarted
      ? viper.stop()
      : viper.start()
  }
  if (key === ' ') viper.accelerate()
})
document.addEventListener('keyup', ({ key }) => {
  if (key === ' ') viper.coast()
})

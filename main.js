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
    this.interval = null
    this.topSpeed = 5
    this.currentSpeed = 0
    this.acceleration = 1
    this.isAccelerating = false
    const [ x, y ] = location
    $marker.style.left = x + 'px'
    $marker.style.top = y + 'px'
    $marker.style.transform = 'rotate(' + rotations[direction] + 'deg)'
  }
  accelerate() {
    this.isAccelerating = true
  }
  decelerate() {
    this.isAccelerating = false
  }
  update() {
    const {
      $marker,
      location,
      direction,
      currentSpeed,
      isAccelerating
    } = this

    if (!currentSpeed && !isAccelerating) return

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
    $marker.style.left = x + 'px'
    $marker.style.top = y + 'px'
  }
  start() {
    this.interval = setInterval(() => {
      this.update()
    }, 16)
  }
  stop() {
    clearInterval(this.interval)
    this.interval = null
  }
  get isStarted() {
    return !!this.interval
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
  if (key === ' ') viper.decelerate()
})

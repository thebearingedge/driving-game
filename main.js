const rotations = {
  north: 0,
  east: 90,
  south: 180,
  west: 270
}

class Car {
  constructor($marker, direction, speed, location) {
    this.$marker = $marker
    this.direction = direction
    this.speed = speed
    this.location = location
    this.interval = null
    const [ x, y ] = location
    $marker.style.left = x + 'px'
    $marker.style.top = y + 'px'
    $marker.style.transform = 'rotate(' + rotations[direction] + 'deg)'
  }
  move() {
    const { $marker, direction, speed, location } = this
    switch (direction) {
      case 'east':
        location[0] += speed
        break
      case 'south':
        location[1] += speed
        break
      case 'west':
        location[0] -= speed
        break
      case 'north':
        location[1] -= speed
    }
    const [ x, y ] = location
    $marker.style.left = x + 'px'
    $marker.style.top = y + 'px'
  }
  start() {
    this.interval = setInterval(() => {
      this.move()
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

const viper = new Car($car, 'east', 5, [0, 0])

const keyMap = {
  'ArrowUp': 'north',
  'ArrowRight': 'east',
  'ArrowDown': 'south',
  'ArrowLeft': 'west'
}

document.body.appendChild($car)
document.addEventListener('keydown', ({ key }) => {
  if (key in keyMap && viper.isStarted) {
    return viper.turn(keyMap[key])
  }
  if (key !== 's') return
  viper.isStarted
    ? viper.stop()
    : viper.start()
})

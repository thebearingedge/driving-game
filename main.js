const $car = document.createElement('img')
$car.setAttribute('src', 'images/viper.png')
$car.setAttribute('class', 'car')

document.body.appendChild($car)

class Car {
  constructor($marker, direction, speed, location) {
    this.$marker = $marker
    this.direction = direction
    this.speed = speed
    this.location = location
    $marker.classList.add(direction)
    const [ x, y ] = location
    $marker.style.left = x + 'px'
    $marker.style.top = y + 'px'
  }
  move() {
    const { $marker, direction, speed, location } = this
    switch (direction) {
      case 'east':
        location[0] += speed
    }
    const [ x, y ] = location
    $marker.style.left = x + 'px'
    $marker.style.top = y + 'px'
  }
}

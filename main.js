const $car = document.createElement('img')
$car.setAttribute('src', 'images/viper.png')
$car.setAttribute('class', 'car')

document.body.appendChild($car)

class Car {
  constructor($marker, direction, speed, location) {
    $marker.classList.add(direction)
    this.$marker = $marker
    this.direction = direction
    this.location = location
  }
}

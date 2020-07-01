function PlayerCar(imageSrc, width, height, speed) {
  this.super(imageSrc, width, height, speed);
}
extend(PlayerCar, Car);

PlayerCar.prototype.moveLeft = function (lanes) {
  if (this.laneIndex != 0) {
    this.laneIndex--;
  } else {
    this.laneIndex = 0;
  }

  this.x = lanes[this.laneIndex];
  this.render();
};

PlayerCar.prototype.moveRight = function (lanes) {
  var lastIndex = 2;

  if (this.laneIndex < lastIndex) {
    this.laneIndex++;
  } else {
    this.laneIndex = lastIndex;
  }

  this.x = lanes[this.laneIndex];
  this.render();
};

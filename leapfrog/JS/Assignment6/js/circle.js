/**
 * Circle Class
 */
function Circle(isUpperStrand) {
  this.radius = 5;
  this.radiusAmp = 5;
  this.x = 0;
  this.y = 0;

  this.currentX;
  this.currentY = 100;
  this.degree = 180;
  this.amplitude = 55;
  this.speed = 2;

  if (isUpperStrand) {
    this.phase = 0;
  } else {
    this.phase = Math.PI;
  }
}

/**
 * Draws circle
 */
Circle.prototype.render = function (context) {
  context.beginPath();
  context.fillStyle = "white";
  context.arc(this.x, this.y, this.radius, START_ANGLE, Math.PI * 2);
  context.closePath();
  context.fill();
};

/**
 * Updates circle position
 */
Circle.prototype.update = function () {
  var tempX = (this.speed * this.currentX * Math.PI) / this.degree;

  this.currentX = ++this.currentX % this.degree;

  if (this.currentX <= this.degree) {
    this.currentX++;
    this.y = this.amplitude * Math.sin(tempX + this.phase) + this.currentY;
    this.radius =
      (this.radiusAmp / 2) * Math.cos(tempX + this.phase) + this.radiusAmp / 2;
  } else {
    this.currentX = 0;
  }
};

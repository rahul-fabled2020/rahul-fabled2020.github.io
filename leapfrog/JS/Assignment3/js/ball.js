function Ball(radius, color, mass) {
  if (typeof radius === "undefined") radius = 20;
  if (typeof color === "undefined") color = "#0000ff";
  if (typeof mass === "undefined") mass = 1;

  Particle.call(this, mass);
  this.radius = radius;
  this.color = color;
}

Ball.prototype = Object.create(Particle.prototype);
Ball.prototype.constructor = Ball;

Ball.prototype.render = function (context) {
  context.fillStyle = this.color;
  context.beginPath();
  context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
  context.closePath();
  context.fill();
};

Ball.isColliding = function (ball1, ball2) {
    var difference = Vector.distance(ball1.position, ball2.position) - (ball1.radius + ball2.radius)
    if(difference <= 0){
        
        return true;
    }

    return false;
};

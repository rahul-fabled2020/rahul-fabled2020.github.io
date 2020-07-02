/**
 * Helix Class
 */
function Helix() {
  var canvas = document.getElementById("helix");
  this.context = canvas.getContext("2d");

  this.numOfRows = 10;
  this.numOfCols = 16;

  this.circles = [];

  this.cirleOffSetY = 50;
  this.spaceBetweenCircles = 20;

  /**
   * Creates circle and initiates animation
   */
  this.init = function () {
    this.createCircles(false);
    this.createCircles(true);
    this.animate();
  };

  this.init();
}

/**
 * Draws the helix background
 */
Helix.prototype.render = function () {
  this.context.fillStyle = "#043a4a";
  this.context.fillRect(
    0,
    0,
    this.context.canvas.width,
    this.context.canvas.height
  );
};

/**
 * Creates circles for each strand
 */
Helix.prototype.createCircles = function (isUpperStrand) {
  let y = this.cirleOffSetY;

  for (let i = 0; i < this.numOfRows; i++) {
    y += this.spaceBetweenCircles;

    let x = 0;
    let phaseIncrease = 5;
    let currentPhase = 0;

    for (let j = 0; j < this.numOfCols; j++) {
      var circle = new Circle(isUpperStrand);
      circle.x = x += this.spaceBetweenCircles;
      circle.y = y;
      circle.currentX = currentPhase += phaseIncrease;
      circle.currentY = y;

      this.circles.push(circle);
    }
  }
};

/**
 * Moves the circles up and down to and fro
 */
Helix.prototype.animate = function () {
  var self = this;
  this.render();

  for (let i = 0; i < this.circles.length; i++) {
    this.circles[i].render(self.context);
    this.circles[i].update();
  }
  requestAnimationFrame(self.animate.bind(self));
};

new Helix();

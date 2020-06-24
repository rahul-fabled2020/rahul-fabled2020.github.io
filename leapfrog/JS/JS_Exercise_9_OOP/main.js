// Point class
function Ball(x, y, radius, color) {
  // Properties
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.ball = document.createElement("div");
  this.direction = 2 * Math.PI * Math.random();

  // Methods
  this.getX = function () {
    return this.x;
  };

  this.getY = function () {
    return this.y;
  };

  this.getRadius = function () {
    return this.radius;
  };

  this.getColor = function () {
    return this.color;
  };

  this.setX = function (x) {
    this.x = x;
  };

  this.setY = function (y) {
    this.y = y;
  };

  this.setRadius = function (radius) {
    this.radius = radius;
  };

  this.setColor = function (color) {
    this.color = color;
  };

  this.getDomNode = function () {
    return this.ball;
  };

  this.applyStyles = function (domBall) {
    domBall.style.top = this.y + "px";
    domBall.style.left = this.x + "px";
    domBall.style.height = 2 * this.radius + "px";
    domBall.style.width = 2 * this.radius + "px";
    domBall.style.borderRadius = "50%";
    domBall.style.position = "absolute";
    domBall.style.backgroundColor = this.color;
  };

  this.animateBall = function (container, speed) {
    var x = this.x;
    var y = this.y;
    var vx = Math.cos(this.direction) * speed;
    var vy = Math.sin(this.direction) * speed;
    var height = parseFloat(container.style.height);
    var width = parseFloat(container.style.width);

    var LEFT_BOUNDARY = 0;
    var RIGHT_BOUNDARY = width - 2 * this.radius;
    var ABOVE_BOUNDARY = 0;
    var BELOW_BOUNDARY = height - 2 * this.radius;

    x += vx;
    y += vy;

    this.setX(x);
    this.setY(y);

    if (x >= RIGHT_BOUNDARY || x < LEFT_BOUNDARY) {
      this.direction = Math.atan2(
        Math.sin(this.direction),
        -Math.cos(this.direction)
      );
    }

    if (y >= BELOW_BOUNDARY || y < ABOVE_BOUNDARY) {
      this.direction = Math.atan2(
        -Math.sin(this.direction),
        Math.cos(this.direction)
      );
    }

    this.applyStyles(this.getDomNode());

    console.log(this);
    requestAnimationFrame(() => {
      this.animateBall(container, speed);
    }, 1000 / 60);
  };

  this.applyStyles(this.ball);
}

// Container class
function Container(width, height, balls) {
  // Properties
  this.height = height;
  this.width = width;
  this.balls = balls;
  this.containerDom = document.createElement("div");

  // Methods
  this.getHeight = function () {
    return this.height;
  };

  this.getWidth = function () {
    return this.width;
  };

  this.setHeight = function () {
    this.height = height;
  };

  this.setWidth = function () {
    this.width = width;
  };

  addClickEvent = function (ball) {
    // Adding Event Listener
    ball.getDomNode().addEventListener("click", function () {
      red = Math.floor(Math.random() * 255);
      green = Math.floor(Math.random() * 255);
      blue = Math.floor(Math.random() * 255);
      color = "rgb(" + red + "," + green + "," + blue + ")";
      ball.setColor(color);
      ball.applyStyles(this);
    });
  };

  renderBall = function (ball, container) {
    // Attaching the ball to the container
    SPEED = Math.random() * 15 + 5;
    ball.animateBall(container, SPEED);
    container.appendChild(ball.getDomNode());
  };

  this.render = function (x, y) {
    var box = this.containerDom;
    box.style.height = this.height + "px";
    box.style.width = this.width + "px";
    box.style.border = "1px solid black";
    box.style.position = "absolute";
    box.style.top = (y || 0) + "px";
    box.style.left = (x || 0) + "px";
    box.style.overflow = "hidden";

    this.balls.forEach(function (ball) {
      addClickEvent(ball);
      renderBall(ball, box);
    });

    document.body.appendChild(box);
  };
}

function getBalls(numberOfBalls, radius, rangeX, rangeY) {
  balls = [];
  for (let i = 0; i < numberOfBalls; i++) {
    // x = Math.random() * (rangeX - 2 * radius);
    // y = Math.random() * (rangeY - 2 * radius);
    x = rangeX / 2;
    y = rangeY / 2;
    red = Math.floor(Math.random() * 255);
    green = Math.floor(Math.random() * 255);
    blue = Math.floor(Math.random() * 255);
    color = "rgb(" + red + "," + green + "," + blue + ")";
    ball = new Ball(x, y, radius, color);
    balls.push(ball);
  }

  return balls;
}

HEIGHT = 300;
WIDTH = 450;

container = new Container(WIDTH, HEIGHT, getBalls(1, 20, HEIGHT, WIDTH));
container.render(50, 50);

container = new Container(WIDTH, HEIGHT, getBalls(2, 20, HEIGHT, WIDTH));
container.render(50 + WIDTH, 50);

container = new Container(WIDTH, HEIGHT, getBalls(3, 20, HEIGHT, WIDTH));
container.render(50, 50 + HEIGHT);

container = new Container(WIDTH, HEIGHT, getBalls(1, 20, HEIGHT, WIDTH));
container.render(50 + WIDTH, 50 + HEIGHT);

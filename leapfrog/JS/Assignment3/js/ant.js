function BallCanvas(id) {
  var canvas = document.getElementById(id);
  var context = canvas.getContext("2d");
  var ONE_THOUSANDTH_SECOND = 0.001;
  var canvasHeight = 700;
  var canvasWidth = 1400;

  canvas.height = canvasHeight;
  canvas.width = canvasWidth;

  var balls = [];
  var t0;
  var dt;
  var animationId;
  var numOfBalls = 5;
  var DENSITY = 0.01;
  var MINIMUM_RADIUS = 20;
  var MINIMUM_VELOCITY = 40;
  var colors = ["red", "green", "blue", "#111", "maroon", "black"];

  this.init = function () {
    var ball;
    var radius;
    var volume;
    var mass;
    var color;
    var x;
    var y;
    var vx;
    var vy;
    var sign;

    for (var i = 0; i < numOfBalls; i++) {
      radius = Math.random() * 20 + MINIMUM_RADIUS; //radius is in the range (MINIMUM_RADIUS, MINIMUM_RADIUS+20)

      volume = (4 / 3) * Math.PI * radius * radius * radius;
      mass = volume * DENSITY;

      color = colors[parseInt(Math.random() * colors.length)];

      x = Math.random() * (canvasWidth - radius) + radius;
      y = Math.random() * (canvasHeight - radius) + radius;

      sign = [-1, 1][parseInt(Math.random() * 2)];
      vx = sign * (Math.random() * 100 + MINIMUM_VELOCITY);
      vy = sign * (Math.random() * 100 + MINIMUM_VELOCITY);

      ball = new Ball(radius, color, mass);
      ball.position = new Vector(x, y);
      ball.velocity = new Vector(vx, vy);

      if (i > 0) {
        for (var j = 0; j < balls.length; j++) {
          if (Ball.isColliding(ball, balls[j])) {
            x = Math.random() * canvasWidth;
            y = Math.random() * canvasHeight;

            ball.position = new Vector(x, y);
            j = -1;
          }
        }
      }

      balls.push(ball);
    }

    attachEventHandler(balls, context);

    renderBalls();
    t0 = new Date().getTime();
    animationFrame();
  };

  function animationFrame() {
    animationId = requestAnimationFrame(animationFrame, canvas);
    onTimer();
  }

  function onTimer() {
    var THRESHOLD_TIME = 0.2;
    var t1 = new Date().getTime();

    dt = ONE_THOUSANDTH_SECOND * (t1 - t0);
    t0 = t1;

    if (dt > THRESHOLD_TIME) {
      dt = 0;
    }

    handleWallCollision();
    handleBallCollision();
    move();
  }

  function move() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < numOfBalls; i++) {
      var ball = balls[i];
      ball.position = ball.position.addScaled(ball.velocity, dt);
      ball.render(context);
    }
  }

  function handleBallCollision() {
    for (var i = 0; i < balls.length; i++) {
      var ball1 = balls[i];
      for (var j = i + 1; j < balls.length; j++) {
        var ball2 = balls[j];
        if (Ball.isColliding(ball1, ball2)) {
          var m1 = ball1.mass;
          var m2 = ball2.mass;
          var u1 = ball1.velocity.copy();
          var u2 = ball2.velocity.copy();

          var distance = ball1.position.subtract(ball2.position);
          var normalVelocity1 = ball1.velocity.project(distance);
          var normalVelocity2 = ball2.velocity.project(distance);

          var difference = ball1.radius + ball2.radius - distance.magnitude();
          var relativeVelocity = normalVelocity1
            .subtract(normalVelocity2)
            .magnitude();

          //Updating Ball's position
          ball1.position = ball1.position.addScaled(
            normalVelocity1,
            -difference / relativeVelocity
          );
          ball2.position = ball2.position.addScaled(
            normalVelocity2,
            -difference / relativeVelocity
          );

          //Velocity after collision
          ball1.velocity = u1
            .multiply(m1 - m2)
            .add(u2.multiply(2 * m2))
            .multiply(1 / (m1 + m2));
          ball2.velocity = u2
            .multiply(m2 - m1)
            .add(u1.multiply(2 * m1))
            .multiply(1 / (m1 + m2));
        }
      }
    }
  }

  function handleWallCollision() {
    for (var i = 0; i < balls.length; i++) {
      var ball = balls[i];

      //Right boundary
      if (ball.x > canvasWidth - ball.radius) {
        ball.x = canvasWidth - ball.radius; // reposition ball at wall edge
        ball.vx *= -1; // reverse ball’s velocity
      }

      //Left Boudnary
      if (ball.x < ball.radius) {
        ball.x = ball.radius; // reposition ball at wall edge
        ball.vx *= -1; // reverse ball’s velocity
      }

      //Top Boundary
      if (ball.y < ball.radius) {
        ball.y = ball.radius; // reposition ball at wall edge
        ball.vy *= -1; // reverse ball’s velocity
      }

      //Bottom Boundary
      if (ball.y > canvasHeight - ball.radius) {
        ball.y = canvasHeight - ball.radius; // reposition ball at wall edge
        ball.vy *= -1; // reverse ball’s velocity
      }
    }
  }

  function renderBalls() {
    for (var i = 0; i < balls.length; i++) {
      balls[i].render(context);
    }
  }

  function attachEventHandler(elements, context) {
    canvas.addEventListener(
      "click",
      function (event) {
        mouse = new Vector(event.clientX, event.clientY);
        for (var i = 0; i < elements.length; i++) {
          if (Vector.distance(elements[i].position, mouse) < elements[i].radius) {
              console.log("hello")
            elements = elements.filter((items, index) => elements[i] !== index)
          }
        }
      },
      false
    );
  }
}

Ball.prototype.render = function (context) {
  context.save();
  context.beginPath();
  context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
  context.closePath();
  context.clip();

  var img = new Image();
  img.src = "images/ant.gif";

  context.drawImage(
    img,
    this.x - this.radius / 1.5,
    this.y - this.radius / 2,
    this.radius * 1.5,
    this.radius * 1.2
  );

  context.beginPath();
  context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
  context.clip();
  context.closePath();
  context.restore();
};

canvas1 = new BallCanvas("antSmasher");
window.onload = canvas1.init;

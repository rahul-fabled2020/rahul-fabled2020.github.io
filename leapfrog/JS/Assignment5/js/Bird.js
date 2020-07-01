function Bird(x, y, width, height, radius) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.radius = radius;

  this.frame = 0;
  this.gravity = 0.25;
  this.jump = 4.6;
  this.speed = 0;
  this.rotation = 0;
}

Bird.prototype.render = function (context) {
  let bird = ANIMATION[this.frame];

  context.save();
  context.translate(this.x, this.y);
  context.rotate(this.rotation);
  context.drawImage(
    SPRITE,
    bird.sourceX,
    bird.sourceY,
    this.width,
    this.height,
    -this.width / 2,
    -this.height / 2,
    this.width,
    this.height
  );
  context.restore();
};

Bird.prototype.flap = function () {
  this.speed = -this.jump;
};

Bird.prototype.update = function (gameState, foreground, context, gameFrame) {
  if (gameState.current == GET_READY) {
    this.period = FAST_FLAP_PERIOD;
  } else {
    this.period = SLOW_FLAP_PERIOD;
  }

  if (gameFrame % this.period == 0) {
    this.frame += 1;
  } else {
    this.frame += 0;
  }

  this.frame = this.frame % ANIMATION.length;

  if (gameState.current == GET_READY) {
    this.y = 150;
    this.rotation = toRadian(0);
  } else {
    this.speed += this.gravity;
    this.y += this.speed;

    if (this.y + this.height / 2 >= context.canvas.height - foreground.height) {
      this.y = context.canvas.height - foreground.height - this.height / 2;
      if (gameState.current == GAME) {
        gameState.current = OVER;
      }
    }

    if(this.speed >= this.jump) {
        this.rotation = toRadian(90);
        this.frame = 1;
    } else {
        this.rotation = toRadian(-25);
    }
  }
};

Bird.prototype.resetSpeed = function() {
    this.speed = 0;
}

function Pipe(width, height, gap, vx) {
  this.position = [];
  this.width = width;
  this.height = height;
  this.gap = gap;
  this.vx = vx;
}

Pipe.prototype.render = function (context) {
  for (let i = 0; i < this.position.length; i++) {
    let pos = this.position[i];

    let topYPos = pos.y;
    let bottomYPos = pos.y + this.height + this.gap;

    //Drawing Top Pipe
    context.drawImage(
      SPRITE,
      TOP_PIPE_DIMENSION.sourceX,
      TOP_PIPE_DIMENSION.sourceY,
      this.width,
      this.height,
      pos.x,
      topYPos,
      this.width,
      this.height
    );

    //Drawing Bottom Pipe
    context.drawImage(
      SPRITE,
      BOTTOM_PIPE_DIMENSION.sourceX,
      BOTTOM_PIPE_DIMENSION.sourceY,
      this.width,
      this.height,
      pos.x,
      bottomYPos,
      this.width,
      this.height
    );
  }
};

Pipe.prototype.update = function (context, bird, score, gameState,gameFrame) {
  if (gameState.current !== GAME) {
    return;
  }

  if (gameFrame % 100 == 0) {
    this.position.push({
      x: context.canvas.width,
      y: PIPE_MAX_Y_POSITION * (Math.random() + 1),
    });
  }

  for (let i = 0; i < this.position.length; i++) {
    let pos = this.position[i];
    this.handleCollision(bird, pos, gameState);

    //Move Pipes to the left
    pos.x -= this.vx;

    //If the pipes go beyond canvas, removing it from the array
    if (pos.x + this.width <= 0) {
      this.position.shift();
      score.value += 1;
      score.best = Math.max(score.value, score.best);
      localStorage.setItem("best", score.best);
    }
  }
};

Pipe.prototype.reset = function() {
    this.position =[];
}

Pipe.prototype.handleCollision = function (bird, pipePosition, gameState) {
  let bottomPipeYPos = pipePosition.y + this.height + this.gap;

  //Top Pipe Collision
  if (
    bird.x + bird.radius > pipePosition.x &&
    bird.x - bird.radius < pipePosition.x + this.width &&
    bird.y + bird.radius > pipePosition.y &&
    bird.y - bird.radius < pipePosition.y + this.height
  ) {
    gameState.current = OVER;
  }

  //Bottom Pipe Collision
  if (
    bird.x + bird.radius > pipePosition.x &&
    bird.x - bird.radius < pipePosition.x + this.width &&
    bird.y + bird.radius > bottomPipeYPos &&
    bird.y - bird.radius < bottomPipeYPos + this.height
  ) {
    gameState.current = OVER;
  }
};

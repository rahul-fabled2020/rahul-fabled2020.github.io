/**Game Class
 * Takes  id of the canvas as parameter
 * @param {string} canvasId
 */
function Game(canvasId) {
  var self = this;
  var canvas = document.getElementById(canvasId);
  this.context = canvas.getContext("2d");
  this.isKeyDown = false;

  this.frames = 0;
  canvas.addEventListener("click", this.handleClickEvent.bind(self), true);
  document.addEventListener("keydown", this.handleKeyEvent.bind(self), true);
  document.addEventListener("keyup", this.resetKeyDownBoolean.bind(self), true);

  //Instantiating Objects
  this.gameState = new GameState(this.context);
  this.bird = new Bird(50, 150, 34, 26, 12);
  this.pipe = new Pipe(53, 400, 85, 2);
  this.background = new Background(0, 0, 275, 226, 0, canvas.height - 226);
  this.foreground = new ForeGround(276, 0, 224, 112, 0, canvas.height - 112, 2);
  this.score = new Score();
}

/**
 * Handles Key Event
 */
Game.prototype.handleKeyEvent = function (e) {
  if (e.target == this.context.canvas) {
    if (!this.isKeyDown) {
      if (this.gameState.current == GAME) {
        if (this.bird.y - this.bird.radius <= 0) {
          return;
        }
        this.bird.flap();
        this.isKeyDown = true;
      }

      if (this.gameState.current == GET_READY) {
        this.gameState.current = GAME;
        this.isKeyDown = true;
      }
    }
  }
};

Game.prototype.resetKeyDownBoolean = function(e) {
  if(e.target==this.context.canvas) {
    this.isKeyDown = false;
  }
}

/**
 * Handles Click Event
 */
Game.prototype.handleClickEvent = function (e) {
  if (e.target == this.context.canvas) {
    switch (this.gameState.current) {
      case GET_READY:
        this.gameState.current = GAME;
        break;
      case GAME:
        if (this.bird.y - this.bird.radius <= 0) {
          return;
        }
        this.bird.flap();
        break;
      case OVER:
        this.pipe.reset();
        this.bird.resetSpeed();
        this.score.reset();
        this.gameState.current = GET_READY;
        break;
    }
  }
};

/**
 * Renders or draws the overall game play
 */
Game.prototype.render = function () {
  var self = this;

  this.context.fillStyle = "#70c5ce";
  this.context.fillRect(0, 0, canvas.width, canvas.height);

  this.background.render(self.context);
  this.pipe.render(self.context);
  this.foreground.render(self.context);
  this.bird.render(self.context);
  this.gameState.renderGameReady(self.context, self.gameState.current);
  this.gameState.renderGameOver(self.context, self.gameState.current);
  this.score.render(self.context, self.gameState.current);
};

/**
 * Updates the different components of the game
 */
Game.prototype.update = function () {
  var self = this;
  this.bird.update(self.gameState, self.foreground, self.context, self.frames);
  this.foreground.update(self.gameState);
  this.pipe.update(
    self.context,
    self.bird,
    self.score,
    self.gameState,
    self.frames
  );
};

/**
 * Animates the game
 */
Game.prototype.gameLoop = function () {
  this.update();
  this.render();
  this.frames++;

  requestAnimationFrame(this.gameLoop.bind(this));
};

//Game instances
game = new Game("canvas");
game.gameLoop.bind(game)();

game2 = new Game("canvas2");
game2.gameLoop.bind(game2)();

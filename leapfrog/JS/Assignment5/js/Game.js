/**Game Class
 * Takes  id of the canvas as parameter
 * @param {string} canvasId
 */
function Game(canvasId) {
  var self = this;
  var canvas = document.getElementById(canvasId);
  this.context = canvas.getContext("2d");

  this.frames = 0;
  canvas.addEventListener("click", this.handleClickEvent.bind(self));
  window.addEventListener("keydown", this.handleKeyEvent.bind(self));

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
  if (this.gameState.current == GAME) {
    if (this.bird.y - this.bird.radius <= 0) {
      return;
    }
    this.bird.flap();
  }

  if(this.gameState.current == GET_READY) {
      this.gameState.current = GAME;
  }
};

/**
 * Handles Click Event
 */
Game.prototype.handleClickEvent = function (e) {
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
      let rect = canvas.getBoundingClientRect();
      let clickX = e.clientX - rect.left;
      let clickY = e.clientY - rect.top;

      //Check if start button is clicked
      if (
        clickX >= START_BUTTON.x &&
        clickX <= START_BUTTON.x + START_BUTTON.width &&
        clickY >= START_BUTTON.y &&
        clickY <= START_BUTTON.y + START_BUTTON.height
      ) {
        this.pipe.reset();
        this.bird.resetSpeed();
        this.score.reset();
        this.gameState.current = GET_READY;
      }
      break;
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

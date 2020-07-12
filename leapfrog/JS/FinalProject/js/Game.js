class Game {
  constructor(canvasId) {
    this.previousTime = 0;
    this.gameTime = 0;
    this.updateables = [];
    this.currentLevelIndex = 1;

    this.player = new Mario(new Vector(0, 0));
    this.levels = [new Level11(), new Level12()];
    this.controller = new Controller();
    this.camera = new Camera(0, 0, 256, 240);
    this.displayController = new DisplayController(this, canvasId, this.camera);

    Game.imageLoader.load([
      // PLAYER_LEFT,
      PLAYER_RIGHT,
      ITEMS,
      TILES,
      ENEMIES_LEFT,
      ENEMIES_RIGHT
    ]);

    Game.imageLoader.onReady(this.init.bind(this));
  }

  init() {
    console.log("Image Loaded");
    this.level = this.levels[this.currentLevelIndex];
    this.level.loadLevel(this.player, this.camera);
    this.previousTime = Date.now();

    this.gameLoop();
  }

  gameLoop() {
    const ONE_THOUSANDTH_SECOND = 1 / 1000;

    let currentTime = Date.now();
    let dt = (currentTime - this.previousTime) * ONE_THOUSANDTH_SECOND;

    this.update(dt);
    this.displayController.render();

    this.previousTime = currentTime;

    requestAnimationFrame(this.gameLoop.bind(this));
  }

  update(dt) {
    if (this.player.position.x > this.level.levelEndPosition) {
      this.switchLevel();
    }

    this.gameTime += dt;
    this.onKeyboardInput(dt);
    this.updateEntities(dt);
    this.detectCollision();
  }

  onKeyboardInput(dt) {
    if (this.controller.isDown("RUN")) {
      this.player.run();
    } else {
      this.player.noRun();
    }

    if (this.controller.isDown("JUMP")) {
      this.player.jump();
    } else {
      this.player.noJump();
    }

    if (this.controller.isDown("DOWN")) {
      this.player.crouch();
    } else {
      this.player.noCrouch();
    }

    if (this.controller.isDown("LEFT")) {
      this.player.moveLeft();
    } else if (this.controller.isDown("RIGHT")) {
      this.player.moveRight();
    } else {
      this.player.noWalk();
    }
  }

  updateEntities(dt) {
    this.player.update(dt, this.camera, this.gameTime);

    this.updateables.forEach((entity) => {
      entity.update(dt, this.gameTime);
    });

    this.camera.move(this.level, this.player);

    this.level.enemies.forEach(enemy => {
      enemy.update(dt, this.camera);
    });
  }

  detectCollision() {
    this.player.detectCollision(this.level);

    this.level.enemies.forEach(enemy => {
      enemy.detectCollision(this.camera, this.player);
    });
  }

  switchLevel() {
    let index = (this.currentLevelIndex + 1) % this.levels.length;
    this.currentLevelIndex = index;

    this.player.position.x = 0;
    this.camera.reset();

    this.level = this.levels[index];
    this.level.loadLevel(this.player, this.camera);
  }
}

Game.imageLoader = new ImageLoader();

let g = new Game("mario");

document.addEventListener("keydown", function (e) {
  g.controller.assignKey(e, true);
});

document.addEventListener("keyup", function (e) {
  g.controller.assignKey(e, false);
});

window.addEventListener("blur", function () {
  g.controller.pressedKeys = {};
});


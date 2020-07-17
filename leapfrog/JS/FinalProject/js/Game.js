class Game {
  constructor(canvasId) {
    this.previousTime = 0;
    this.gameTime = 0;
    this.updateables = [];
    this.fireBullets = [];
    this.bowserFire = [];
    this.hammerBroHammer = [];
    this.currentLevelIndex = 0;
    this.gameStarted = false;
    this.gamePaused = true;

    this.player = new Mario(new Vector(0, 0), this);
    this.levels = [new Level11(), new Level12()];
    this.controller = new Controller();
    this.camera = new Camera(0, 0, 256, 240);
    this.displayController = new DisplayController(this, canvasId, this.camera);

    Game.imageLoader.load([
      START_SCREEN,
      PLAYER_LEFT,
      PLAYER_RIGHT,
      ITEMS,
      TILES,
      ENEMIES_LEFT,
      ENEMIES_RIGHT,
      HAMMER,
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

    this.onKeyboardInput(dt);
    if (!this.gameStarted || this.gamePaused) return;

    this.gameTime += dt;

    this.updateEntities(dt);
    this.detectCollision();
  }

  onKeyboardInput(dt) {
    if (this.controller.isDown("ENTER")) {
      this.gameStarted = true;
    }

    if (this.player.dyingTime || !this.gameStarted || this.gamePaused) return;

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
    this.player.update(dt, this.camera, this);

    this.updateables.forEach((entity) => {
      entity.update(dt, this.gameTime);
    });

    this.camera.move(this.level, this.player);

    this.level.items.forEach((item) => {
      item.update(dt, this.gameTime, this.player);
    });

    this.level.enemies.forEach((enemy) => {
      if (enemy instanceof Bowser) {
        this.bowserFire = enemy.weapon;
      }

      if (enemy instanceof HammerBro) {
        this.hammerBroHammer = enemy.weapon;
      }

      enemy.update(dt, this.camera, this.player, this.gameTime);
    });

    this.fireBullets.forEach((fireBullet) => {
      fireBullet.update(dt, this.gameTime);
    });

    this.bowserFire.forEach((weapon) => {
      weapon.update(dt, this.camera);
    });

    this.hammerBroHammer.forEach((weapon) => {
      weapon.update(dt, this.camera, this.gameTime);
    });
  }

  detectCollision() {
    if (!this.player.dyingTime) {
      this.player.detectCollision(this.level);
    }

    this.level.items.forEach((item) => {
      item.detectCollision(this.camera, this.player);
    });

    this.bowserFire.forEach((weapon) => {
      weapon.detectCollision(this.player);
    });

    this.hammerBroHammer.forEach((weapon) => {
      weapon.detectCollision(this.player);
    });

    this.level.enemies.forEach((enemy) => {
      enemy.detectCollision(this.camera, this.player);
    });

    this.fireBullets.forEach((fireBullet) => {
      fireBullet.detectCollision(this.level);
    });

    this.level.obstacles.forEach((obstacleGroup) => {
      obstacleGroup.forEach((obstacle) => {
        obstacle.detectCollision(this.camera, this.player);
      });
    });
  }

  switchLevel() {
    this.gameTime = 0;

    let index = (this.currentLevelIndex + 1) % this.levels.length;
    this.currentLevelIndex = index;

    this.level = this.levels[index];
    this.level.loadLevel(this.player, this.camera);
  }

  togglePauseState() {
    this.gamePaused = !this.gamePaused;
  }
}

Game.imageLoader = new ImageLoader();

let g = new Game("mario");

document.addEventListener("keydown", function (e) {
  g.controller.assignKey(e, true);
});

document.addEventListener("keyup", function (e) {
  g.controller.assignKey(e, false);

  if (e.keyCode === 13) g.togglePauseState();
});

window.addEventListener("blur", function () {
  g.controller.pressedKeys = {};
});

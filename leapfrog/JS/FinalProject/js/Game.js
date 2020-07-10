class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.context = this.canvas.getContext("2d");
    this.context.scale(3, 3);
    this.previousTime = 0;
    this.gameTime = 0;
    this.updateables = [];
    this.currentLevelIndex = 1;

    this.player = new Mario(new Vector(0, 0));
    this.levels = [new Level11(), new Level12()];
    this.controller = new Controller();
    this.camera = new Camera(0, 0, 256, 240);

    Game.imageLoader.load([
      "images/mario.png",
      "images/items.png",
      "images/tiles.png",
      "images/enemies.png",
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
    this.render();

    this.previousTime = currentTime;

    requestAnimationFrame(this.gameLoop.bind(this));
  }

  update(dt) {
    this.gameTime += dt;
    this.onKeyboardInput(dt);
    this.updateEntities(dt);
    this.detectCollision();
  }

  render() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = this.level.background;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.renderBackgroundScenes();

    this.renderRotatingObstacleGroup(this.renderEntity);

    this.renderImmovables();
    this.renderEntity(this.player);

    if (this.player.position.x > this.level.levelEndPosition) {
      this.switchLevel();
    }
  }

  renderRotatingObstacleGroup(callback) {
    this.level.obstacles.forEach((obstacleGroup) => {
      let angle = obstacleGroup[0].rotation * DEGREE;
      let halfHeight = obstacleGroup[0].hitbox.height / 2;
      let halfWidth = obstacleGroup[0].hitbox.width / 2;
      let obstaclePivot = obstacleGroup[0].position.add(
        new Vector(halfWidth, halfHeight)
      );

      if (
        !(
          obstaclePivot.x - this.camera.x <= 15*TILE_SIZE
        )
      )
        return;

      this.context.save();
      this.context.translate(obstaclePivot.x - this.camera.x + halfWidth, obstaclePivot.y + halfHeight);
      this.context.rotate(angle);

      obstacleGroup.forEach((obstacle, i) => {
        obstacle.position.x = 2 * halfWidth * i - halfWidth + this.camera.x;
        obstacle.position.y = 2 * halfHeight * i - halfHeight;
        callback.call(this, obstacle);
      });

      this.context.restore();

      obstacleGroup[0].position = obstaclePivot.subtract(
        new Vector(halfWidth, halfHeight)
      );
    });
  }

  renderBackgroundScenes() {
    //i refers to row number i.e. vertical position of the tile
    for (let i = 0; i < 15; i++) {
      for (
        let j = Math.floor(this.camera.x / TILE_SIZE) - 1;
        j < Math.floor(this.camera.x / TILE_SIZE) + 20;
        j++
      ) {
        if (this.level.scenery[i][j]) {
          this.renderEntity(this.level.scenery[i][j]);
        }
      }
    }
  }

  renderImmovables() {
    for (let i = 0; i < 15; i++) {
      for (
        let j = Math.floor(this.camera.x / TILE_SIZE) - 1;
        j < Math.floor(this.camera.x / TILE_SIZE) + 20;
        j++
      ) {
        if (this.level.statics[i][j]) {
          this.renderEntity(this.level.statics[i][j]);
        }

        if (this.level.blocks[i][j]) {
          this.renderEntity(this.level.blocks[i][j]);
          this.updateables.push(this.level.blocks[i][j]);
        }
      }
    }
  }

  renderEntity(entity) {
    entity.render(this.context, this.camera);
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

    this.level.obstacles.forEach((obstacleGroup) => {
      obstacleGroup.forEach((obstacle) => {
        obstacle.update(dt, this.gameTime);
      });
    });

    const OFFSET_FROM_LEFT = 5 * TILE_SIZE;
    if (
      this.level.scrolling &&
      this.player.position.x > this.camera.x + OFFSET_FROM_LEFT
    ) {
      this.camera.x = this.player.position.x - OFFSET_FROM_LEFT;
    }
  }

  detectCollision() {
    this.player.detectCollision(this.level);
  }

  switchLevel() {
    let index = (this.currentLevelIndex + 1) % this.levels.length;
    this.currentLevelIndex = index;

    this.player.position.x = 0;
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

let context = g.context;

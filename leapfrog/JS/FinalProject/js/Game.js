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
    this.render();

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

  render() {
    this.updateables=[];

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = this.level.background;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.renderBackgroundScenes();

    this.level.enemies.forEach(enemy => {
      this.renderEntity(enemy);
    });

    this.renderImmovables();
    this.renderEntity(this.player);
    this.renderFireBridge();
    this.renderRotatingObstacleGroup(this.renderEntity);
  }

  renderFireBridge() {
    this.level.bridges.forEach(bridgeGroup => {
      // if (!(bridgeGroup[0].x - this.camera.x <= MAX_ROW_SIZE * TILE_SIZE)) return;

      bridgeGroup.forEach(bridge => {
        this.renderEntity(bridge);
        this.updateables.push(bridge);

      });
    });
  }

  renderRotatingObstacleGroup(callback) {
    this.level.obstacles.forEach((obstacleGroup) => {
      let angle = obstacleGroup[0].rotation * DEGREE;
      let halfHeight = obstacleGroup[0].hitbox.height / 2;
      let halfWidth = obstacleGroup[0].hitbox.width / 2;
      let obstaclePivot = obstacleGroup[0].position.add(
        new Vector(halfWidth, halfHeight)
      );

      if (!(obstaclePivot.x - this.camera.x <= MAX_ROW_SIZE * TILE_SIZE)) return;

      this.context.save();
      this.context.translate(
        obstaclePivot.x - this.camera.x + halfWidth,
        obstaclePivot.y + halfHeight
      );
      this.context.rotate(angle);

      obstacleGroup.forEach((obstacle, i) => {
        obstacle.position.x = 2 * halfWidth * i - halfWidth + this.camera.x;
        obstacle.position.y = 2 * halfHeight * i - halfHeight;
        callback.call(this, obstacle);
        this.updateables.push(obstacle);
      });

      this.context.restore();

      obstacleGroup[0].position = obstaclePivot.subtract(
        new Vector(halfWidth, halfHeight)
      );
    });
  }

  renderBackgroundScenes() {
    //i refers to row number i.e. vertical position of the tile

    for (let i = 0; i < MAX_ROW_SIZE; i++) {
      for (
        let j = this.camera.CAMERA_POSITION_TILE - 1;
        j < this.camera.CAMERA_POSITION_TILE + 20;
        j++
      ) {
        if (this.level.scenery[i][j]) {
          this.renderEntity(this.level.scenery[i][j]);
        }
      }
    }
  }

  renderImmovables() {

    for (let i = 0; i < MAX_ROW_SIZE; i++) {
      for (
        let j = this.camera.CAMERA_POSITION_TILE - 1;
        j < this.camera.CAMERA_POSITION_TILE + 20;
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

    this.camera.move(this.level, this.player);

    this.level.enemies.forEach(enemy => {
      enemy.update(dt, this.camera, this.level);
    });
  }

  detectCollision() {
    this.player.detectCollision(this.level);

    this.level.enemies.forEach(enemy => {
      enemy.detectCollision(this.level, this.camera, this.player);
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

let context = g.context;

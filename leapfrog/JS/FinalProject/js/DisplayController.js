class DisplayController {
  constructor(game, canvasId, camera) {
    this.canvas = document.getElementById(canvasId);
    this.context = this.canvas.getContext("2d");
    this.context.scale(3, 3);
    this.game = game;
    this.camera = camera;
  }

  render() {
    this.game.updateables = [];

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = this.game.level.background;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.renderBackgroundScenes();

    this.game.level.items.forEach((item) => {
      this.renderEntity(item);
    });

    this.game.level.enemies.forEach((enemy) => {
      this.renderEntity(enemy);
    });

    this.game.fireBullets.forEach(fireBullet => {
      this.renderEntity(fireBullet);
    });

    this.renderImmovables();
    this.renderEntity(this.game.player);
    this.renderFireBridge();
    this.renderRotatingObstacleGroup(this.renderEntity);
  }

  renderFireBridge() {
    this.game.level.bridges.forEach((bridgeGroup) => {
      // if (!(bridgeGroup[0].x - this.camera.x <= MAX_ROW_SIZE * TILE_SIZE)) return;

      bridgeGroup.forEach((bridge) => {
        this.renderEntity(bridge);
        this.game.updateables.push(bridge);
      });
    });
  }

  renderRotatingObstacleGroup(callback) {
    this.game.level.obstacles.forEach((obstacleGroup) => {
      obstacleGroup.forEach((obstacle, i) => {
        this.renderEntity(obstacle);
        this.game.updateables.push(obstacle);
      });
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
        if (this.game.level.scenery[i][j]) {
          this.renderEntity(this.game.level.scenery[i][j]);
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
        if (this.game.level.statics[i][j]) {
          this.renderEntity(this.game.level.statics[i][j]);
        }

        if (this.game.level.blocks[i][j]) {
          this.renderEntity(this.game.level.blocks[i][j]);
          this.game.updateables.push(this.game.level.blocks[i][j]);
        }
      }
    }
  }

  renderEntity(entity) {
    entity.render(this.context, this.camera);
  }
}

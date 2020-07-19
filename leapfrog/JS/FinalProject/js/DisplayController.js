/**
 * Handles rendering job
 */
class DisplayController {
  constructor(game, canvasId, camera) {
    this.canvas = document.getElementById(canvasId);
    this.context = this.canvas.getContext("2d");
    this.context.scale(3, 3);
    this.game = game;
    this.camera = camera;
  }

  /**
   * Renders different elements of the game
   */
  render() {
    this.game.updateables = [];

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = this.game.level.background;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.renderStatistics();
    this.renderBackgroundScenes();

    this.game.level.items.forEach((item) => {
      this.renderEntity(item);
    });

    this.game.bowserFire.forEach((weapon) => {
      this.renderEntity(weapon);
    });

    this.game.hammerBroHammer.forEach((weapon) => {
      this.renderEntity(weapon);
    });

    this.game.level.enemies.forEach((enemy) => {
      this.renderEntity(enemy);
    });

    this.game.fireBullets.forEach((fireBullet) => {
      this.renderEntity(fireBullet);
    });

    this.renderImmovables();
    this.renderEntity(this.game.player);
    this.renderFireBridge();
    this.renderRotatingObstacleGroup(this.renderEntity);

    if (this.game.gamePaused && this.game.gameStarted) {
      if (this.game.gameTime < 0.5) return;

      this.renderPauseScreen();
    }

    if (!this.game.gameStarted) {
      this.renderStartScreen();
    }

    this.renderEndScreen();
  }

  renderFireBridge() {
    this.game.level.bridges.forEach((bridgeGroup) => {
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

  renderStatistics() {
    let y = 15;
    let coin = SPRITES.coinSprite;
    let coinImage = Game.imageLoader.getImage(coin.imageUrl);

    this.context.font = "9px Comic Sans MS";
    this.context.fillStyle = "#fff";

    this.context.fillText("MARIO", 2 * TILE_SIZE, y);
    this.context.fillText("000000", 2 * TILE_SIZE, y + 10);

    this.context.drawImage(
      coinImage,
      coin.position.x,
      coin.position.y,
      coin.size.width,
      coin.size.height,
      4.875 * TILE_SIZE,
      0.9 * TILE_SIZE,
      coin.size.width / 1.5,
      coin.size.height / 1.5
    );
    this.context.fillText(this.formatPlayerCoins(), 5.5 * TILE_SIZE, y + 10);

    this.context.fillText("WORLD", 8 * TILE_SIZE, y);
    this.context.fillText(this.formatLevel(), 8.75 * TILE_SIZE, y + 10);

    this.context.fillText("TIME", 11 * TILE_SIZE, y);
    this.context.fillText(this.formatGameTime(), 11.25 * TILE_SIZE, y + 10);
  }

  renderStartScreen() {
    let banner = Game.imageLoader.getImage(START_SCREEN);
    let centerX = this.canvas.width / 6 - banner.width / 6;
    let centerY = 2 * TILE_SIZE;

    this.context.drawImage(
      banner,
      centerX,
      centerY,
      banner.width / 3,
      banner.height / 3
    );

    this.context.fillText(
      "Press 'Enter Key' to Start the Game",
      centerX,
      8 * TILE_SIZE
    );

    this.context.font = "7px Comic Sans MS";
    this.context.fillText(
      "Instructions",
      centerX + 4 * TILE_SIZE,
      9 * TILE_SIZE
    );

    this.context.font = "6px Comic Sans MS";
    this.context.fillText(
      "Movement: Arrow Keys or A S D",
      centerX + 2 * TILE_SIZE,
      10 * TILE_SIZE
    );
    this.context.fillText(
      "Jump: Space Bar or X",
      centerX + 3 * TILE_SIZE,
      10.75 * TILE_SIZE
    );
    this.context.fillText(
      "Sprint/Bullet: Z",
      centerX + 3.5 * TILE_SIZE,
      11.5 * TILE_SIZE
    );
  }

  renderPauseScreen() {
    this.context.font = "9px Comic Sans MS";
    this.context.fillStyle = "#fff";

    this.context.fillText("PAUSED", 7 * TILE_SIZE, 7 * TILE_SIZE);
  }

  renderEndScreen() {
    if (this.game.currentLevelIndex !== 1) return;

    let princess = Game.imageLoader.getImage(PRINCESS);
    let princessMessage = Game.imageLoader.getImage(PRINCESS_MESSAGE);

    let imageX = 154 * TILE_SIZE;
    let imageY = 13 * TILE_SIZE - princess.height / 3;

    this.context.font = "9px Comic Sans MS";
    this.context.fillStyle = "#fff";

    let message = "Anyway, Thank you Mario for saving me!";
    
    this.context.drawImage(
      princessMessage,
      imageX - this.game.camera.x - 5 *TILE_SIZE,
      4 * TILE_SIZE - this.game.camera.y,
      princessMessage.width/3,
      princessMessage.height/3
    );

    this.context.fillText(
      message,
      imageX - this.game.camera.x - 5 * TILE_SIZE,
      8 * TILE_SIZE - this.game.camera.y
    );

    this.context.drawImage(
      princess,
      imageX - this.game.camera.x,
      imageY - this.game.camera.y,
      princess.width / 3,
      princess.height / 3
    );
  }

  formatPlayerCoins() {
    let coins;

    if (this.game.player.numberOfCoins > 99) {
      this.game.player.numberOfCoins = 0;
    }

    coins = this.game.player.numberOfCoins;

    if (coins < 10) return "x 0" + coins;

    return "x " + coins;
  }

  formatLevel() {
    let level = this.game.currentLevelIndex;
    return "1-" + (level + 1);
  }

  formatGameTime() {
    let seconds = Math.floor(this.game.gameTime);

    return seconds;
  }
}

class FireBullet extends Entity {
  constructor(position, game) {
    super({
      position: position,
      sprite: SPRITES.fireBulletSprites,
      hitbox: {
        x: 0,
        y: 0,
        width: 0.5 * TILE_SIZE,
        height: 0.5 * TILE_SIZE,
      },
    });

    this.index = -1;
    this.numOfHits = 0;
    this.isOnGround = false;
    this.game = game;
  }

  spawn() {
    SOUND.firebullet.currentTime = 0;
    SOUND.firebullet.play();

    if (this.game.fireBullets[0]) {
      this.index = 1;
      this.game.fireBullets[1] = this;
    } else {
      this.index = 0;
      this.game.fireBullets[0] = this;
    }

    if (this.game.player.isFacingLeft) {
      this.velocity = new Vector(-5, 0);
    } else {
      this.velocity = new Vector(5, 0);
    }

    this.isOnGround = false;
  }

  update(dt, gameTime) {
    if (this.numOfHits == 1) {
      this.sprite.position = new Vector(6 * TILE_SIZE, 10 * TILE_SIZE);
      this.sprite.animationFrames = [0, 1, 2];
      this.animationSpeed = 8;
      this.numOfHits += 1;

      return;
    } else if (this.numOfHits == 5) {
      delete this.game.fireBullets[this.index];
      this.game.player.numOfFireBullets -= 1;

      return;
    } else if (this.numOfHits) {
      this.numOfHits += 1;

      return;
    }

    if (this.isOnGround) {
      this.isOnGround = false;
      this.velocity.y = -4;
    }

    this.acceleration.y = 0.5;

    this.velocity.y += this.acceleration.y;
    this.position = this.position.add(this.velocity);

    if (
      this.position.x < this.game.camera.x ||
      this.position.x > this.game.camera.x + 16 * TILE_SIZE
    ) {
      this.numOfHits = 1;
    }

    this.sprite.update(dt, gameTime);
  }

  detectCollision(level) {
    if (this.numOfHits) return;

    let h = 1;
    let w = 1;

    if (this.position.y % TILE_SIZE >= 8) h++;

    if (this.position.x % TILE_SIZE >= 8) w++;

    let baseX = Math.floor(this.position.x / TILE_SIZE);
    let baseY = Math.floor(this.position.y / TILE_SIZE);

    if(baseY + h > MAX_ROW_SIZE) {
        delete this.game.fireBullets[this.index];
        this.game.player.fireBullets -= 1;

        return;
    }

    for (let i = 0; i < h; i++) {
      if (baseY + i < 0 || baseY + i >= MAX_ROW_SIZE) {
        continue;
      }

      for (let j = 0; j < w; j++) {
        if (baseY < 0) {
          i++;
        }

        if (level.statics[baseY + i][baseX + j]) {
          level.statics[baseY + i][baseX + j].isCollidingWith(this, level);
        }

        if (level.blocks[baseY + i][baseX + j]) {
          level.blocks[baseY + i][baseX + j].isCollidingWith(this, level);
        }
      }
    }

    //With bridge
    level.bridges.forEach((bridgeGroup) => {
      bridgeGroup.forEach((bridge) => {
        bridge.isCollidingWith(this, level);
      });
    });

    //With enemies
    level.enemies.forEach((enemy) => {
      if (
        enemy.isFlipping ||
        enemy.position.x - this.game.camera.x > 21 * TILE_SIZE
      )
        return;

      this.isCollidingWith(enemy);
    });
  }

  isCollidingWith(entity) {
    let entityHLeft = entity.position.x + entity.hitbox.x;
    let entityHTop = entity.position.y + entity.hitbox.y;
    let entityHCenter = new Vector(
      entityHLeft + entity.hitbox.width / 2,
      entityHTop + entity.hitbox.height / 2
    );

    let thisHLeft = this.position.x + this.hitbox.x;
    let thisHTop = this.position.y + this.hitbox.y;
    let thisHCenter = new Vector(
      thisHLeft + this.hitbox.width / 2,
      thisHTop + this.hitbox.height / 2
    );

    let averageWidth = (entity.hitbox.width + this.hitbox.width) / 2;
    let averageHeight = (entity.hitbox.height + this.hitbox.height) / 2;

    let displacement = entityHCenter.subtract(thisHCenter);

    //If either displacement.x or displacement.y is greater than the average dimension then there is no collision
    if (
      Math.abs(displacement.x) > averageWidth ||
      Math.abs(displacement.y) > averageHeight
    )
      return;
    
    this.numOfHits = 1;
    entity.bump();
  }
}

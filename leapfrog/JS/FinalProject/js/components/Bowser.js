class Bowser extends Enemy {
  constructor(position, level) {
    super({
      position: position,
      sprite: SPRITES.bowserSprite,
      hitbox: {
        x: 0,
        y: 0,
        width: 2 * TILE_SIZE,
        height: 2 * TILE_SIZE,
      },
      level: level,
    });

    this.shm = new SHM(this.position, this.velocity, 32);
    this.velocity.x = 1;
    this.canJump = true;
    this.jumpTime = BOWSER_JUMP_TIME;
    this.jumpCountDownTime = BOWSER_JUMP_INTERVAL;
    this.weapon = [];
  }

  update(dt, camera, player, gameTime) {
    if (player.powerTime) return;

    if (this.position.x - camera.x > 21 * TILE_SIZE) return;

    if (this.position.x - camera.x < -2 * TILE_SIZE) {
      delete this.level.enemies[this.index];
    }

    if (this.velocity.x > 0) {
      this.sprite.imageUrl = ENEMIES_RIGHT;
    } else {
      this.sprite.imageUrl = ENEMIES_LEFT;
    }

    if (this.isDyingCount) {
      this.isDyingCount--;

      if (!this.isDyingCount) {
        delete this.level.enemies[this.index];
      }
    }

    if (this.jumpCountDownTime <= 0) {
      this.jump();
      this.jump();
      this.jumpCountDownTime = BOWSER_JUMP_INTERVAL;
    }
    this.jumpCountDownTime -= dt;
    this.noJump();
    this.acceleration.y = 0.2;
    this.velocity.y += this.acceleration.y;
    // this.position = this.position.add(this.velocity);
    this.position.y += this.velocity.y;
    this.shm.update(dt, this.position);
    this.sprite.update(dt, gameTime);
  }

  jump() {
    if (this.velocity.y > 0) {
      return;
    }

    if (this.jumpTime) {
      this.jumpTime--;
    } else if (this.isOnGround && this.canJump) {
      this.jumpTime = BOWSER_JUMP_TIME;
      this.canJump = false;
      this.isOnGround = false;
      this.velocity.y = -6;
    }
  }

  noJump() {
    this.canJump = true;

    if (this.jumpTime) {
      if (this.jumpTime <= 16) {
        this.velocity.y = 0;
        this.jumpTime = 0;
      } else {
        this.jumpTime -= 1;
      }
    }
  }
}

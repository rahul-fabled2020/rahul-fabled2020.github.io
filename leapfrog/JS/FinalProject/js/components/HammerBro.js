class HammerBro extends Enemy {
  constructor(position, level) {
    super({
      position: position,
      sprite: SPRITES.hammerBroSprite,
      hitbox: {
        x: 0,
        y: 0.5 * TILE_SIZE,
        width: TILE_SIZE,
        height: 1.5 * TILE_SIZE,
      },
      level: level,
    });

    this.shm = new SHM(this.position, this.velocity, TILE_SIZE);
    this.velocity.x = 1;
    this.acceleration.y = 0.2;
    this.canJump = true;
    this.jumpTime = HAMMER_BRO_JUMP_TIME;
    this.jumpCountDownTime = HAMMER_BRO_JUMP_INTERVAL;
    this.fireTime = FIRE_TIME;
    this.secondFireTime = SECOND_FIRE_TIME;
    this.weapon = [];
    this.isFacingLeft = true;
  }

  update(dt, camera, player, gameTime) {
    if (player.powerTime) return;

    if (this.position.x - camera.x > 21 * TILE_SIZE) return;

    if (this.position.x - camera.x < -2 * TILE_SIZE) {
      delete this.level.enemies[this.index];
    }

    if (player.position.x < this.position.x) {
      this.velocity.x = -Math.abs(this.velocity.x);
      this.isFacingLeft = true;
    } else {
      this.velocity.x = Math.abs(this.velocity.x);
      this.isFacingLeft = false;
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

    this.fireTime -= dt;
    this.jumpCountDownTime -= dt;
    this.secondFireTime -= dt;

    if (this.fireTime <= 0) {
      this.fire();
      this.fireTime = FIRE_TIME;
    }

    if (this.secondFireTime <= 0) {
        this.fire();
      // this.sprite.position.x = 47 * TILE_SIZE;
      this.secondFireTime = SECOND_FIRE_TIME;
    }

    if (this.jumpCountDownTime <= 0) {
      this.jump();
    }

    this.noJump();
    this.velocity.y += this.acceleration.y;
    // this.position = this.position.add(this.velocity);
    this.position.y += this.velocity.y;
    this.shm.update(dt, this.position);
    this.sprite.update(dt, gameTime);
  }

  fire() {
    //   this.sprite.position.x = 43 * TILE_SIZE;
    this.sprite.animationSpeed = 5;
    let weapon = new Hammer(
      this.position.subtract(new Vector(0, 0)),
      this
    );

    weapon.spawn(this.isFacingLeft);
  }

  jump() {
    if (this.velocity.y > 0) {
      return;
    }

    this.sprite.animationSpeed = 0;
    this.jumpCountDownTime = HAMMER_BRO_JUMP_INTERVAL;

    if (this.jumpTime) {
      this.jumpTime--;
    } else if (this.isOnGround && this.canJump) {
      this.jumpTime = HAMMER_BRO_JUMP_TIME;
      this.canJump = false;
      this.isOnGround = false;
      this.velocity.y = -6;
    }
  }

  noJump() {
    this.canJump = true;
    this.sprite.animationSpeed = 5;

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

class Bowser extends Enemy {
  constructor(position, level) {
    super({
      position: position,
      sprite: SPRITES.bowserSprite,
      hitbox: {
        x: 0.5 * TILE_SIZE,
        y: 0,
        width: 1.5 * TILE_SIZE,
        height: 2 * TILE_SIZE,
      },
      level: level,
    });

    this.shm = new SHM(this.position, this.velocity, 32);
    this.velocity.x = 1;
    this.acceleration.y = 0.2;
    this.canJump = true;
    this.jumpTime = BOWSER_JUMP_TIME;
    this.jumpCountDownTime = BOWSER_JUMP_INTERVAL;
    this.fireTime = FIRE_TIME;
    this.mouthOpenTime = MOUTH_OPEN_TIME;
    this.weapon = [];
    this.weaponIndex = 0;
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

    this.fireTime -= dt;
    this.jumpCountDownTime -= dt;
    this.mouthOpenTime -= dt;

    if (this.fireTime <= 0) {
      this.fire();
      this.fireTime = FIRE_TIME;
    }

    if(this.mouthOpenTime <=0 ){
      this.sprite.position.x = 47 * TILE_SIZE;
      this.mouthOpenTime = MOUTH_OPEN_TIME;
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
    SOUND.bowserfire.play();

    this.sprite.position.x = 43 * TILE_SIZE;
    this.sprite.animationSpeed = 5;
    let weapon = new Fire(
      this.position.subtract(new Vector(TILE_SIZE, -0.25 * TILE_SIZE)),
      this
    );
    this.weaponIndex = weapon.index;
    weapon.spawn();
  }

  jump() {
    if (this.velocity.y > 0) {
      return;
    }

    this.sprite.animationSpeed = 0;
    this.jumpCountDownTime = BOWSER_JUMP_INTERVAL;

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

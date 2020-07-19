/**
 * Hammer Bro is a powerful enemy.
 * The speciality of hammer bro is hammer projectile.
 * It is very difficult to defeat hammer bro.
 * Hammer bro can be killed by jumping on its head.
 * @param {Vector} position
 * @param {Level} level
 */
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

    this.shm = new SHM(this.position, this.velocity, TILE_SIZE); //for to and fro motion of HammerBro
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

  /**
   *
   * @param {number} dt
   * @param {Camera} camera
   * @param {Mario} player
   * @param {number} gameTime
   */
  update(dt, camera, player, gameTime) {
    if (player.powerTime) return; //Enemy should be paused while Mario is powering up or powering down

    if (this.position.x - camera.x > 21 * TILE_SIZE) return; //If the enemy is too far from Mario then it should be paused

    if (this.position.x - camera.x < -2 * TILE_SIZE) {
      delete this.level.enemies[this.index]; //Delete the enemy when Mario leaves the enemy behind
    }

    //Face towards Mario
    if (player.position.x < this.position.x) {
      this.velocity.x = -Math.abs(this.velocity.x);
      this.isFacingLeft = true;
    } else {
      this.velocity.x = Math.abs(this.velocity.x);
      this.isFacingLeft = false;
    }

    //Change sprite sheet
    if (this.velocity.x > 0) {
      this.sprite.imageUrl = ENEMIES_RIGHT;
    } else {
      this.sprite.imageUrl = ENEMIES_LEFT;
    }

    //Manage death counter
    if (this.isDyingCount) {
      this.isDyingCount--;

      if (!this.isDyingCount) {
        delete this.level.enemies[this.index];
      }
    }

    // Deacrese Timers
    this.fireTime -= dt;
    this.jumpCountDownTime -= dt;
    this.secondFireTime -= dt;

    //Manage projectile timer
    if (this.fireTime <= 0) {
      this.fire();
      this.fireTime = FIRE_TIME;
    }

    //Maange second projectile timer
    if (this.secondFireTime <= 0) {
      this.fire();
      this.secondFireTime = SECOND_FIRE_TIME;
    }

    //Manage Jump Timer
    if (this.jumpCountDownTime <= 0) {
      this.jump();
    }

    this.noJump();

    //Update position and velocity
    this.velocity.y += this.acceleration.y;
    this.position.y += this.velocity.y;
    this.shm.update(dt, this.position);

    //Update Sprite
    this.sprite.update(dt, gameTime);
  }

  //Fire hammer
  fire() {
    this.sprite.animationSpeed = 5;
    let weapon = new Hammer(this.position.subtract(new Vector(0, 0)), this);

    weapon.spawn(this.isFacingLeft);
  }

  //Make hammer bro jump
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

  //Reset jump
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

  //Initiate Hammer Bro's death when mario jumps on his head
  stomp(player) {
    if (this.isDyingCount) return;

    SOUND.stomp.play();
    player.bounce = true;

    this.sprite.animationSpeed = 0;
    this.velocity.x = 0;
    this.isDyingCount = 10;
  }
}

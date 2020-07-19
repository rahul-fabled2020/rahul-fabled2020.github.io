/**
 * Mario  is the main player
 */
class Mario extends Entity {
  constructor(position, game) {
    super({
      position: position,
      sprite: new Sprite(
        PLAYER_RIGHT,
        new Vector(5 * TILE_SIZE, 2 * TILE_SIZE),
        { width: TILE_SIZE, height: TILE_SIZE },
        0
      ),
      hitbox: {
        x: 0, //offSetX
        y: 0, //offSetY
        width: TILE_SIZE,
        height: TILE_SIZE,
      },
    });

    this.game = game;

    this.state = SMALL_MARIO;
    this.numberOfCoins = 0;
    this.numOfFireBullets = 0;
    this.powerTime = 0; //Timer for power up/down
    this.bounce = false; //Mario bounces when mario jumps on enemies like Goomba, Koopa and Hammer Bro
    this.jumpTime = 0; //Timer for jump

    this.canJump = true;
    this.isCrounching = false;
    this.isRunHeld = false; //Is the key for running DOWN?
    this.noInput = false; //Used to disable the keyboard control for the player at the end of level

    this.collectedItem = null; //Could be mushroom or fire flower

    this.targetPosition = new Vector(0, 0); //The target position is used when the player is about to exit from the level or the player dies
  }

  /**
   * Makes mario run
   */
  run() {
    this.maxSpeed = 2.5; //Horizonatal Velocity

    if (this.state == FIRE_MARIO && !this.isRunHeld) { //Shoot only when mario is in fire state and the run key is released
      this.shoot(); //The same key used for running is used for firing bullets
    }

    this.isRunHeld = true;
  }

  /**
   * Shoots fire bullet
   */
  shoot() {
    if (this.numOfFireBullets >= 2) return; //Two bullets at a time

    this.numOfFireBullets += 1;

    let fireBullet = new FireBullet(
      new Vector(this.position.x + 0.5 * TILE_SIZE, this.position.y),
      this.game
    );

    fireBullet.spawn(this.isFacingLeft);

    this.shootingCount = 2; //Shoot timer; used for updating the sprite
  }

  /**
   * Resets run
   */
  noRun() {
    this.maxSpeed = 1.5; //Horizontal Velocity
    this.moveAcceleration = 0.07; //Horizontal Acceleration
    this.isRunHeld = false;
  }

  /**
   * Makes mario move right
   */
  moveRight() {
    if (this.velocity.y === 0 && this.isOnGround) {
      //Mario should not move left or right when mario is crounching
      if (this.isCrounching) {
        this.noWalk();

        return;
      }

      this.acceleration.x = this.moveAcceleration; //Positive acceleration show that player moves right

      this.isFacingLeft = false;

    } else {
      //If mario is falling or jumping then mario should face in the original direction
      this.acceleration.x = this.moveAcceleration;
    }
  }

  /**
   * Makes Mario move left
   */
  moveLeft() {
    if (this.velocity.y === 0 && this.isOnGround) {
      if (this.isCrounching) {
        this.noWalk();

        return;
      }

      this.acceleration.x = -this.moveAcceleration; //Negative acceleration for moving left
      this.isFacingLeft = true;

    } else {

      this.acceleration.x = -this.moveAcceleration;
    }
  }

  /**
   * Resets walk
   */
  noWalk() {
    this.maxSpeed = 0;

    if (this.velocity.x === 0) {

      return;
    }

    //If the velocity is about to be zero then make it zero along with acceleration
    if (Math.abs(this.velocity.x) <= 0.1) {
      this.velocity.x = 0;
      this.acceleration.x = 0;
    }
  }

  /**
   * If the mario is not in small state then it makes mario sit down
   */
  crouch() {
    if (this.state === SMALL_MARIO) {
      this.isCrounching = false;
      return;
    }

    //Mario cannot sit down when mario is in the air
    if (this.isOnGround) {
      this.isCrounching = true;
    }
  }

  /**
   * Resets crouch
   */
  noCrouch() {
    this.isCrounching = false;
  }

  /**
   * Makes mario jump
   */
  jump() {
    if (this.velocity.y > 0) { //Mario is already in air; falling down

      return;
    }

    if (this.jumpTime) {
      this.jumpTime -= 1;

    } else if (this.isOnGround && this.canJump) {
      //Initiate Jump
      this.jumpTime = 20;
      this.canJump = false;
      this.isOnGround = false;
      this.velocity.y = -6;

      SOUND.jump.currentTime = 0;
      SOUND.jump.play();
    }
  }

  /**
   * Resets jump
   */
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

  /**
   * Updates Mario
   * @param {number} dt 
   * @param {Camera} camera 
   * @param {Game} game 
   */
  update(dt, camera, game) {
    //Manage Power timer
    if (this.powerTime) {
      this.powerTime -= dt;

      if (this.powerTime < 0.01) {
        this.powerTime = 0;
      }
    }

    //Manage waiting timer
    if (this.waitingTime) {
      this.waitingTime -= dt;

      if (this.waitingTime <= 0) {
        this.waitingTime = 0;

      } else {

        return;
      }
    }

    //If Mario is bouncing
    if (this.bounce) {
      this.bounce = false;
      this.isOnGround = false;
      this.velocity.y = -3;
    }

    //The player should not be allowed to  move left of the camera's left edge
    if (this.position.x <= camera.x) {
      this.position.x = camera.x;
      this.velocity.x = Math.max(this.velocity.x, 0);
    }

    //Decrease the magnitude of the velocity by 0.05 if the magnitude of the velocity is more than max speed allowed
    if (Math.abs(this.velocity.x) > this.maxSpeed) {
      this.velocity.x -= (0.05 * this.velocity.x) / Math.abs(this.velocity.x);
      this.acceleration.x = 0;
    }

    //Manage Death timer
    if (this.dyingTime) {

      if (this.y < this.targetPosition.y) {
        this.velocity.y = 1;
      }

      this.dyingTime -= 1 * dt;

      if (this.dyingTime <= 0) {

        this.dyingTime = 0;

        //Reset Game Level
        game.player = new Mario(game.level.playerPosition, this.game);
        this.state = SMALL_MARIO;
        game.gameTime = 0;

        game.level.loadLevel(game.player, game.camera);
        game.controller.reset();

        MUSIC.level.pause();
        MUSIC.castle.pause();

        if (game.currentLevelIndex == 0) {
          MUSIC.level.currentTime = 0;
          MUSIC.level.play();
        } else {
          MUSIC.castle.currentTime = 0;
          MUSIC.castle.play();
        }
      }

    } else {
      //If the player is alive

      this.acceleration.y = 0.25;

      if (this.position.y > 14 * TILE_SIZE) { //Player falls in the pit
        this.getKilled();
      }
    }

    //Player is at the end of the level
    if (this.flagging) {
      this.acceleration = new Vector(0, 0);
    }

    //The player is about to switch level
    if (this.exiting) {
      this.isFacingLeft = false;
      this.velocity = new Vector(1.5, 0.25);

      if (this.position.x >= this.targetPosition.x) {
        this.velocity = new Vector(0, 0);
        this.exiting = false;
        this.flagging = false;
        
        //Switch to next level after 5 seconds
        setTimeout(() => {
          this.exiting = false;
          this.noInput = false;
          this.game.switchLevel();
        }, 5000);
      }
    }

    //Update poistion and velocity
    this.velocity.x += this.acceleration.x;
    this.velocity.y += this.acceleration.y;
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    this.animate();
    this.sprite.update(dt, game.gameTime);
  }

  /**
   * Prepares the player for level exit
   */
  exit() {
    this.position.x += TILE_SIZE;
    this.targetPosition.x = this.game.level.levelEndPosition;
    this.isFacingLeft = true;
    this.waitingTime = 1;
    this.exiting = true;
  }

  /**
   * Disables input when the player touches the flag and stops player horizontal movement
   */
  flag() {
    this.noInput = true;
    this.flagging = true;
    this.velocity = new Vector(0, 2);
    this.acceleration = new Vector(0, 0);
  }

  /**
   * Kills mario
   */
  getKilled() {
    MUSIC.level.pause();
    MUSIC.castle.pause();

    MUSIC.level.currentTime = 0;
    MUSIC.death.play();

    this.noWalk();
    this.noRun();
    this.noJump();

    this.acceleration.x = 0;
    this.sprite.position = new Vector(11 * TILE_SIZE, 2 * TILE_SIZE);
    this.sprite.animationSpeed = 0;

    this.powerTime = 0;
    this.waitingTime = 0.5;
    this.dyingTime = 2;

    if (this.position.y < 15 * TILE_SIZE) {
      this.targetPosition = new Vector(
        this.position.x,
        this.position.y - 8 * TILE_SIZE
      );

      this.velocity = new Vector(0, -5);

    } else {

      this.velocity = new Vector(0, 0);
      this.targetPosition = new Vector(
        this.position.x,
        this.position.y - TILE_SIZE
      );

    }
  }

  /**
   * Checks collision
   * @param {Level} level 
   */
  detectCollision(level) {
    if (this.dyingTime) return;

    let h = 1;
    let w = 1;

    if (this.position.y % TILE_SIZE !== 0) h++;

    if (this.position.x % TILE_SIZE !== 0) w++;

    if (this.state !== SMALL_MARIO) h++;

    let baseX = Math.floor(this.position.x / TILE_SIZE);
    let baseY = Math.floor(this.position.y / TILE_SIZE);

    for (let i = 0; i < h; i++) {
      if (baseY + i < 0 || baseY + i >= 15) {
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
  }

  /**
   * Animates Mario
   */
  animate() {
    if (this.dyingTime) return; //no animation while dying

    if (this.isCrounching) {
      //Player is sitting
      if (this.state === BIG_MARIO) {
        this.sprite.position = new Vector(11 * TILE_SIZE, 0.5 * TILE_SIZE);

      } else {

        this.sprite.position = new Vector(11 * TILE_SIZE, 6.5 * TILE_SIZE);
      }

      this.sprite.animationSpeed = 0;
      this.hitbox.height = 1.5 * TILE_SIZE;
      this.sprite.size.height = 1.5 * TILE_SIZE;

      return;

    } else {
      //Player is standing
      if (this.state !== SMALL_MARIO) {
        this.hitbox.height = 2 * TILE_SIZE;
        this.sprite.size.height = 2 * TILE_SIZE;
      }

      if (this.state == BIG_MARIO) {
        this.sprite.position.y = 0;
      }

      if (this.state == FIRE_MARIO) {
        this.sprite.position.y = 6 * TILE_SIZE;
      }
    }

    if (this.jumpTime) {
      //Player is jumping
      this.sprite.position.x = 10 * TILE_SIZE;
      this.sprite.animationSpeed = 0;

    } else if (this.isOnGround) {

      if (Math.abs(this.velocity.x) > 0) {
        //Player is in horizontal motion
        if (this.velocity.x * this.acceleration.x >= 0) {
          //The velocity and the acceleration are in same direction
          this.sprite.position.x = 6 * TILE_SIZE;
          this.sprite.animationFrames = [0, 1, 2];

          if (this.velocity.x < 0.2) {
            this.sprite.animationSpeed = 5; //Minimum animation Speed
          } else {
            this.sprite.animationSpeed = Math.abs(this.velocity.x) * 8; //Adjust animation speed according to the player speed
          }
          
        } else if (
          (this.velocity.x > 0 && this.isFacingLeft) ||
          (this.velocity.x < 0 && !this.isFacingLeft)
        ) {
          //The velocity and the acceleration are not in the same direction, i.e. the player is changing its direction
          this.sprite.position.x = 9 * TILE_SIZE;
          this.sprite.animationSpeed = 0;
        }

      } else {
        //If the horizonal velocity is zero; player is not in motion
        this.sprite.animationSpeed = 0;
        this.sprite.position.x = 5 * TILE_SIZE;
      }

      //If the player is shooting
      if (this.shootingCount) {
        this.sprite.position.x += 10 * TILE_SIZE;
        this.shootingCount -= 1;
      }

    }

    if (this.isFacingLeft) {
      this.sprite.imageUrl = PLAYER_LEFT;
    } else {
      this.sprite.imageUrl = PLAYER_RIGHT;
    }
  }

  /**
   * Upgrades mario state
   * @param {number} index 
   * @param {Level} level 
   */
  powerUp(index, level) {
    SOUND.powerup.play();

    this.collectedItem = index;
    delete level.items[index];
    this.powerTime = 1;

    if (this.state === SMALL_MARIO) {
      this.state = BIG_MARIO;
      this.hitbox = {
        x: 0,
        y: 0,
        width: TILE_SIZE,
        height: 2 * TILE_SIZE,
      };

      this.sprite.position.x = 5 * TILE_SIZE;
      this.sprite.position.y = 0; 
      this.sprite.size.height = 2 * TILE_SIZE;

    } else if (this.state === BIG_MARIO) {
      this.state = FIRE_MARIO;

      this.sprite.position.x = 5 * TILE_SIZE;
      this.sprite.position.y = 6 * TILE_SIZE; 
    }
  }

  /**
   * Downgrades mario state
   */
  getDamaged() {
    this.powerTime = 1;

    if (this.state === SMALL_MARIO) {
      this.getKilled();
    } else {
      SOUND.powerdown.play();

      this.sprite.position = new Vector(10 * TILE_SIZE, 0);

      this.state = SMALL_MARIO;
      this.hitbox = {
        x: 0,
        y: 0,
        width: TILE_SIZE,
        height: TILE_SIZE,
      };
      
      this.sprite.size.height = TILE_SIZE;
      this.sprite.position.y = 2 * TILE_SIZE;
    }
  }
}

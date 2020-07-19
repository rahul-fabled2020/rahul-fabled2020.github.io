/**
 * Bowser class is a subclass of Enemy class
 * Bowser is the main enemy of the game. He is the turtle king. He kidnaps the princess and keeps in his castle. The castle is full of fire.
 * position is the position of the object to be rendered in the canvas.
 * position is a 2D Vector representing (x, y) where x is the distance from the left edge of the canvas and y is the distance from the top edge of the canvas
 * level is the level in which the enemy is to be rendered
 */
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

    this.shm = new SHM(this.position, this.velocity, 32); //for the to and fro horizontal motion of the Bowser
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

  /**
   * 
   * @param {number} dt 
   * @param {Camera} camera 
   * @param {Mario} player 
   * @param {number} gameTime 
   */
  update(dt, camera, player, gameTime) {
    if (player.powerTime) return; //If the player is changing its state then pause the enemy

    if (this.position.x - camera.x > 21 * TILE_SIZE) return; //Stop rendering if the enemy is not in the camera viewport

    //Delete the enemy when we have left the enemy behind
    if (this.position.x - camera.x < -2 * TILE_SIZE) {
      delete this.level.enemies[this.index];
    }

    //For turning the enemy left/right
    if (this.velocity.x > 0) {
      this.sprite.imageUrl = ENEMIES_RIGHT;
    } else {
      this.sprite.imageUrl = ENEMIES_LEFT;
    }

    //Manage die timer
    if (this.isDyingCount) {
      this.isDyingCount--;

      if (!this.isDyingCount) {
        delete this.level.enemies[this.index];
      }
    }

    this.fireTime -= dt;
    this.jumpCountDownTime -= dt;
    this.mouthOpenTime -= dt;

    //Manage fire timer
    if (this.fireTime <= 0) {
      this.fire();
      this.fireTime = FIRE_TIME;
    }

    //Manage mouth open timer
    if(this.mouthOpenTime <=0 ){
      this.sprite.position.x = 47 * TILE_SIZE;
      this.mouthOpenTime = MOUTH_OPEN_TIME;
    }

    //Jump on time up for jump timer
    if (this.jumpCountDownTime <= 0) {
      this.jump();
    }

    this.noJump();

    //Update enemey position
    this.velocity.y += this.acceleration.y;
    this.position.y += this.velocity.y;
    this.shm.update(dt, this.position);
    this.sprite.update(dt, gameTime);
  }

  /**
   * It projects the enemy's weapon
   */
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

  /**
   * Enemy jumps
   * Stops walk animation while jumping
   */
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

  /**
   * Resets jump
   * Enables walk animaiton while not jumping
   */
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

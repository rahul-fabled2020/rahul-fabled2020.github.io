/**
 * The generic enemy class
 * @param {Object} configuration; Contains enemy position, sprite, hitbox and level instances
 */
class Enemy extends Entity {
  constructor(configuration) {
    super({
      position: configuration.position,
      sprite: configuration.sprite,
      hitbox: configuration.hitbox,
    });

    this.velocity = new Vector(-0.5, 0); //Initially the enemy moves towards left direction

    this.isDyingCount = 0; //To maintain death timer
    this.isFlipping = false; //To maintain bullet collision status

    this.level = configuration.level;
    this.index = this.level.enemies.length;
    
  }

  /**
   * Update the Enemy
   * @param {number} dt 
   * @param {Camera} camera 
   * @param {Mario} player 
   * @param {number} gameTime 
   */
  update(dt, camera, player, gameTime) {
    if (player.powerTime || player.dyingTime) return; //Pause enemy when mario is power up/down or dying.

    if (this.position.x - camera.x > 21 * TILE_SIZE) return; //Pause enemy when the player is too far from it

    if (this.position.x - camera.x < -2 * TILE_SIZE) {
      delete this.level.enemies[this.index]; //Delete enemies when the player leaves it behind
    }

    //Change the tilesheet to match enemy orientation
    if (!(this instanceof Goomba) && this.velocity.x > 0) {
      this.sprite.imageUrl = ENEMIES_RIGHT;
    } else {
      this.sprite.imageUrl = ENEMIES_LEFT;
    }

    //Manage death timer
    if (this.isDyingCount) {
      this.isDyingCount--;

      if (!this.isDyingCount) {
        delete this.level.enemies[this.index];
      }
    }

    //Update position and velocity
    this.acceleration.y = 0.2;
    this.velocity.y += this.acceleration.y;
    this.position = this.position.add(this.velocity);

    //Update the sprite
    this.sprite.update(dt, gameTime);
  }

  /**
   * Check collision with entities
   * @param {Camera} camera 
   * @param {Mario} player 
   */
  detectCollision(camera, player) {
    if (this.isFlipping) return;

    //Number of overlapping tiles = h*w
    let h = 1;
    let w = 1;

    if (this.position.y % TILE_SIZE !== 0) {
      h++;
    }

    if (this.position.x % TILE_SIZE !== 0) {
      w++;
    }

    if (this instanceof Koopa || this instanceof Bowser || HammerBro) h++; //Koopa, Bowser and HammerBro occupy more than one TILE_SIZE height

    if (this instanceof Bowser) w++; //Bowser occupies more than one TILE_SIZE width

    let baseX = Math.floor(this.position.x / TILE_SIZE); //Tile position.x of the top left vertex of the enemy container box
    let baseY = Math.floor(this.position.y / TILE_SIZE); //Tile position.y of the top left vertex of the enemy container box

    //Delete the enemy if it is below the viewport height
    if (baseY + h > MAX_ROW_SIZE) {
      delete this.level.enemies[this.index];
      return;
    }

    //With floor, pipes and blocks
    for (let i = 0; i < h; i++) {
      if (baseY + i < 0 || baseY + i >= MAX_ROW_SIZE) {
        continue; //no need to detect collision for tiles above or below the viewport height
      }

      for (let j = 0; j < w; j++) {
        if (baseY < 0) { //no need to check for collision if the enemy is above the viewport height
          i++;
        }

        if (this.level.statics[baseY + i][baseX + j]) {
          this.level.statics[baseY + i][baseX + j].isCollidingWith(
            this,
            this.level
          );
        }

        if (this.level.blocks[baseY + i][baseX + j]) {
          this.level.blocks[baseY + i][baseX + j].isCollidingWith(
            this,
            this.level
          );
        }
      }
    }

    //With bridge
    this.level.bridges.forEach((bridgeGroup) => {
      bridgeGroup.forEach((bridge) => {
        bridge.isCollidingWith(this, this.level);
      });
    });

    //With other enemies
    this.level.enemies.forEach((enemy) => {
      if (enemy === this) return; //No need to check collision with self

      if (enemy.position.x - camera.x > 21 * TILE_SIZE) return; //No need to check collision if the player is too far from the enemy

      this.isCollidingWith(enemy);
    });

    //With player
    if(player.dyingTime || player.powerTime || this.isDyingCount) return; //No need to check collision when the player is dying or powering or the enemy is dying

    this.isCollidingWith(player);
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

    let displacement = entityHCenter.subtract(thisHCenter); //Center to center displacement vector

    //If either displacement.x or displacement.y is greater than the average dimension then there is no collision
    if (
      Math.abs(displacement.x) > averageWidth ||
      Math.abs(displacement.y) > averageHeight
    )
      return;

    if (
      Math.abs(displacement.x / this.hitbox.width) >
      Math.abs(displacement.y / this.hitbox.height)
    ) {
      if (entity instanceof Enemy) {
        if (displacement.x < 0) {
          //Entity is colliding from the left
          entity.velocity.x = - Math.abs(entity.velocity.x)

          entity.position.x = this.position.x - entity.hitbox.width;
        } else {
          //Entity is colliding from the right
          entity.velocity.x = Math.abs(entity.velocity.x)

          entity.position.x = this.position.x + this.hitbox.width;
        }
      }
    }

    if (entity instanceof Mario) {
      if (entity.velocity.y > 0 && !(this instanceof Bowser)) {
        this.stomp(entity);
      } else {
        entity.getDamaged();
      }
    }
  }

  /**
   * Reverse enemy velocity
   */
  reverseHorizontalVelocity() {
    this.velocity.x *= -1;
  }

  /**
   * Initiate enemy's death when mario jumps on it.
   * To be implemented by individual enemies
   * @param {Mario} player 
   */
  stomp(player) {

  }
}

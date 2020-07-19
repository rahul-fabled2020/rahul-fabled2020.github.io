/**
 * Rotating Firebar is the obstacle in the castle put by Bowser on the way so that Mario cannot reach upto him and save the princess
 * @param {Vector} position
 * @param {number} angle; Initial angle of rotation
 * @param {Vector} center; Center of rotation or the pivot point
 * @param {number} distanceFromCenter; How far to put each component of the firebar from the center of rotation
 */
class RotatingFire extends Entity {
  constructor(position, angle, center, distanceFromCenter) {
    super({
      position: position,
      sprite: new Sprite(
        ITEMS,
        new Vector(6 * TILE_SIZE, 9 * TILE_SIZE),
        { width: 8, height: 8 },
        5,
        [0, 1, 2, 3]
      ),
      hitbox: {
        x: 0,
        y: 0,
        width: 8,
        height: 8,
      },
    });

    this.centerOfRotation = center;
    this.rotationAngle = angle;
    this.distanceFromCenter = distanceFromCenter;
  }

  /**
   * Update the rotating firebar
   * @param {number} dt 
   * @param {number} gameTime 
   */
  update(dt, gameTime) {
    let rotationSpeed = 100;

    this.rotationAngle = this.rotationAngle + rotationSpeed*dt;

    if (this.rotationAngle >= 360) {
      this.rotationAngle = 0;
    }

    //Using sine and cosine functions for the circular motion or the periodic motion
    this.position.x =
      this.centerOfRotation.x +
      Math.cos(this.rotationAngle * DEGREE) * this.distanceFromCenter;

    this.position.y =
      this.centerOfRotation.y +
      Math.sin(this.rotationAngle * DEGREE) * this.distanceFromCenter;

    this.sprite.update(dt, gameTime);
  }

  /**
   * Check collision with the player
   * @param {Camera} camera 
   * @param {Mario} player 
   */
  detectCollision(camera, player) {
    if (player.dyingTime || player.powerTime) return; //No need to check for collision when the player is dying or powering up/down

    this.isCollidingWith(player);
  }

  /**
   * 
   * @param {Entity} entity; instance of Mario
   */
  isCollidingWith(entity) {
    let entityHLeft = entity.position.x + entity.hitbox.x; //Left edge of the hitbox
    let entityHTop = entity.position.y + entity.hitbox.y; //Top edge of the hitbox

    //Center of the hitbox
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

    //Average dimensions of the hitboxes
    let averageWidth = (entity.hitbox.width + this.hitbox.width) / 2;
    let averageHeight = (entity.hitbox.height + this.hitbox.height) / 2;

    //Center to center distance vector
    let displacement = entityHCenter.subtract(thisHCenter);

    //If either displacement.x or displacement.y is greater than the average dimension then there is no collision
    if (
      Math.abs(displacement.x) > averageWidth ||
      Math.abs(displacement.y) > averageHeight
    )
      return;

    if (entity instanceof Mario) {
      entity.getDamaged();
    }
  }
}

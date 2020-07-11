/**
 * Floor Class
 * Parent Class: Entity
 * @param {Vector} position
 * @param {Object} sprite
 */
class Floor extends Entity {
  constructor(position, sprite, hitbox) {
    super({
      position: position,
      sprite: sprite,
      hitbox: hitbox || {
        x: 0, //offSetX
        y: 0, //offSetY
        width: TILE_SIZE,
        height: TILE_SIZE,
      },
    });
  }

  isCollidingWith(entity, level) {
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

    let entityRight = entityHLeft + entity.hitbox.width;
    let entityBottom = entityHTop + entity.hitbox.height;

    let thisRight = thisHLeft + this.hitbox.width;
    let thisBottom = thisHTop + this.hitbox.height;

    let averageWidth = (entity.hitbox.width + this.hitbox.width) / 2;
    let averageHeight = (entity.hitbox.height + this.hitbox.height) / 2;

    let displacement = entityHCenter.subtract(thisHCenter);

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
      if(this instanceof FireBridge) return;

      if(entity instanceof Goomba) {

        entity.reverseHorizontalVelocity();
        return;
      }

      if (displacement.x < 0) {
        //Entity is colliding from the left
        entity.velocity.x = Math.min(0, entity.velocity.x);
        entity.acceleration.x = Math.min(0, entity.acceleration.x);

        entity.position.x = this.position.x - entity.hitbox.width;
      } else {
        //Entity is colliding from the right
        entity.acceleration.x = Math.max(0, entity.acceleration.x);

        entity.position.x = this.position.x + this.hitbox.width;
      }
    } else {
      if (entity instanceof Mario) {
        entity.jumping = 0;
      }

      if (displacement.y < 0) {
        //Entity is colliding from the top
        entity.velocity.y = 0;
        entity.position.y = this.position.y - entity.hitbox.height;
        entity.isStanding = true;

      } else {
        //Entity is colliding from the bottom
        entity.velocity.y = 0;
        entity.position.y = this.position.y + this.hitbox.height;
        
      }
    }
  }
}

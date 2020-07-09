/**
 * Floor Class
 * Parent Class: Entity
 * @param {Vector} position
 * @param {Object} sprite
 */
class Floor extends Entity {
  constructor(position, sprite) {
    super({
      position: position,
      sprite: sprite,
      hitbox: {
        x: 0, //offSetX
        y: 0, //offSetY
        width: 16,
        height: 16,
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

    if (
      entityRight > thisHLeft &&
      entityHLeft < thisRight &&
      entityBottom > thisHTop &&
      entityHTop < thisBottom
    ) {
      //The hitboxes are overlapping
      console.log("Collision Detected");
      let displacement = entityHCenter.subtract(thisHCenter);
      if (displacement.y * displacement.y > displacement.x * displacement.x) {
        //Collision is from top or bottom
        if (displacement.y > 0) {
          //Collision is from bottom
          entity.velocity.y = 0;
          entity.position.y = this.position.y + this.hitbox.height;

          console.log("Bottom Collision");
        } else {
          //Collision is from top
          entity.velocity.y = 0;
          entity.position.y = this.position.y - entity.hitbox.height;
          entity.isStanding = true;
          console.log("Top Collision");
        }
      } else {
        //Collision is from left or right
        if (displacement.x > 0) {
          //Collision is from right
          entity.velocity.x = Math.max(0, entity.velocity.x);
          entity.acceleration.x = Math.max(0, entity.acceleration.x);

          entity.position.x = this.position.x + this.hitbox.width;
          console.log("Right collision");
        } else {
          //Collision is from left          
          entity.velocity.x = Math.min(0, entity.velocity.x);
          entity.acceleration.x = Math.min(0, entity.acceleration.x);

          entity.position.x = this.position.x - entity.hitbox.width;
          console.log("Left Collision");
        }
      }
    }
  }
}

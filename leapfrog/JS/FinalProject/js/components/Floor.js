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
    let hitboxPositionFloor = new Vector(
      Math.floor(this.position.x + this.hitbox.x),
      Math.floor(this.position.y + this.hitbox.y)
    );

    let hitBoxPositionEntity = new Vector(
      Math.floor(entity.position.x + entity.hitbox.x),
      Math.floor(entity.position.y + entity.hitbox.y)
    );

    //Detecting overlap of two hitboxes
    //Horizontal Overlap
    if (
      !(
        hitboxPositionFloor.x > hitBoxPositionEntity.x + entity.hitbox.width ||
        hitboxPositionFloor.x + this.hitbox.width < hitBoxPositionEntity.x
      )
    ) {
      //Vertical Overlap
      if (
        !(
          hitboxPositionFloor.y > hitBoxPositionEntity.y ||
          hitboxPositionFloor.y + this.hitbox.height < hitBoxPositionEntity.y
        )
      ) {
        if (!this.isStanding) {
          entity.bump();
        } else {
          let center = hitBoxPositionEntity.x + entity.hitbox.width / 2;

          // console.log(hitboxPositionFloor.y - entity.hitbox.height - entity.hitbox.y);
          // console.log(entity.position.y)
          entity.velocity.y = 0;
          entity.position.y =
            hitboxPositionFloor.y - entity.hitbox.height - entity.hitbox.y;
          entity.isStanding = true;

          if (
            Math.abs(
              hitBoxPositionEntity.y +
                entity.hitbox.height -
                hitboxPositionFloor.y
            ) <= entity.velocity.y
          ) {
            console.log("Collide vayo", this.position.x, this.position.y);
            if (level.statics[this.position.y / 16 - 1][this.position.x / 16]) {
              return;
            }

            entity.velocity.y = 0;
            entity.position.y =
              hitboxPositionFloor - entity.hitbox.height - entity.hitbox.y;
            entity.isStanding = true;

          } else if (
            Math.abs(
              hitBoxPositionEntity.y -
                hitboxPositionFloor.y -
                this.hitbox.height
            ) > entity.velocity.y &&
            center + 2 >= hitboxPositionFloor.x &&
            center - 2 <= hitboxPositionFloor.x + this.hitbox.width
          ) {
            entity.velocity.y = 0;
            entity.position.y = hitboxPositionFloor.y + this.hitbox.height;
          }
        }
      }
    }
  }
}

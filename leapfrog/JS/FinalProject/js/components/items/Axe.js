/**
 * Axe class
 * It is the axe in the castle which on touching collapses the bridge of the bowser castle
 */
class Axe extends Entity {
  constructor(position, level) {
    super({
      position: position,
      sprite: SPRITES.axeSprite,
      hitbox: {
        x: 0,
        y: 0,
        width: TILE_SIZE,
        height: TILE_SIZE,
      },
    });

    this.level = level;
    this.sprite = SPRITES.axeSprite;
    this.isTouched = false;
  }

  /**
   * Updates the axe sprite
   * @param {number} dt
   * @param {number} gameTime
   */
  update(dt, gameTime) {
    this.sprite.update(dt, gameTime);
  }

  /**
   * Checks collision with the player
   * @param {Camera} camera
   * @param {Mario} player
   */
  detectCollision(camera, player) {
    this.isCollidingWith(player);
  }

  /**
   * Handles the collision
   * @param {Entity} entity
   */
  isCollidingWith(entity) {
    if (!(entity instanceof Mario) || this.isTouched) return;

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

    let displacement = entityHCenter.subtract(thisHCenter);

    //If either displacement.x or displacement.y is greater than the average dimension then there is no collision
    if (
      Math.abs(displacement.x) > averageWidth ||
      Math.abs(displacement.y) > averageHeight
    )
      return;

    SOUND.bowserfall.play();

    this.isTouched = true;
    entity.flagging = true;
    entity.flag();
    entity.exit();

    this.level.bridges.forEach((bridgeGroup) => {
      bridgeGroup.forEach((bridge) => {
        bridge.isCollapsing = true;
      });
    });
  }
}

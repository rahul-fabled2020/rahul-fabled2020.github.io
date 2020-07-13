class Coin extends Entity {
  constructor(position, sprite, level) {
    super({
      position: position,
      sprite: sprite,
      hitbox: {
        x: 0,
        y: 0,
        width: TILE_SIZE,
        height: TILE_SIZE,
      },
    });

    this.level = level;
    this.index = this.level.items.length;
  }

  detectCollision(camera, player) {
    this.isCollidingWith(player)
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

    let displacement = entityHCenter.subtract(thisHCenter);

    //If either displacement.x or displacement.y is greater than the average dimension then there is no collision
    if (
      Math.abs(displacement.x) > averageWidth ||
      Math.abs(displacement.y) > averageHeight
    )
      return;

    if (entity instanceof Mario) {
      entity.numberOfCoins += 1;
      delete this.level.items[this.index];
    }
  }

  update(dt, gameTime) {
    this.sprite.update(dt, gameTime);
  }

  render(context, camera) {
    this.sprite.render(context, this.position, camera);
  }
}

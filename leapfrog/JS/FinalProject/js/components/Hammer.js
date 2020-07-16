class Hammer extends Entity {
  constructor(position, owner) {
    super({
      position: position,
      sprite: SPRITES.hammerSprite,
      hitbox: {
        x: 0,
        y: 0,
        width: TILE_SIZE,
        height: TILE_SIZE,
      },
    });

    this.index = -1;
    this.owner = owner;
  }

  spawn(isFacingLeft) {
    let horizontalVelocity = Math.floor(Math.random()*3)+1;
    if (isFacingLeft) horizontalVelocity = - (Math.floor(Math.random()*3)+1);

    this.velocity = new Vector(horizontalVelocity, -5);
    this.acceleration = new Vector(0, 0.2);
    this.index = this.owner.weapon.length;
    this.owner.weapon.push(this);
  }

  update(dt, camera, gameTime) {
    this.velocity = this.velocity.add(this.acceleration);
    this.position = this.position.add(this.velocity);

    if (
      this.position.x < camera.x ||
      this.position.x > camera.x + 16 * TILE_SIZE
    ) {
      delete this.owner.weapon[this.index];
    }

    this.sprite.update(dt, gameTime);
  }

  detectCollision(player) {
    if(player.dyingTime || player.powerTime) return;
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

    let displacement = entityHCenter.subtract(thisHCenter);

    //If either displacement.x or displacement.y is greater than the average dimension then there is no collision
    if (
      Math.abs(displacement.x) > averageWidth ||
      Math.abs(displacement.y) > averageHeight
    )
      return;
    entity.getDamaged();
  }
}

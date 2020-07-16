class Fire extends Entity {
  constructor(position, owner) {
    super({
      position: position,
      sprite: SPRITES.fireSprite,
      hitbox: {
        x: 0,
        y: 0,
        width: 1.5*TILE_SIZE,
        height: 0.5 * TILE_SIZE,
      },
    });

    this.index = -1;
    this.owner = owner;
  }

  spawn() {
    this.velocity = new Vector(-0.5, 0);
    this.acceleration = new Vector(-0.09, 0);
    this.index = this.owner.weapon.length;
    this.owner.weapon.push(this);
  }

  update(dt, camera) {

    this.velocity= this.velocity.add(this.acceleration);
    this.position = this.position.add(this.velocity);

    if (
      this.position.x < camera.x ||
      this.position.x > camera.x + 16 * TILE_SIZE
    ) {
      delete this.owner.weapon[this.index];
    }
  }

  detectCollision(player) {
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

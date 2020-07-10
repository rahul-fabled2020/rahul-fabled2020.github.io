class RotatingFire extends Entity {
  constructor(position) {
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

    this.rotation = 0;
  }

  update(dt, gameTime) {
    let rotationSpeed = 200;
    this.rotation = this.rotation + rotationSpeed * dt;

    if (this.rotation >= 360) {
      this.rotation = 0;
    }

    this.sprite.update(dt, gameTime);
  }
}

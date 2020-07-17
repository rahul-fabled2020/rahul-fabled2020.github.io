class Goomba extends Enemy {
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
      level: level,
    });
  }

  stomp(player) {
    if (this.isDyingCount) return;

    player.bounce = true;

    this.sprite = new Sprite(
      ENEMIES_LEFT,
      new Vector(2 * TILE_SIZE, TILE_SIZE),
      { width: TILE_SIZE, height: TILE_SIZE },
      0
    );

    this.sprite.animationSpeed = 0;
    this.velocity.x = 0;
    this.isDyingCount = 10;
  }

  bump() {
    this.sprite = new Sprite(
      ENEMIES_RIGHT,
      new Vector(0, TILE_SIZE),
      { width: TILE_SIZE, height: TILE_SIZE },
      0
    );

    this.isFlipping = true;
    this.position.y -= 1;
    this.velocity = new Vector(0, -2.5);
  }
}

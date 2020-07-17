class Koopa extends Enemy {
  constructor(position, sprite, level) {
    super({
      position: position,
      sprite: sprite,
      hitbox: {
        x: 0,
        y: 8,
        width: TILE_SIZE,
        height: TILE_SIZE,
      },
      level: level,
    });
  }

  stomp(player) {
    if(this.isDyingCount) return;

    player.bounce = true;

    this.sprite = new Sprite(
      ENEMIES_LEFT,
      new Vector(10*TILE_SIZE, 0),
      { width: TILE_SIZE, height: TILE_SIZE },
      0,
    )

    this.hitbox = {
      x: 2,
      y: 0,
      width: 12,
      height: TILE_SIZE
    }

    this.sprite.animationSpeed = 0;
    this.velocity.x = 0;
    this.isDyingCount = 10;
  }

  bump() {
    if(this.isFlipping) return;

    this.isFlipping = true;
    this.sprite = new Sprite(
      ENEMIES_LEFT,
      new Vector(10*TILE_SIZE, 0),
      { width: TILE_SIZE, height: TILE_SIZE },
      0,
    )

    this.hitbox = {
      x: 2,
      y: 0,
      width: 12,
      height: TILE_SIZE
    }

    this.sprite.animationSpeed = 0;
    this.velocity = new Vector(0, -2.5);   
  }
}

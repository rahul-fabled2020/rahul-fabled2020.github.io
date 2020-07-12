class Koopa extends Enemy {
  constructor(position, sprite, level) {
    super({
      position: position,
      sprite: sprite,
      hitbox: {
        x: 0,
        y: 8,
        width: TILE_SIZE,
        height: 1.5 * TILE_SIZE,
      },
      level: level,
    });
  }
}

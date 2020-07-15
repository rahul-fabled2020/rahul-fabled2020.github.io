class Bowser extends Enemy {
  constructor(position, level) {
    super({
      position: position,
      sprite: SPRITES.bowserSprite,
      hitbox: {
        x: 0,
        y: 0,
        width: 2 * TILE_SIZE,
        height: 2 * TILE_SIZE,
      },
      level: level,
    });
  }
}

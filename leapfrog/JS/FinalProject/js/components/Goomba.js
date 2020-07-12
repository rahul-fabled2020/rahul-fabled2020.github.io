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
      level: level
    });
    
  }
}

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

    this.shm = new SHM(this.position, this.velocity, 32);
    this.velocity.x = 1;
  }

  update(dt, camera, player, gameTime) {
    if(player.powerTime) return;
    
    if (this.position.x - camera.x > 21 * TILE_SIZE) return;

    if (this.position.x - camera.x < -2 * TILE_SIZE) {
      delete this.level.enemies[this.index];
    }

    if(!(this instanceof Goomba) && this.velocity.x >0) {
        this.sprite.imageUrl = ENEMIES_RIGHT;
    } else {
        this.sprite.imageUrl = ENEMIES_LEFT;
    }

    if (this.isDyingCount) {
      this.isDyingCount--;

      if (!this.isDyingCount) {
        delete this.level.enemies[this.index];
      }
    }

    this.acceleration.y = 0.2;
    this.velocity.y += this.acceleration.y;
    // this.position = this.position.add(this.velocity);

    this.shm.update(dt, this.position);
    this.sprite.update(dt, gameTime);
  }
}

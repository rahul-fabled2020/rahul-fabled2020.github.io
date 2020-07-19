/**
 * BlockCoin is the coin inside the question mark block
 */
class BlockCoin extends Entity {
  constructor(position, level) {
    super({
      position: position,
      sprite: SPRITES.blockCoinSprite,
      hitbox: {
        x: 0,
        y: 0,
        width: TILE_SIZE,
        height: TILE_SIZE,
      },
    });

    this.level = level;
    this.index = -1;
  }

  /**
   * Pops the coin out of the question mark block
   */
  spawn() {
    SOUND.coin.currentTime = 0;
    SOUND.coin.play();

    this.index = this.level.items.length;
    this.level.items.push(this);

    this.isActive = true; //Indicates whether to update it or not.

    this.velocity.y = -12;
    this.targetPosition = this.position.y - 2 * TILE_SIZE; //Position of the coin after spawning
  }

  /**
   *
   * @param {number} dt
   * @param {number} gameTime
   * @param {Mario} player
   */
  update(dt, gameTime, player) {
    if (!this.isActive) return;

    if (this.velocity.y > 0 && this.position.y >= this.targetPosition) {
      player.numberOfCoins++;
      delete this.level.items[this.index];
    }

    this.acceleration.y = 0.75;
    this.velocity.y += this.acceleration.y;
    this.position.y += this.velocity.y;

    this.sprite.update(dt, gameTime);
  }

  detectCollision() {}
}

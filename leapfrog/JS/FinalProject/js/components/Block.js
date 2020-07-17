class Block extends Floor {
  constructor(configuration) {
    super(configuration.position, configuration.sprite, {
      x: 0,
      y: 0,
      width: TILE_SIZE,
      height: TILE_SIZE,
    });

    this.item = configuration.item;
    this.usedSprite = configuration.usedSprite;
    this.bounceSprite = configuration.bounceSprite;
    this.isBreakable = configuration.breakable;
  }

  break(level) {
    let x = Math.floor(this.position.x / TILE_SIZE);
    let y = Math.floor(this.position.y / TILE_SIZE);

    delete level.blocks[y][x];
  }

  bonk(marioState, level) {
    if(this.sprite === this.usedSprite) return;

    if(marioState > 0 && this.isBreakable) {
      this.break(level);
    } else if(this.isOnGround) {
      this.isOnGround = false;

      if(this.item) {
        this.item.spawn(marioState);
        this.item = null;
      }

      if(this.bounceSprite) {
        this.sprite = this.bounceSprite;
      } else {
        this.sprite = this.usedSprite;
      }
    }
  }

  update(dt, gameTime) {
    this.sprite.update(dt, gameTime);
  }
}

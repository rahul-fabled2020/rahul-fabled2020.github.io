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

  break() {
    console.log("Break");
  }

  bonk(marioState) {
    if(this.sprite === this.usedSprite) return;

    if(marioState > 0 && this.isBreakable) {
      this.break();
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

      this.velocity.y = -2;
    }
  }

  update(dt, gameTime) {
    this.sprite.update(dt, gameTime);
  }
}

class FireBridge extends Floor {
  constructor(configuration) {
    super(configuration.position, configuration.sprite, {
      x: 0,
      y: 0,
      width: TILE_SIZE,
      height: TILE_SIZE,
    });

    this.index = FireBridge.index++;
    this.isCollapsing = false;
    this.gravity = 1;
  }

  break() {
    console.log("Break");
  }

  update(dt, gameTime) {
    if (this.isCollapsing) {
      this.position.y += (this.velocity.y + this.index*(TILE_SIZE / 4))*dt;
      this.velocity.y += this.gravity;
    }
  }
}

FireBridge.index = 0;

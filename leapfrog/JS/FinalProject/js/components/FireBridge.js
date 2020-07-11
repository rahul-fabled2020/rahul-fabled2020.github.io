class FireBridge extends Floor {
    constructor(configuration) {
      super(configuration.position, configuration.sprite, {
        x: 0,
        y: 0,
        width: TILE_SIZE,
        height: TILE_SIZE,
      });

      this.isCollapsing = false;
      this.gravity = 0.2;
    }
  
    break() {
      console.log("Break");
    }
    
    update(dt, gameTime) {
        if(this.isCollapsing){
          this.position.y += this.velocity.y;
          this.velocity.y += this.gravity;
        }
    }
  }
  
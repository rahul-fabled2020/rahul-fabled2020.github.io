class FireBridge extends Floor {
    constructor(configuration) {
      super(configuration.position, configuration.sprite, {
        x: 0,
        y: 0,
        width: TILE_SIZE,
        height: TILE_SIZE,
      });

      this.breakable = configuration.breakable;
    }
  
    break() {
      console.log("Break");
    }
    
    update(dt, gameTime) {
        
    }
  }
  
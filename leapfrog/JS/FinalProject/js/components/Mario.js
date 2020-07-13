class Mario extends Entity {
  constructor(position) {
    super({
      position: position,
      sprite: new Sprite(
        PLAYER_RIGHT,
        new Vector(6 * TILE_SIZE, 2 * TILE_SIZE),
        { width: TILE_SIZE, height: TILE_SIZE },
        0
      ),
      hitbox: {
        x: 0, //offSetX
        y: 0, //offSetY
        width: TILE_SIZE,
        height: TILE_SIZE,
      },
    });

    this.state = 0;
    this.numberOfCoins = 0;
    this.powering = [];
    this.bounce = false;
    this.jumping = 0;
    this.canJump = true;
    this.isCrounching = false;
    this.isRunHeld = false;
    this.noInput = false;
    this.targetPosition = [];
  }

  run() {
    
    this.maxSpeed = 2.5;

    if (this.state == 2 && !this.isRunHeld) {
      this.shoot();
    }

    this.isRunHeld = true;
  }

  shoot() {
    
  }

  noRun() {
    this.maxSpeed = 1.5;
    this.moveAcceleration = 0.07;
    this.isRunHeld = false;
  }

  moveRight() {
    if (this.velocity.y === 0 && this.isOnGround) {
      if (this.isCrounching) {
        this.noWalk();
        return;
      }

      this.acceleration.x = this.moveAcceleration;
      this.isFacingLeft = false;
    } else {
      this.acceleration.x = this.moveAcceleration;
    }
  }

  moveLeft() {
    if (this.velocity.y === 0 && this.isOnGround) {
      if (this.isCrounching) {
        this.noWalk();
        return;
      }

      this.acceleration.x = -this.moveAcceleration;
      this.isFacingLeft = true;
    } else {
      this.acceleration.x = -this.moveAcceleration;
    }
  }

  noWalk() {
    this.maxSpeed = 0;

    if (this.velocity.x === 0) {
      return;
    }

    if (Math.abs(this.velocity.x) <= 0.1) {
      this.velocity.x = 0;
      this.acceleration.x = 0;
    }
  }

  crouch() {
    if (this.state === 0) {
      this.isCrounching = false;
      return;
    }

    if (this.isOnGround) {
      this.isCrounching = true;
    }
  }

  noCrouch() {
    this.isCrounching = false;
  }

  jump() {
    if (this.velocity.y > 0) {
      return;
    }

    if (this.jumping) {
      this.jumping -= 1;
    } else if (this.isOnGround && this.canJump) {
      this.jumping = 20;
      this.canJump = false;
      this.isOnGround = false;
      this.velocity.y = -6;

      

      if (this.state === 0) {
        
      } else {
        
      }
    }
  }

  noJump() {
    this.canJump = true;

    if (this.jumping) {
      if (this.jumping <= 16) {
        this.velocity.y = 0;
        this.jumping = 0;
      } else {
        this.jumping -= 1;
      }
    }
  }

  update(dt, camera, gameTime) {
    if (this.powering.length !== 0) {
      let next = this.powering.shift();

      if (next == 5) {
        return;
      }
      //Baaki xa garna ajha
    }

    if (this.bounce) {
      this.bounce = false;
      this.isOnGround = false;
      this.velocity.y = -3;
    }

    if (this.position.x <= camera.x) {
      this.position.x = camera.x;
      this.velocity.x = Math.max(this.velocity.x, 0);
    }

    if (Math.abs(this.velocity.x) > this.maxSpeed) {
      this.velocity.x -= (0.05 * this.velocity.x) / Math.abs(this.velocity.x);
      this.acceleration.x = 0;
    }

    //Delete this
    this.acceleration.y = 0.25;
    if (this.position.y > 14 * TILE_SIZE) {
      this.killMario();
    }
    //Delete Above

    this.velocity.x += this.acceleration.x;
    this.velocity.y += this.acceleration.y;
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    this.animate();
    this.sprite.update(dt, gameTime);
  }

  killMario() {
    this.velocity.y = 0;
    this.position.y = 4 * TILE_SIZE;
    this.isOnGround = true;
  }

  detectCollision(level) {
    let h = 2;
    let w = 1;

    if (this.position.y % TILE_SIZE !== 0) {
      h++;
    }

    if (this.position.x % TILE_SIZE !== 0) {
      w++;
    }

    let baseX = Math.floor(this.position.x / TILE_SIZE);
    let baseY = Math.floor(this.position.y / TILE_SIZE);

    for (let i = 0; i < h; i++) {
      if (baseY + i < 0 || baseY + i >= 15) {
        continue;
      }

      for (let j = 0; j < w; j++) {
        if (baseY < 0) {
          i++;
        }

        if (level.statics[baseY + i][baseX + j]) {
          level.statics[baseY + i][baseX + j].isCollidingWith(this, level);
        }

        if (level.blocks[baseY + i][baseX + j]) {
          level.blocks[baseY + i][baseX + j].isCollidingWith(this, level);
        }        
      }
    }

    //With bridge
    level.bridges.forEach((bridgeGroup)=>{
      bridgeGroup.forEach((bridge => {
        bridge.isCollidingWith(this, level);
      }))
    });

    level.items.forEach(item => {
      item.isCollidingWith(this, level);
    })
  }

  animate() {
    if (this.isCrounching) {
      this.sprite.position.x = 7 * TILE_SIZE;
    }

    if (this.jumping) {
      this.sprite.position.x = 9 * TILE_SIZE;
      this.sprite.animationSpeed = 0;
    } else if (this.isOnGround) {
      if (Math.abs(this.velocity.x) > 0) {
        if (this.velocity.x * this.acceleration.x >= 0) {
          this.sprite.position.x = 5 * TILE_SIZE;
          this.sprite.animationFrames = [0, 1, 2];

          if (this.velocity.x < 0.2) {
            this.sprite.animationSpeed = 5;
          } else {
            this.sprite.animationSpeed = Math.abs(this.velocity.x) * 8;
          }

        } else if (
          (this.velocity.x > 0 && this.isFacingLeft) ||
          (this.velocity.x < 0 && !this.isFacingLeft)
        ) {
          this.sprite.position.x = 11 * TILE_SIZE;
          this.sprite.animationSpeed = 0;
        }
      } else {
        this.sprite.animationSpeed = 0;
        this.sprite.position.x = 6*TILE_SIZE;
      }
    }


  }
}

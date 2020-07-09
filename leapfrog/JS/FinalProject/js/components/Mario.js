class Mario extends Entity {
  constructor(position) {
    super({
      position: position,
      sprite: new Sprite("images/mario.png", new Vector(80, 32), {width: 16, height:16}, 0),
      hitbox: {
        x: 0, //offSetX
        y: 0, //offSetY
        width: 16,
        height: 16,
      },
    });

    this.state = 0;
    this.coins = 0;
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
    console.log("Running");
    this.maxSpeed = 2.5;

    if (this.state == 2 && !this.isRunHeld) {
      this.shoot();
    }

    this.isRunHeld = true;
  }

  shoot() {
    console.log("Shooting");
  }

  noRun() {
    this.maxSpeed = 1.5;
    this.moveAcceleration = 0.07;
    this.isRunHeld = false;
  }

  moveRight() {
    if (this.velocity.y === 0 && this.isStanding) {
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
    if (this.velocity.y === 0 && this.isStanding) {
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

    if (this.isStanding) {
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
    } else if (this.isStanding && this.canJump) {
      this.jumping = 20;
      this.canJump = false;
      this.isStanding = false;
      this.velocity.y = -6;

      console.log("Jumping");

      if (this.state === 0) {
        console.log("Fuchhe mario");
      } else {
        console.log("Thulo Mario");
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

  update(dt, camera) {
    if (this.powering.length !== 0) {
      let next = this.powering.shift();

      if (next == 5) {
        return;
      }
      //Baaki xa garna ajha
    }

    if (this.bounce) {
      this.bounce = false;
      this.isStanding = false;
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
    if(this.position.y > 192) {
      this.acceleration.y = 0;
      this.velocity.y = 0;
      this.position.y = 192;
      this.isStanding = true;
    }
    //Delete Above

    this.velocity.x += this.acceleration.x;
    this.velocity.y += this.acceleration.y;
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  detectCollision(level) {
    let h=1;
    let w=1;

    if(this.position.y % 16 !== 0) {
      h++;
    }

    if(this.position.x %16 !== 0) {
      w++;
    }

    let baseX = Math.floor(this.position.x /16);
    let baseY = Math.floor(this.position.y / 16);

    for(let i=0; i<h; i++){
      if(baseY +i < 0 || baseY +i >=15) {
        continue;
      }

      for(let j=0; j<w ;j++) {
        if(baseY < 0) {
          i++;
        }

        if(level.statics[baseY + i][baseX + j]) {
          level.statics[baseY + i][baseX +j].isCollidingWith(this, level);
        }
      }
    }
  }
}
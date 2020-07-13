class Mushroom extends Entity {
  constructor(position, level) {
    super({
      position: position,
      sprite: SPRITES.mushroomSprite,
      hitbox: {
        x: 0,
        y: 0,
        width: TILE_SIZE,
        height: TILE_SIZE,
      },
    });

    this.level = level;
    this.targetPosition = new Vector(0, 0);
    this.spawningCount = 0;
    this.waitingCount = 0;
    this.index = -1;
  }

  render(context, camera) {
    if (this.spawningCount > 1) return;
    this.sprite.render(context, this.position, camera);
  }

  spawn(marioState) {
    if (marioState > 0) {
      let flower = new Flower(this.position, this.level);
      flower.spawn();
      return;
    }

    this.index = this.level.items.length;
    this.level.items.push(this);

    this.spawningCount = 12;
    this.targetPosition = new Vector(
      this.position.x,
      this.position.y - TILE_SIZE
    );
  }

  update(dt, gameTime) {
    if (this.spawningCount > 1) {
      this.spawningCount -= 1;

      if (this.spawningCount == 1) {
        this.velocity.y = -0.5;
      }

      return;
    }

    if (this.spawningCount) {
      if (this.position.y <= this.targetPosition.y) {
        this.position.y = this.targetPosition.y;
        this.velocity = new Vector(1, 0);
        this.waitingCount = 5;
        this.spawningCount = 0;
      }
    } else {
      this.acceleration.y = 0.2;
    }

    if (this.waitingCount) {
      this.waitingCount -= 1;

      return;
    }

    this.velocity.y += this.acceleration.y;
    this.position = this.position.add(this.velocity);

    this.sprite.update(dt, gameTime);
  }

  detectCollision(camera, player) {
    if (this.spawningCount) return;

    //Number of overlapping tiles = h*w
    let h = 1;
    let w = 1;

    if (this.position.y % TILE_SIZE !== 0) {
      h++;
    }

    if (this.position.x % TILE_SIZE !== 0) {
      w++;
    }

    let baseX = Math.floor(this.position.x / TILE_SIZE);
    let baseY = Math.floor(this.position.y / TILE_SIZE);

    if (baseY + h > MAX_ROW_SIZE) {
      delete this.level.items[this.index];

      return;
    }

    //With floor and blocks
    for (let i = 0; i < h; i++) {
      if (baseY + i < 0 || baseY + i >= MAX_ROW_SIZE) {
        continue;
      }

      for (let j = 0; j < w; j++) {
        if (baseY < 0) {
          i++;
        }

        if (this.level.statics[baseY + i][baseX + j]) {
          this.level.statics[baseY + i][baseX + j].isCollidingWith(
            this,
            this.level
          );
        }

        if (this.level.blocks[baseY + i][baseX + j]) {
          this.level.blocks[baseY + i][baseX + j].isCollidingWith(
            this,
            this.level
          );
        }
      }
    }

    //With bridge
    this.level.bridges.forEach((bridgeGroup) => {
      bridgeGroup.forEach((bridge) => {
        bridge.isCollidingWith(this, this.level);
      });
    });

    //With player
    this.isCollidingWith(player);
  }

  isCollidingWith(entity) {
    let entityHLeft = entity.position.x + entity.hitbox.x;
    let entityHTop = entity.position.y + entity.hitbox.y;
    let entityHCenter = new Vector(
      entityHLeft + entity.hitbox.width / 2,
      entityHTop + entity.hitbox.height / 2
    );

    let thisHLeft = this.position.x + this.hitbox.x;
    let thisHTop = this.position.y + this.hitbox.y;
    let thisHCenter = new Vector(
      thisHLeft + this.hitbox.width / 2,
      thisHTop + this.hitbox.height / 2
    );

    let averageWidth = (entity.hitbox.width + this.hitbox.width) / 2;
    let averageHeight = (entity.hitbox.height + this.hitbox.height) / 2;

    let displacement = entityHCenter.subtract(thisHCenter);

    //If either displacement.x or displacement.y is greater than the average dimension then there is no collision
    if (
      Math.abs(displacement.x) > averageWidth ||
      Math.abs(displacement.y) > averageHeight
    )
      return;

    if (entity instanceof Mario) {
      entity.powerUp(this.index);
    }
  }

  reverseHorizontalVelocity() {
    this.velocity.x = -this.velocity.x;
  }
}

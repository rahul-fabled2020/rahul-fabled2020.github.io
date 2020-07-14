class Enemy extends Entity {
  constructor(configuration) {
    super({
      position: configuration.position,
      sprite: configuration.sprite,
      hitbox: configuration.hitbox,
    });

    this.isDyingCount = 0;
    this.velocity = new Vector(-0.5, 0);
    this.level = configuration.level;
    this.index = this.level.enemies.length;
  }

  update(dt, camera) {

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
    this.position = this.position.add(this.velocity);

    this.sprite.update(dt);
  }

  detectCollision(camera, player) {
    if (this.isFlipping) return;

    //Number of overlapping tiles = h*w
    let h = 1;
    let w = 1;

    if (this.position.y % TILE_SIZE !== 0) {
      h++;
    }

    if (this.position.x % TILE_SIZE !== 0) {
      w++;
    }

    if(this instanceof Koopa) h++;

    let baseX = Math.floor(this.position.x / TILE_SIZE);
    let baseY = Math.floor(this.position.y / TILE_SIZE);

    if (baseY + h > MAX_ROW_SIZE) {
      delete this.level.enemies[this.index];
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
          this.level.statics[baseY + i][baseX + j].isCollidingWith(this, this.level);
        }

        if (this.level.blocks[baseY + i][baseX + j]) {
          this.level.blocks[baseY + i][baseX + j].isCollidingWith(this, this.level);
        }
      }
    }

    //With bridge
    this.level.bridges.forEach((bridgeGroup) => {
      bridgeGroup.forEach((bridge) => {
        bridge.isCollidingWith(this, this.level);
      });
    });

    //With other enemies
    this.level.enemies.forEach((enemy) => {
      if (enemy === this) return;

      if (enemy.position.x - camera.x > 21 * TILE_SIZE) return;

      this.isCollidingWith(enemy);
    });

    //With player
    this.isCollidingWith(player);
  }

  isCollidingWith(entity) {
    if(entity instanceof Mario && (entity.dyingTime || entity.powerTime)) return;

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
      if (entity.velocity.y > 0) {
        delete this.level.enemies[this.index];
      } else {
        entity.getDamaged();
      }
    } else {
      this.reverseHorizontalVelocity();
    }
  }

  reverseHorizontalVelocity() {
    this.velocity.x *= -1;
  }
}

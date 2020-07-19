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
    this.isFlipping = false;
  }

  update(dt, camera, player, gameTime) {
    if (player.powerTime || player.dyingTime) return;

    if (this.position.x - camera.x > 21 * TILE_SIZE) return;

    if (this.position.x - camera.x < -2 * TILE_SIZE) {
      delete this.level.enemies[this.index];
    }

    if (!(this instanceof Goomba) && this.velocity.x > 0) {
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

    this.sprite.update(dt, gameTime);
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

    if (this instanceof Koopa || this instanceof Bowser || HammerBro) h++;

    if (this instanceof Bowser) w++;

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

    //With other enemies
    this.level.enemies.forEach((enemy) => {
      if (enemy === this) return;

      if (enemy.position.x - camera.x > 21 * TILE_SIZE) return;

      this.isCollidingWith(enemy);
    });

    //With player
    if(player.dyingTime || player.powerTime || this.isDyingCount) return;

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

    if (
      Math.abs(displacement.x / this.hitbox.width) >
      Math.abs(displacement.y / this.hitbox.height)
    ) {
      if (entity instanceof Enemy) {
        if (displacement.x < 0) {
          //Entity is colliding from the left
          entity.velocity.x = - Math.abs(entity.velocity.x)
          // entity.velocity.x = Math.min(0, entity.velocity.x);
          // entity.acceleration.x = Math.min(0, entity.acceleration.x);

          entity.position.x = this.position.x - entity.hitbox.width;
        } else {
          //Entity is colliding from the right
          entity.velocity.x = Math.abs(entity.velocity.x)
          // entity.acceleration.x = Math.max(0, entity.acceleration.x);

          entity.position.x = this.position.x + this.hitbox.width;
        }
      }
    }
    if (entity instanceof Mario) {
      if (entity.velocity.y > 0 && !(this instanceof Bowser)) {
        this.stomp(entity);
      } else {
        entity.getDamaged();
      }
    } else {
      // this.reverseHorizontalVelocity();
      // entity.reverseHorizontalVelocity()
    }
  }

  reverseHorizontalVelocity() {
    this.velocity.x *= -1;
  }

  stomp(player) {

  }
}
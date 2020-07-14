class Flower extends Entity {
    constructor(position, level) {
        super({
            position: position,
            sprite: SPRITES.flowerSprite,
            hitbox: {
                x: 0,
                y: 0,
                width: TILE_SIZE,
                height: TILE_SIZE
            }
        });

        this.level = level;
        this.targetPosition = new Vector(0, 0);
        this.spawningCount = 0;
        this.waitingCount = 0;
        this.index = -1;
    }

    render(context, camera) {
        if(this.spawningCount > 1) return;
        this.sprite.render(context, this.position, camera);
    }

    spawn() {
        this.index = this.level.items.length;
        this.level.items.push(this);

        this.spawningCount = 12;
        this.targetPosition = new Vector(this.position.x, this.position.y - TILE_SIZE);
    }

    update(dt, gameTime) {
        if(this.spawningCount > 1) {
            this.spawningCount -= 1;

            if(this.spawningCount == 1) {
                this.velocity.y = -0.5;
            }

            return;
        }

        if(this.spawningCount) {
            if(this.position.y <= this.targetPosition.y) {
                this.position.y = this.targetPosition.y;
                this.velocity.y = 0;
                this.spawningCount = 0;
            }
        }

        this.velocity.y += this.acceleration.y;
        this.position = this.position.add(this.velocity);

        this.sprite.update(dt, gameTime);
    }

    detectCollision(camera, player) {
        if (this.spawningCount) return;
        this.isCollidingWith(player);
    }    
    
    isCollidingWith(entity) {
        if(this.spawningCount) return;

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
            entity.powerUp(this.index, this.level);
        }
      }    
}
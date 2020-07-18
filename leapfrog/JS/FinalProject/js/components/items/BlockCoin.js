class BlockCoin extends Entity {
    constructor(position, level) {
        super({
            position: position,
            sprite: SPRITES.blockCoinSprite,
            hitbox: {
                x: 0,
                y: 0,
                width: TILE_SIZE,
                height: TILE_SIZE
            }
        });

        this.level = level;
        this.index = -1;
    }

    spawn() {
        SOUND.coin.currentTime = 0;
        SOUND.coin.play();

        this.index = this.level.items.length;
        this.level.items.push(this);
        this.isActive = true;
        this.velocity.y = -12;
        this.targetPosition = this.position.y - 2*TILE_SIZE;
    }

    update(dt, gameTime, player) {
        if(!this.isActive) return;

        if(this.velocity.y > 0 && this.position.y >= this.targetPosition) {
            player.numberOfCoins++;
            delete this.level.items[this.index];
        }

        this.acceleration.y = 0.75;
        this.velocity.y += this.acceleration.y;
        this.position.y += this.velocity.y;

        this.sprite.update(dt, gameTime);
    }

    detectCollision() {}
}
class Block extends Entity {
    constructor(configuration) {
        super({
            position: configuration.position,
            sprite: configuration.sprite,
            hitbox: {
                x: 0,
                y: 0,
                width: TILE_SIZE,
                height: TILE_SIZE
            }
        });

        
        this.item = configuration.item;
        this.usedSprite = configuration.usedSprite;
        this.bounceSprite = configuration.bounceSprite;
        this.breakable = configuration.breakable;
    }

    break() {
        console.log("Break");
    }

    bonk() {
        console.log("Bonk");
    }

    update(dt, gameTime) {
        this.sprite.update(dt, gameTime);
    }
}
class Flag {
    constructor(positionX) {
        let height = 49;
        this.position = new Vector(positionX, height);
        this.hitbox = {
            x:0,
            y:0,
            width: 0,
            height: 0
        }

        this.velocity = new Vector(0, 0);
    }

    update(dt, gameTime, player) {
        if(!this.done && this.position.y >= 10*TILE_SIZE + 10) {
            this.velocity = new Vector(0, 0);
            this.position.y = 10*TILE_SIZE + 10;
            player.exit();
            this.done = true;
        }
        this.position.y += this.velocity.y;
    }

    detectCollision(camera, player) {
        this.isCollidingWith(player);
    }

    isCollidingWith(entity) {
        if(this.hit) return;

        if(entity.position.x + 0.5 * TILE_SIZE >= this.position.x) {
            MUSIC.level.pause();
            MUSIC.castle.pause();
            SOUND.flagfalling.play();
            
            setTimeout(() => {
                MUSIC.exit.play();
            }, 2000);

            this.hit = true;
            entity.flag();
            this.velocity = new Vector(0, 2);
        }
    }

    render(context, camera) {
        let position = new Vector(this.position.x - 0.5 * TILE_SIZE, this.position.y);
        SPRITES.flagSprite.render(context, position, camera);
    }
}
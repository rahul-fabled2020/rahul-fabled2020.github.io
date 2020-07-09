class Level {
    constructor(configuration) {
        this.playerPosition = configuration.playerPosition;
        this.scrolling = configuration.scrolling;
        
        this.background = configuration.background;
        this.exit = configuration.exit;

        this.floorSprite = configuration.floorSprite;
        this.wallSprite = configuration.wallSprite;
        this.brickSprite = configuration.brickSprite;
        this.uBlockSprite = configuration.ublockSprite;
        this.qBlockSprite = configuration.qBlockSprite;
        this.brickBounceSprite = configuration.brickBounceSprite;

        this.statics = [];
        this.scenery = [];
        this.blocks = [];
        
        this.enemies = [];
        this.items = [];
        this.pipes = [];

        for(let i=0; i<15; i++) {
            this.statics[i] = [];
            this.scenery[i] = [];
            this.blocks[i] = [];
        }

    }
    
    putFloor(start, end) {
        for(let i = start; i< end; i++) {
            this.statics[13][i] = new Floor(new Vector(16*i, 208), this.floorSprite);
            this.statics[14][i] = new Floor(new Vector(16*i, 224), this.floorSprite);
        }
    }

    putWall(x, y, height) {
        // y = bottom of the wall
        for(let i= y-height; i<y; i++) {
            this.statics[i][x] = new Floor(new Vector(16*x, 16*i), this.wallSprite);
        }
    }

    putQBlock(x, y, item) {
        this.blocks[y][x] = new Block({
            position: new Vector(x*16, y*16),
            item: item,
            sprite: this.qBlockSprite
        });
    }

    putBrick(x, y, item) {
        this.blocks[y][x] = new Block({
            position: new Vector(x*16, y*16),
            item: item,
            sprite: this.brickSprite,
            bounceSprite: this.brickBounceSprite,
            usedSprite: this.uBlockSprite,
            breakable: !item
        });
    }

}
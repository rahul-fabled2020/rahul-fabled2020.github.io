class Level {
  constructor(configuration) {
    this.playerPosition = configuration.playerPosition;
    this.scrolling = configuration.scrolling;

    this.background = configuration.background;
    console.log(this.playerPosition);

    this.initLevel();
  }

  initLevel() {
    this.statics = [];
    this.scenery = [];
    this.blocks = [];
    this.obstacles = [];
    this.bridges = [];

    this.enemies = [];
    this.items = [];
    this.pipes = [];

    for (let i = 0; i < MAX_ROW_SIZE; i++) {
      this.statics[i] = [];
      this.scenery[i] = [];
      this.blocks[i] = [];
    }
  }

  putCeiling(horizontalPosition, VerticalPosition) {
    let hStart = horizontalPosition[0];
    let hEnd = horizontalPosition[1];
    let vStart = VerticalPosition[0];
    let vEnd = VerticalPosition[1];

    for (let col = hStart; col < hEnd; col++) {
      for (let row = vStart; row < vEnd; row++) {
        this.statics[row][col] = new Floor(
          new Vector(TILE_SIZE * col, TILE_SIZE * row),
          SPRITES.floorSprite
        );
      }
    }
  }

  putFloor(horizontalPosition, VerticalPosition) {
    let hStart = horizontalPosition[0];
    let hEnd = horizontalPosition[1];
    let vStart = VerticalPosition[0];
    let vEnd = VerticalPosition[1];

    for (let col = hStart; col < hEnd; col++) {
      for (let row = vStart; row < vEnd; row++) {
        this.statics[row][col] = new Floor(
          new Vector(TILE_SIZE * col, TILE_SIZE * row),
          SPRITES.floorSprite
        );
      }
    }
  }

  putWall(x, y, height) {
    // y = bottom of the wall
    for (let i = y - height; i < y; i++) {
      this.statics[i][x] = new Floor(
        new Vector(16 * x, 16 * i),
        SPRITES.wallSprite
      );
    }
  }

  putFireBackground(horizontalPosition, VerticalPosition) {
    let hStart = horizontalPosition[0];
    let hEnd = horizontalPosition[1];
    let vStart = VerticalPosition[0];
    let vEnd = VerticalPosition[1];

    for (let col = hStart; col < hEnd; col++) {
      for (let row = vStart; row < vEnd; row++) {
        let sprite = SPRITES.fireBackgroundSprites[1];

        if (row == vStart) sprite = SPRITES.fireBackgroundSprites[0];

        this.scenery[row][col] = new Floor(
          new Vector(TILE_SIZE * col, TILE_SIZE * row),
          sprite
        );
      }
    }
  }

  putCoin(x, y) {
    this.items.push(
      new Coin(
        new Vector(x * TILE_SIZE, y * TILE_SIZE),
        SPRITES.coinSprite,
        this
      )
    );
  }

  putQBlock(x, y, item) {
    this.blocks[y][x] = new Block({
      position: new Vector(x * 16, y * 16),
      item: item,
      sprite: SPRITES.qBlockSprite,
      usedSprite: SPRITES.uBlockSprite,
    });
  }

  putBrick(x, y, item) {
    this.blocks[y][x] = new Block({
      position: new Vector(x * 16, y * 16),
      item: item,
      sprite: SPRITES.brickSprite,
      bounceSprite: SPRITES.brickBounceSprite,
      usedSprite: SPRITES.uBlockSprite,
      breakable: !item,
    });
  }

  putUsedBlock(x, y) {
    this.blocks[y][x] = new Block({
      position: new Vector(x * TILE_SIZE, y * TILE_SIZE),
      sprite: SPRITES.uBlockSprite,
      usedSprite: SPRITES.uBlockSprite,
      breakable: false,
    });
  }

  putRotatingFire(x, y) {
    let angle = Math.random() * 360;
    let center = new Vector(x*TILE_SIZE, y*TILE_SIZE)
    let obstacles = [];

    for(let i=0; i<6; i++) {
      let distaneFromCenter = i*(0.5*TILE_SIZE);
      obstacles.push(
        new RotatingFire(
          new Vector(x * TILE_SIZE, y * TILE_SIZE),
          angle,
          center,
          distaneFromCenter
        ),        
      );
    }

    this.obstacles.push(obstacles);
  }

  putFireBridge(x, y, length) {
    let bridge = [];
    for (let i = 0; i < length; i++) {
      bridge.push(
        new FireBridge({
          position: new Vector((x + i) * TILE_SIZE, y * TILE_SIZE),
          sprite: SPRITES.fireBridgeSprite,
        })
      );
    }

    this.bridges.push(bridge);
  }

  putAxe(x, y) {
    this.items.push(new Axe(new Vector(x * TILE_SIZE, y * TILE_SIZE), this));
  }

  putGoomba(x, y) {
    this.enemies.push(
      new Goomba(
        new Vector(x * TILE_SIZE, y * TILE_SIZE),
        SPRITES.goombaSprite,
        this
      )
    );
  }

  putKoopa(x, y) {
    this.enemies.push(
      new Koopa(
        new Vector(x * TILE_SIZE, y * TILE_SIZE),
        SPRITES.koopaSprite,
        this
      )
    );
  }
}

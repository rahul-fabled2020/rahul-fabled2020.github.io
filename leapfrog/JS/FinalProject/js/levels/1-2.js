class Level12 extends Level {
  constructor() {
    super({
      playerPosition: new Vector(0, 96),
      background: "#000",
      scrolling: true,

      floorSprite: new Sprite(
        "images/tiles.png",
        new Vector(2 * TILE_SIZE, 5 * TILE_SIZE),
        { width: TILE_SIZE, height: TILE_SIZE },
        0
      ),
      wallSprite: new Sprite(
        "images/tiles.png",
        new Vector(0, TILE_SIZE),
        { width: TILE_SIZE, height: TILE_SIZE },
        0
      ),
      brickSprite: new Sprite(
        "images/tiles.png",
        new Vector(TILE_SIZE, 0),
        { width: TILE_SIZE, height: TILE_SIZE },
        0
      ),
      brickBounceSprite: new Sprite(
        "images/tiles.png",
        new Vector(2 * TILE_SIZE, 0),
        { width: TILE_SIZE, height: TILE_SIZE },
        0
      ),
      uBlockSprite: new Sprite(
        "images/tiles.png",
        new Vector(3 * TILE_SIZE, 0),
        { width: TILE_SIZE, height: TILE_SIZE },
        0
      ),
      qBlockSprite: new Sprite(
        "images/tiles.png",
        new Vector(24 * TILE_SIZE, 0),
        { width: TILE_SIZE, height: TILE_SIZE },
        8,
        [0, 0, 0, 0, 1, 2, 1]
      ),
      fireBackgroundSprites: [
        new Sprite(
          "images/tiles.png",
          new Vector(3 * TILE_SIZE, 24 * TILE_SIZE),
          {width: TILE_SIZE, height: TILE_SIZE},
          0
        ),
        new Sprite(
          "images/tiles.png",
          new Vector(3 * TILE_SIZE, 25 * TILE_SIZE),
          {width: TILE_SIZE, height: TILE_SIZE},
          0
        ),
      ],
    });

    this.levelEndPosition = 153 * TILE_SIZE;
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
          this.floorSprite
        );
      }
    }
  }

  loadLevel(player, camera) {
    let ground = [
      { horizontalPosition: [0, 3], VerticalPosition: [7, 8] },
      { horizontalPosition: [0, 4], VerticalPosition: [8, 9] },
      { horizontalPosition: [0, 5], VerticalPosition: [9, 10] },
      { horizontalPosition: [0, 13], VerticalPosition: [10, 15] },
      { horizontalPosition: [15, 26], VerticalPosition: [10, 15] },
      { horizontalPosition: [29, 32], VerticalPosition: [10, 15] },
      { horizontalPosition: [35, 104], VerticalPosition: [10, 15] },
      { horizontalPosition: [35, 73], VerticalPosition: [9, 10] },
      { horizontalPosition: [104, 116], VerticalPosition: [13, 15] },
      { horizontalPosition: [116, 120], VerticalPosition: [10, 15] },
      { horizontalPosition: [120, 123], VerticalPosition: [13, 15] },
      { horizontalPosition: [123, 128], VerticalPosition: [10, 15] },
      { horizontalPosition: [141, 143], VerticalPosition: [9, 15] },
      { horizontalPosition: [143, 159], VerticalPosition: [13, 15] },
    ];

    let ceiling = [
      { horizontalPosition: [0, 238], VerticalPosition: [2, 3] },
      { horizontalPosition: [0, 24], VerticalPosition: [3, 5] },
      { horizontalPosition: [23, 24], VerticalPosition: [5, 6] },
      { horizontalPosition: [38, 73], VerticalPosition: [3, 6] },
      { horizontalPosition: [81, 82], VerticalPosition: [3, 4] },
      { horizontalPosition: [89, 90], VerticalPosition: [3, 4] },
      { horizontalPosition: [98, 104], VerticalPosition: [3, 5] },
    ];

    let fireBackground = [
      { horizontalPosition: [13, 15], VerticalPosition: [12, 15] },
      { horizontalPosition: [26, 29], VerticalPosition: [13, 15] },
      { horizontalPosition: [32, 35], VerticalPosition: [13, 15] },
      { horizontalPosition: [128, 141], VerticalPosition: [13, 15] },
    ];

    player.position = this.playerPosition;

    camera.x = 0;

    //Floor building
    ground.forEach((tilePosition) => {
      this.putFloor(
        tilePosition.horizontalPosition,
        tilePosition.VerticalPosition
      );
    });

    //Ceiling building
    ceiling.forEach((tilePosition) => {
      this.putCeiling(
        tilePosition.horizontalPosition,
        tilePosition.VerticalPosition
      );
    });

    //fireBackround painting
    fireBackground.forEach((tilePosition) => {
      this.putFireBackground(
        tilePosition.horizontalPosition,
        tilePosition.VerticalPosition
      );
    });

    //Others
    this.putQBlock(30, 6, null);
    this.putRotatingFire(30,10);
    this.putRotatingFire(49,6);
    this.putRotatingFire(60,6);
    this.putRotatingFire(67,6);
    this.putRotatingFire(76,9);
    this.putRotatingFire(84,9);
    this.putRotatingFire(89,4);
  }
}

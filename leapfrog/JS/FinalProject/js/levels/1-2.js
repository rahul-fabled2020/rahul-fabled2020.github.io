class Level12 extends Level {
  constructor() {
    var levelConfig = {
      playerPosition: new Vector(0, 96),
      background: "#000",
      scrolling: true,
    };

    super(levelConfig);

    this.levelEndPosition = 153 * TILE_SIZE;
  }

  loadLevel(player, camera) {
    this.initLevel();
    SPRITES.floorSprite.position = new Vector(2 * TILE_SIZE, 5 * TILE_SIZE);
    player.position = this.playerPosition.copy();
    camera.reset();

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
    this.putQBlock(30, 6, new Mushroom(new Vector(30 * TILE_SIZE, 6 *TILE_SIZE), this));
    this.putRotatingFire(30.25, 10.25);
    this.putRotatingFire(49.25, 6.25);
    this.putRotatingFire(60.25, 6.25);
    this.putRotatingFire(67.25, 6.25);
    this.putRotatingFire(76.25, 9.25);
    this.putRotatingFire(84.25, 9.25);
    this.putRotatingFire(89.25, 4.25);

    this.putUsedBlock(30, 10, null);
    this.putUsedBlock(49, 6, null);
    this.putUsedBlock(60, 6, null);
    this.putUsedBlock(67, 6, null);
    this.putUsedBlock(76, 9, null);
    this.putUsedBlock(84, 9, null);
    this.putUsedBlock(89, 4, null);

    this.putCoin(5, 8);

    this.putFireBridge(128, 10, 13);
    this.putAxe(141.5, 8);

    //Enemies
    this.putGoomba(10, 5);
    this.putGoomba(12, 5);
    this.putGoomba(92, 9);
    this.putGoomba(100, 9);
    this.putGoomba(130, 9);
    this.putGoomba(135, 9);

    this.putKoopa(8, 5);
    this.putKoopa(102, 9);

    this.putBowser(137,5);
  }
}

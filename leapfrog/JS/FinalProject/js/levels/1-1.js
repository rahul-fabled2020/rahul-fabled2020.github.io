/**
 * The first level of the game
 */
class Level11 extends Level {
  constructor() {
    var levelConfig = {
      playerPosition: new Vector(3 * TILE_SIZE, 12 * TILE_SIZE),
      background: "#7974FF",
      scrolling: true,
    };

    super(levelConfig);

    this.levelEndPosition = 204 * TILE_SIZE;
  }

  /**
   * Loads the level
   * @param {Mario} player 
   * @param {Camera} camera 
   */
  loadLevel(player, camera) {
    this.initLevel();
    SPRITES.floorSprite.position = new Vector(0, 0);
    player.position = this.playerPosition.copy();
    camera.reset();

    let ground = [
      { horizontalPosition: [0, 69], VerticalPosition: [13, 15] },
      { horizontalPosition: [71, 86], VerticalPosition: [13, 15] },
      { horizontalPosition: [89, 153], VerticalPosition: [13, 15] },
      { horizontalPosition: [155, 212], VerticalPosition: [13, 15] },
      { horizontalPosition: [212, 243], VerticalPosition: [13, 15] },
      { horizontalPosition: [246, 289], VerticalPosition: [13, 15] },
      { horizontalPosition: [394, 360], VerticalPosition: [13, 15] },
      { horizontalPosition: [363, 385], VerticalPosition: [13, 15] },
      { horizontalPosition: [389, 391], VerticalPosition: [13, 15] },
      { horizontalPosition: [395, 402], VerticalPosition: [13, 15] },
      { horizontalPosition: [405, 446], VerticalPosition: [13, 15] },
    ];

    //Ground building
    ground.forEach((tilePosition) => {
      this.putFloor(
        tilePosition.horizontalPosition,
        tilePosition.VerticalPosition
      );
    });

    this.putQBlock(16, 9, new BlockCoin(new Vector(16 * TILE_SIZE, 9 *TILE_SIZE), this));
    this.putBrick(20, 9, null);
    this.putQBlock(21, 9, new Mushroom(new Vector(21 * TILE_SIZE, 9 *TILE_SIZE), this));
    this.putBrick(22, 9, null);
    this.putQBlock(22, 5, new BlockCoin(new Vector(22 * TILE_SIZE, 5 *TILE_SIZE), this));
    this.putQBlock(23, 9, new BlockCoin(new Vector(23 * TILE_SIZE, 9 *TILE_SIZE), this));
    this.putBrick(24, 9, null);

    this.putBrick(77, 9, null);
    this.putQBlock(78, 9, new Mushroom(new Vector(78 * TILE_SIZE, 9 *TILE_SIZE), this));
    this.putBrick(79, 9, null);
    this.putBrick(80, 5, null);
    this.putBrick(81, 5, null);
    this.putBrick(82, 5, null);
    this.putBrick(83, 5, null);
    this.putBrick(84, 5, null);
    this.putBrick(85, 5, null);
    this.putBrick(86, 5, null);
    this.putBrick(87, 5, null);
    this.putBrick(91, 5, null);
    this.putBrick(92, 5, null);
    this.putBrick(93, 5, null);
    this.putQBlock(94, 5, new BlockCoin(new Vector(94 * TILE_SIZE, 5 *TILE_SIZE), this));
    this.putBrick(94, 9, null);
    this.putBrick(100, 9, null);
    this.putBrick(101, 9, null);
    this.putQBlock(105, 9, new BlockCoin(new Vector(105 * TILE_SIZE, 9 *TILE_SIZE), this));
    this.putQBlock(108, 9, new BlockCoin(new Vector(108 * TILE_SIZE, 9 *TILE_SIZE), this));
    this.putQBlock(108, 5, new Mushroom(new Vector(108 * TILE_SIZE, 5 *TILE_SIZE), this));
    this.putQBlock(111, 9, new BlockCoin(new Vector(111 * TILE_SIZE, 9 *TILE_SIZE), this));
    this.putBrick(117, 9, null);
    this.putBrick(120, 5, null);
    this.putBrick(121, 5, null);
    this.putBrick(122, 5, null);
    this.putBrick(123, 5, null);
    this.putBrick(128, 5, null);
    this.putQBlock(129, 5, new BlockCoin(new Vector(129 * TILE_SIZE, 5 *TILE_SIZE), this));
    this.putBrick(129, 9, null);
    this.putQBlock(130, 5, new BlockCoin(new Vector(130 * TILE_SIZE, 5 *TILE_SIZE), this));
    this.putBrick(130, 9, null);
    this.putBrick(131, 5, null);
    this.putWall(134, 13, 1);
    this.putWall(135, 13, 2);
    this.putWall(136, 13, 3);
    this.putWall(137, 13, 4);
    this.putWall(140, 13, 4);
    this.putWall(141, 13, 3);
    this.putWall(142, 13, 2);
    this.putWall(143, 13, 1);
    this.putWall(148, 13, 1);
    this.putWall(149, 13, 2);
    this.putWall(150, 13, 3);
    this.putWall(151, 13, 4);
    this.putWall(152, 13, 4);
    this.putWall(155, 13, 4);
    this.putWall(156, 13, 3);
    this.putWall(157, 13, 2);
    this.putWall(158, 13, 1);
    this.putBrick(168, 9, new BlockCoin(new Vector(168 * TILE_SIZE, 9 *TILE_SIZE), this));
    this.putBrick(169, 9, null);
    this.putQBlock(170, 9, new BlockCoin(new Vector(170 * TILE_SIZE, 9 *TILE_SIZE), this));
    this.putBrick(171, 9, null);
    this.putWall(181, 13, 1);
    this.putWall(182, 13, 2);
    this.putWall(183, 13, 3);
    this.putWall(184, 13, 4);
    this.putWall(185, 13, 5);
    this.putWall(186, 13, 6);
    this.putWall(187, 13, 7);
    this.putWall(188, 13, 8);
    this.putWall(189, 13, 8);

    this.putPipe(28, 13, 2);
    this.putPipe(38, 13, 3);
    this.putPipe(46, 13, 4);
    this.putPipe(57, 13, 4);
    this.putPipe(163, 13, 2);
    this.putPipe(179, 13, 2);

    this.putFlagPole(198);

    //Enemies
    this.putGoomba(22, 12);
    this.putGoomba(40, 12);
    this.putGoomba(50, 12);
    this.putGoomba(51, 12);
    this.putGoomba(82, 4);
    this.putGoomba(84, 4);
    this.putGoomba(100, 12);
    this.putGoomba(102, 12);
    this.putGoomba(114, 12);
    this.putGoomba(115, 12);
    this.putGoomba(122, 12);
    this.putGoomba(123, 12);
    this.putGoomba(125, 12);
    this.putGoomba(126, 12);
    this.putGoomba(170, 12);
    this.putGoomba(172, 12);
    
    this.putKoopa(35, 11);

    this.putHammerBro(37,5);
  }
}

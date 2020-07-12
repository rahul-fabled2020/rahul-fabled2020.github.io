class Level11 extends Level {
  constructor() {
    var levelConfig = {
      playerPosition: new Vector(3 * TILE_SIZE, 12 * TILE_SIZE),
      background: "#7974FF",
      scrolling: true,
    };

    var configuration = { ...levelConfig, ...SPRITES };

    super(configuration);

    this.levelEndPosition = 204 * TILE_SIZE;
  }

  loadLevel(player, camera) {
    this.initLevel();
    SPRITES.floorSprite.position = new Vector(0, 0);

    let ground = [
      [0, 69],
      [71, 86],
      [89, 153],
      [155, 212],

      [212, 243],
      [246, 289],
      [394, 360],
      [363, 385],
      [389, 391],
      [395, 402],
      [405, 446],
    ];
    player.position = this.playerPosition;
    camera.x = 0;

    //Ground building
    ground.forEach((tilePosition) => {
      this.putFloor(tilePosition[0], tilePosition[1]);
    });

    this.putQBlock(16, 9, null);
    this.putBrick(20, 9, null);
    this.putQBlock(21, 9, null);
    this.putBrick(22, 9, null);
    this.putQBlock(22, 5, null);
    this.putQBlock(23, 9, null);
    this.putBrick(24, 9, null);

    this.putBrick(77, 9, null);
    this.putQBlock(78, 9, null);
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
    this.putQBlock(94, 5, null);
    this.putBrick(94, 9, null);
    this.putBrick(100, 9, null);
    this.putBrick(101, 9, null);
    this.putQBlock(105, 9, null);
    this.putQBlock(108, 9, null);
    this.putQBlock(108, 5, null);
    this.putQBlock(111, 9, null);
    this.putBrick(117, 9, null);
    this.putBrick(120, 5, null);
    this.putBrick(121, 5, null);
    this.putBrick(122, 5, null);
    this.putBrick(123, 5, null);
    this.putBrick(128, 5, null);
    this.putQBlock(129, 5, null);
    this.putBrick(129, 9, null);
    this.putQBlock(130, 5, null);
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
    this.putBrick(168, 9, null);
    this.putBrick(169, 9, null);
    this.putQBlock(170, 9, null);
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

    //Enemies
    this.putGoomba(10, 5);
    this.putGoomba(12, 5);
    this.putGoomba(92, 9);
    this.putGoomba(100, 9);
    this.putGoomba(130, 9);
    this.putGoomba(135, 9);

    return "Loaded";
  }
}

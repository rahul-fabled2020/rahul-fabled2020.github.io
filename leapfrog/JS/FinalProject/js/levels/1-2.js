class Level12 extends Level {
  constructor() {
    super({
      playerPosition: new Vector(0, 112),
      background: "#000",
      scrolling: true,
      exit: 204,

      floorSprite: new Sprite(
        "images/tiles.png",
        new Vector(32, 80),
        { width: 16, height: 16 },
        0
      ),
      wallSprite: new Sprite(
        "images/tiles.png",
        new Vector(0, 16),
        { width: 16, height: 16 },
        0
      ),
      brickSprite: new Sprite(
        "images/tiles.png",
        new Vector(16, 0),
        { width: 16, height: 16 },
        0
      ),
      brickBounceSprite: new Sprite(
        "images/tiles.png",
        new Vector(32, 0),
        { width: 16, height: 16 },
        0
      ),
      uBlockSprite: new Sprite(
        "images/tiles.png",
        new Vector(48, 0),
        { width: 16, height: 16 },
        0
      ),
      qBlockSprite: new Sprite(
        "images/tiles.png",
        new Vector(384, 0),
        { width: 16, height: 16 },
        8,
        [0, 0, 0, 0, 1, 2, 1]
      ),
    });

    this.levelEndPosition = 2448;
  }

  putFloor(horizontalPosition, VerticalPosition) {
    let hStart = horizontalPosition[0];
    let hEnd = horizontalPosition[1];
    let vStart = VerticalPosition[0];
    let vEnd = VerticalPosition[1];

    for(let col = hStart; col < hEnd; col++){
      for(let row = vStart; row< vEnd; row++){
        this.statics[row][col] = new Floor(
          new Vector(16*col, 16*row),
          this.floorSprite
        );
      }
    }
  }

  putCeiling(horizontalPosition, VerticalPosition) {
    let hStart = horizontalPosition[0];
    let hEnd = horizontalPosition[1];
    let vStart = VerticalPosition[0];
    let vEnd = VerticalPosition[1];

    for(let col = hStart; col < hEnd; col++){
      for(let row = vStart; row< vEnd; row++){
        this.statics[row][col] = new Floor(
          new Vector(16*col, 16*row),
          this.floorSprite
        );
      }
    }
  }

  loadLevel(player, camera) {
    let ground = [
      {horizontalPosition: [0,3], VerticalPosition: [7,8]},
      {horizontalPosition: [0,4], VerticalPosition: [8,9]},
      {horizontalPosition: [0,5], VerticalPosition: [9,10]},
      {horizontalPosition: [0,13], VerticalPosition: [10,15]},
      {horizontalPosition: [15,26], VerticalPosition: [10,15]},
      {horizontalPosition: [29,32], VerticalPosition: [10,15]},
      {horizontalPosition: [35,104], VerticalPosition: [10,15]},
      {horizontalPosition: [35,73], VerticalPosition: [9,10]},
      {horizontalPosition: [104,116], VerticalPosition: [13,15]},
      {horizontalPosition: [116,120], VerticalPosition: [10,15]},
      {horizontalPosition: [120,123], VerticalPosition: [13,15]},
      {horizontalPosition: [123,128], VerticalPosition: [10,15]},
      {horizontalPosition: [141,143], VerticalPosition: [9,15]},
      {horizontalPosition: [143,159], VerticalPosition: [13,15]},
    ];

    let ceiling = [
      {horizontalPosition: [0,238], VerticalPosition: [2,3]},
      {horizontalPosition: [0,24], VerticalPosition: [3,5]},
      {horizontalPosition: [38,73], VerticalPosition: [3,6]},
      {horizontalPosition: [81,82], VerticalPosition: [3,4]},
      {horizontalPosition: [89,90], VerticalPosition: [3,4]},
      {horizontalPosition: [98,104], VerticalPosition: [3,5]}
    ]

    player.position = this.playerPosition;
    
    camera.x = 0;

    //Floor building
    ground.forEach((tilePosition) => {
      this.putFloor(tilePosition.horizontalPosition, tilePosition.VerticalPosition);
    });

    //Ceiling building
    ceiling.forEach(tilePosition => {
      this.putCeiling(tilePosition.horizontalPosition, tilePosition.VerticalPosition)
    })

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
    this.putBrick(168, 9, null);
    this.putBrick(169, 9, null);
    this.putQBlock(170, 9, null);
    this.putBrick(171, 9, null);
  }
}

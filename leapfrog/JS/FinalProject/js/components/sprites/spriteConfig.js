const SPRITES = {
  axeSprite: new Sprite(
    TILES, //Sprite Sheet
    new Vector(27 * TILE_SIZE, TILE_SIZE), //Position of sprite in the sprite sheet
    { width: TILE_SIZE, height: TILE_SIZE }, //Dimension of the sprite in the sprite sheet
    8, //Animation Speed
    [0, 0, 0, 0, 1, 2, 1] //Indices of the animation sprites relative to current sprite in the same row
  ),

  brokenBrickSprite: new Sprite(
    ITEMS,
    new Vector(4 * TILE_SIZE, 0),
    { width: 8, height: 8 },
    3,
    [0, 1]
  ),

  blockCoinSprite: new Sprite(
    ITEMS,
    new Vector(0, 7 * TILE_SIZE),
    { width: TILE_SIZE, height: TILE_SIZE },
    20,
    [0, 1, 2, 3]
  ),

  bowserSprite: new Sprite(
    ENEMIES_LEFT,
    new Vector(47* TILE_SIZE, 0),
    {width: 2* TILE_SIZE, height: 2*TILE_SIZE},
    5,
    [0, -1]
  ),

  coinSprite: new Sprite(
    ITEMS,
    new Vector(0, 6 * TILE_SIZE),
    { width: TILE_SIZE, height: TILE_SIZE },
    6,
    [0, 0, 0, 0, 1, 2, 1]
  ),

  fireBulletSprites: new Sprite(
    ITEMS,
    new Vector(6 * TILE_SIZE, 9 * TILE_SIZE),
    { width: 8, height: 8 },
    5,
    [0, 1, 2, 3]
  ),

  fireSprite: new Sprite(
    ENEMIES_LEFT,
    new Vector(49 * TILE_SIZE, 0),
    {width: 1.5*TILE_SIZE, height: 0.5 * TILE_SIZE},
    0
  ),

  flagPoleTopSprite: new Sprite(
    TILES,
    new Vector(16 * TILE_SIZE, 8 * TILE_SIZE),
    {width: TILE_SIZE, height: TILE_SIZE},
    0
  ),

  flagPoleMidSprite: new Sprite(
    TILES,
    new Vector(16 * TILE_SIZE, 9 * TILE_SIZE),
    {width: TILE_SIZE, height: TILE_SIZE},
    0
  ),  

  flagSprite: new Sprite(
    ITEMS,
    new Vector(8 * TILE_SIZE, 2 * TILE_SIZE),
    {width: TILE_SIZE, height: TILE_SIZE},
    0
  ),

  floorSprite: new Sprite(
    TILES,
    new Vector(2 * TILE_SIZE, 5 * TILE_SIZE),
    { width: TILE_SIZE, height: TILE_SIZE },
    0
  ),

  flowerSprite: new Sprite(
    ITEMS,
    new Vector(0, 2 * TILE_SIZE),
    { width: TILE_SIZE, height: TILE_SIZE },
    20,
    [0, 1, 2, 3]
  ),

  hammerBroSprite: new Sprite(
    ENEMIES_LEFT,
    new Vector(20 * TILE_SIZE, 0),
    { width: TILE_SIZE, height: 2 * TILE_SIZE },
    5,
    [0, 1]
  ),

  hammerSprite: new Sprite(
    HAMMER,
    new Vector(0, 0),
    {width: TILE_SIZE, height: TILE_SIZE},
    10,
    [0,0,0,2,3,1]
  ),

  mushroomSprite: new Sprite(
    ITEMS,
    new Vector(0, 0),
    { width: TILE_SIZE, height: TILE_SIZE },
    0
  ),

  fireBridgeSprite: new Sprite(
    TILES,
    new Vector(4 * TILE_SIZE, 24 * TILE_SIZE),
    { width: TILE_SIZE, height: TILE_SIZE },
    0
  ),

  wallSprite: new Sprite(
    TILES,
    new Vector(0, TILE_SIZE),
    { width: TILE_SIZE, height: TILE_SIZE },
    0
  ),

  brickSprite: new Sprite(
    TILES,
    new Vector(TILE_SIZE, 0),
    { width: TILE_SIZE, height: TILE_SIZE },
    0
  ),

  brickBounceSprite: new Sprite(
    TILES,
    new Vector(2 * TILE_SIZE, 0),
    { width: TILE_SIZE, height: TILE_SIZE },
    0
  ),

  uBlockSprite: new Sprite(
    TILES,
    new Vector(3 * TILE_SIZE, 0),
    { width: TILE_SIZE, height: TILE_SIZE },
    0
  ),

  qBlockSprite: new Sprite(
    TILES,
    new Vector(24 * TILE_SIZE, 0),
    { width: TILE_SIZE, height: TILE_SIZE },
    8,
    [0, 0, 0, 0, 1, 2, 1]
  ),

  fireBackgroundSprites: [
    new Sprite(
      TILES,
      new Vector(3 * TILE_SIZE, 24 * TILE_SIZE),
      { width: TILE_SIZE, height: TILE_SIZE },
      0
    ),

    new Sprite(
      TILES,
      new Vector(3 * TILE_SIZE, 25 * TILE_SIZE),
      { width: TILE_SIZE, height: TILE_SIZE },
      0
    ),
  ],

  goombaSprite: new Sprite(
    ENEMIES_LEFT,
    new Vector(0, TILE_SIZE),
    { width: TILE_SIZE, height: TILE_SIZE },
    3,
    [0, 1]
  ),

  koopaSprite: new Sprite(
    ENEMIES_LEFT,
    new Vector(6 * TILE_SIZE, 0.5 * TILE_SIZE),
    { width: TILE_SIZE, height: 1.5 * TILE_SIZE },
    3,
    [0, 1]
  ),

  pipeTopLeftSprite: new Sprite(
    TILES,
    new Vector(0, 8 * TILE_SIZE),
    {width: TILE_SIZE, height: TILE_SIZE},
    0
  ),

  pipeTopRightSprite: new Sprite(
    TILES,
    new Vector(TILE_SIZE, 8 * TILE_SIZE),
    {width: TILE_SIZE, height: TILE_SIZE},
    0
  ),

  pipeMidLeftSprite: new Sprite(
    TILES,
    new Vector(0, 9 * TILE_SIZE),
    {width: TILE_SIZE, height: TILE_SIZE},
    0
  ),

  pipeMidRightSprite: new Sprite(
    TILES,
    new Vector(TILE_SIZE, 9 * TILE_SIZE),
    {width: TILE_SIZE, height: TILE_SIZE},
    0
  ),
};

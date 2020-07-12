const SPRITES = {
  floorSprite: new Sprite(
    TILES,
    new Vector(2 * TILE_SIZE, 5 * TILE_SIZE),
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
    new Vector(6 * TILE_SIZE, 0),
    { width: TILE_SIZE, height: 2 * TILE_SIZE },
    3,
    [0, 1]
  ),
};

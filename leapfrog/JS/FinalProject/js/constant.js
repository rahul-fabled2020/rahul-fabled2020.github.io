const TILE_SIZE = 16;
const MAX_ROW_SIZE = 15;
const DEGREE = Math.PI / 180;
const OFFSET_FROM_LEFT = 5 * TILE_SIZE; //for camera

//SpriteSheets
const PLAYER_LEFT = "images/marioLeft.png";
const PLAYER_RIGHT = "images/marioRight.png";
const ITEMS = "images/items.png";
const TILES = "images/tiles.png";
const ENEMIES_LEFT = "images/enemiesLeft.png";
const ENEMIES_RIGHT = "images/enemiesRight.png";

//Mario States
const SMALL_MARIO = 0;
const BIG_MARIO = 1;
const FIRE_MARIO = 2;

//Bowser
const BOWSER_JUMP_TIME = 30;
const BOWSER_JUMP_INTERVAL = Math.floor(Math.random() * 3) + 2;
const FIRE_TIME = Math.random() * 1.5 + 1.5;
const MOUTH_OPEN_TIME = 1;

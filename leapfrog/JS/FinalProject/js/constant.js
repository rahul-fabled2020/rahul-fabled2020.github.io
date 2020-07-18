const TILE_SIZE = 16;
const MAX_ROW_SIZE = 15;
const DEGREE = Math.PI / 180;
const OFFSET_FROM_LEFT = 5 * TILE_SIZE; //for camera
const START_SCREEN = "images/start_screen_banner.png";

//SpriteSheets
const PLAYER_LEFT = "images/marioLeft.png";
const PLAYER_RIGHT = "images/marioRight.png";
const ITEMS = "images/items.png";
const TILES = "images/tiles.png";
const ENEMIES_LEFT = "images/enemiesLeft.png";
const ENEMIES_RIGHT = "images/enemiesRight.png";
const HAMMER = "images/hammer.png";

//Mario States
const SMALL_MARIO = 0;
const BIG_MARIO = 1;
const FIRE_MARIO = 2;

//Bowser
const BOWSER_JUMP_TIME = 30;
const BOWSER_JUMP_INTERVAL = Math.floor(Math.random() * 3) + 2;
const FIRE_TIME = Math.random() * 1.5 + 1.5;
const MOUTH_OPEN_TIME = 1;

//Hammer Bro
const HAMMER_BRO_JUMP_TIME = 35;
const HAMMER_BRO_JUMP_INTERVAL = Math.floor(Math.random() * 3) + 2;
const SECOND_FIRE_TIME = 1;

//Sounds
const MUSIC = {
    level: new Audio("sounds/level.ogg"),
    exit: new Audio("sounds/exit.wav"),
    death: new Audio("sounds/death.wav"),
}

const SOUND = {
    appear: new Audio("sounds/appear.wav"),
    bowserfire: new Audio("sounds/bowserfire.mp3"),
    bowserfall: new Audio("sounds/bowserfall.mp3"),
    breakblock: new Audio("sounds/breakblock.wav"),
    bump: new Audio("sounds/bump.wav"),
    coin: new Audio("sounds/coin.wav"),
    firebullet: new Audio("sounds/firebullet.wav"),
    jump: new Audio("sounds/jump.wav"),
    kick: new Audio("sounds/kick.wav"),
    pause: new Audio("sounds/pause.mp3"),
    powerdown: new Audio("sounds/powerdown.wav"),
    powerup: new Audio("sounds/powerup.wav"),
    stomp: new Audio("sounds/stomp.wav"),
}
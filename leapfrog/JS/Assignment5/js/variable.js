//Game
const SPRITE = new Image();
SPRITE.src = "images/sprite.png";

const START_BUTTON = {
  x: 120,
  y: 263,
  width: 83,
  height: 29,
};

const GET_READY_DIMENSION = {
    sourceX: 0,
    sourceY: 228,
    width: 173,
    height: 152,
    x: 0,
    y: 80
}

const GAME_OVER_DIMENSION = {
    sourceX: 175,
    sourceY: 228,
    width: 225,
    height: 202,
    x: 0,
    y: 90
}

//Bird
const ANIMATION = [
  {
    sourceX: 276,
    sourceY: 112,
  },
  {
    sourceX: 276,
    sourceY: 139,
  },
  {
    sourceX: 276,
    sourceY: 164,
  },
  {
    sourceX: 276,
    sourceY: 139,
  },
];

const SLOW_FLAP_PERIOD = 5;
const FAST_FLAP_PERIOD = 10;

//Pipe
const TOP_PIPE_DIMENSION = {
    sourceX : 553,
    sourceY : 0
}

const BOTTOM_PIPE_DIMENSION = {
    sourceX: 502,
    sourceY : 0
}

const PIPE_MAX_Y_POSITION = -150;

//States
GET_READY = 0;
GAME = 1;
OVER = 2;

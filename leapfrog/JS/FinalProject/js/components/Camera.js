class Camera {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.CAMERA_POSITION_TILE = 0;
  }

  move(level, player) {
    if (level.scrolling && player.position.x > this.x + OFFSET_FROM_LEFT) {
      this.x = player.position.x - OFFSET_FROM_LEFT;

      this.CAMERA_POSITION_TILE = Math.floor(this.x / TILE_SIZE);
    }
  }

  reset() {
    this.x = 0;
    this.y = 0;
    this.CAMERA_POSITION_TILE = 0;
  }
}

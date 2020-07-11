class Camera {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  move(level, player) {
    if (level.scrolling && player.position.x > this.x + OFFSET_FROM_LEFT) {
      this.x = player.position.x - OFFSET_FROM_LEFT;
    }
  }
}

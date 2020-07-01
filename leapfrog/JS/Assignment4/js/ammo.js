function Ammo(ammoImage, width, height, speed) {
  var DEFAULT_SPEED = 10;
  var DEFAULT_HEIGHT = 32;
  var DEFAULT_WIDTH = 32;
  this.ammoImage = ammoImage;
  this.missionComplete = false;
  this.animId;
  this.laneIndex = 0;

  if (typeof speed === "undefined") {
    speed = DEFAULT_SPEED;
  }

  if (typeof height === "undefined") {
    height = DEFAULT_HEIGHT;
  }

  if (typeof width === "undefined") {
    width = DEFAULT_WIDTH;
  }

  this.x = 0;
  this.y = 0;

  this.speed = speed;
  this.width = width;
  this.height = height;
}

Ammo.prototype.render = function () {
  context.drawImage(this.ammoImage, this.x, this.y, this.width, this.height);
};

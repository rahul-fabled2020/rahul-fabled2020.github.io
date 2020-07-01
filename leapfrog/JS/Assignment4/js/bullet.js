function Bullet(bulletImage, width, height, speed) {
  var DEFAULT_SPEED = 10;
  var DEFAULT_HEIGHT = 24;
  var DEFAULT_WIDTH = 24;
  this.bulletImage = bulletImage;
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

Bullet.prototype.render = function () {
    context.drawImage(
      this.bulletImage,
      this.x,
      this.y,
      this.width,
      this.height
    );
};

Bullet.prototype.move = function (lanes, laneIndex, enemies) {
    this.laneIndex = laneIndex;
    var OFFSET = 20;
    this.x = lanes[laneIndex] + OFFSET;
    console.log("Moving");
    this.render();
    this.destroy(enemies);

    if(!this.missionComplete){
        this.animId = requestAnimationFrame(function(){
            this.move(lanes, laneIndex, enemies);
        }.bind(this));
    }else {
        cancelAnimationFrame(this.animId);
    }

    this.y -= this.speed;
};

Bullet.prototype.destroy = function(enemies) {
    for(var i=0;i<enemies.length; i++){
        var car = enemies[i];
        if(this.laneIndex == enemies[i].laneIndex) {
            var distance = this.y - (enemies[i].y + enemies[i].height);
            if (distance <= 0 && enemies[i].y < this.y + this.height && this.y > 0) {
              enemies.splice(i,1);
              this.missionComplete=true;
              cancelAnimationFrame(this.animId);
            }      
        }
    }
}
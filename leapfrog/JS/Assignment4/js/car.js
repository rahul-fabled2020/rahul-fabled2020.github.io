function Car(imageSrc, width, height, speed) {
  var DEFAULT_SPEED = 5;
  this.imageLoaded = false;
  this.carImage = new Image();
  this.laneIndex = 0;

  if (typeof speed === "undefined") {
    speed = DEFAULT_SPEED;
  }

  this.x = 0;
  this.y = 0;

  this.speed = speed;
  this.width = width;
  this.height = height;

  if (typeof imageSrc !== "undefined") {
    this.carImage.src = "images/" + imageSrc;
    this.carImage.onload = function(){
        this.imageLoaded= true;
        this.assignDefaultDimension();
    }.bind(this);
  }
}

Car.prototype.render = function () {
  if (this.imageLoaded) {
    context.drawImage(this.carImage, this.x, this.y, this.width, this.height);
  }
};

Car.prototype.assignDefaultDimension = function () {
    
  if (typeof this.width === "undefined") {
    this.width = this.carImage.width;
  }

  if (typeof this.height === "undefined") {
    this.height = this.carImage.height;
  }
};

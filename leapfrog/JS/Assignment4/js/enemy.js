function EnemyCar(imageSrc, width, height, speed) {

    this.super(imageSrc, width, height, speed);
    this.isDestroyed = false;
}
extend(EnemyCar, Car);

EnemyCar.prototype.moveVertically =  function() {
    this.render();
}

EnemyCar.prototype.updatePosition = function(lanes, playerSpeed) {
    this.x = lanes[this.laneIndex]+15;
    this.y += playerSpeed - this.speed;
}

EnemyCar.prototype.render = function() {
    if(this.imageLoaded && !this.isDestroyed){
        context.drawImage(this.carImage, this.x, this.y, this.width, this.height);
    }    
}

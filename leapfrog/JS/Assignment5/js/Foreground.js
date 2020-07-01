function ForeGround(sourceX, sourceY, width, height, x, y, vx) {
    this.super(sourceX, sourceY, width, height, x, y);
    this.vx = vx;
}

extend(ForeGround, Background);

ForeGround.prototype.update = function(gameState) {
    if(gameState.current == GAME) {
        this.x = (this.x - this.vx) % (this.width/2);
    }
}

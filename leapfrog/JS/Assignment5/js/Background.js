function Background(sourceX, sourceY, width, height, x, y) {
    this.sourceX = sourceX;
    this.sourceY = sourceY;
    this.width = width;
    this.height =height;
    this. x = x;
    this.y = y;
}

Background.prototype.render = function(context) {
    context.drawImage(SPRITE, this.sourceX, this.sourceY, this.width, this.height, this.x, this.y, this.width, this.height);
    context.drawImage(SPRITE, this.sourceX, this.sourceY, this.width, this.height, this.x + this.width, this.y, this.width, this.height);
}
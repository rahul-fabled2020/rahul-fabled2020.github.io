function GameState(context) {
    this.current = GET_READY;

    GET_READY_DIMENSION.x = (context.canvas.width - GET_READY_DIMENSION.width)/2
    GAME_OVER_DIMENSION.x = (context.canvas.width - GAME_OVER_DIMENSION.width)/2
}

GameState.prototype.renderGameOver = function(context, state) {
    if(state == OVER) {
        let sX = GAME_OVER_DIMENSION.sourceX;
        let sY = GAME_OVER_DIMENSION.sourceY;
        let w = GAME_OVER_DIMENSION.width;
        let h = GAME_OVER_DIMENSION.height;
        let x = GAME_OVER_DIMENSION.x;
        let y = GAME_OVER_DIMENSION.y;

        context.drawImage(SPRITE, sX, sY, w, h, x, y, w, h);
    }
}

GameState.prototype.renderGameReady = function(context, state) {
    if(state == GET_READY) {
        let sX = GET_READY_DIMENSION.sourceX;
        let sY = GET_READY_DIMENSION.sourceY;
        let w = GET_READY_DIMENSION.width;
        let h = GET_READY_DIMENSION.height;
        let x = GET_READY_DIMENSION.x;
        let y = GET_READY_DIMENSION.y;

        context.drawImage(SPRITE, sX, sY, w, h, x, y, w, h);
    }
}

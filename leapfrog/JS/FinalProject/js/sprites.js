function loadMarioSprite(image) {
        var mario = new SpriteSheet(image, 16, 16);
        mario.define('idle', 276, 44, 16, 16);
        
        return mario;
}

function loadBackgroundSprites(image) {
        var sprites = new SpriteSheet(image, 16, 16);
        sprites.defineTile('ground', 0, 0);
        sprites.defineTile('sky', 3, 23);

        return sprites;
}

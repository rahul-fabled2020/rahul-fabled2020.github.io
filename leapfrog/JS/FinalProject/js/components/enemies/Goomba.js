/**
 * Gooma is the simplest enemy of the game. Goomba doesn't have any power and can be killed easily be bullets or by jumping on it.
 * Gooma is more in number in any stage of the game.
 * @param {Vector} position; (x, y)
 * @param {Sprite} sprite; an object of Sprite class
 * @param {Level} level; an object of sub types of level E.g. 1-1, 1-2
 */
class Goomba extends Enemy {
  constructor(position, sprite, level) {
    super({
      position: position,
      sprite: sprite,
      hitbox: {
        x: 0,
        y: 0,
        width: TILE_SIZE,
        height: TILE_SIZE,
      },
      level: level,
    });
  }

  /**
   * Initiates Goomba's death when Mario jumps on it from the top
   * @param {Mario} player
   * 
   */
  stomp(player) {
    if (this.isDyingCount) return;

    SOUND.stomp.play();
    player.bounce = true;

    //Change the sprite to death sprite
    this.sprite = new Sprite(
      ENEMIES_LEFT,
      new Vector(2 * TILE_SIZE, TILE_SIZE),
      { width: TILE_SIZE, height: TILE_SIZE },
      0
    );

    //No animation while dying
    this.sprite.animationSpeed = 0;
    this.velocity.x = 0;

    //Goomba's death count down
    this.isDyingCount = 10;
  }

  /**
   * Kill Goomba when Mario hits with bullet
   */
  bump() {
    SOUND.kick.play();

    this.sprite = new Sprite(
      ENEMIES_RIGHT,
      new Vector(0, TILE_SIZE),
      { width: TILE_SIZE, height: TILE_SIZE },
      0
    );

    this.isFlipping = true; //Make goomba fall down
    this.position.y -= 1;
    this.velocity = new Vector(0, -2.5);
  }
}

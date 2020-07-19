/**
 * Koopa is the second weakest enemy after Goomba.
 * Koopa doesn't have any weapon.
 * @param {Vector} position
 * @param {Sprite} sprite
 * @param {Level} level
 */
class Koopa extends Enemy {
  constructor(position, sprite, level) {
    super({
      position: position,
      sprite: sprite,
      hitbox: {
        x: 0,
        y: 8,
        width: TILE_SIZE,
        height: TILE_SIZE,
      },
      level: level,
    });
  }

  /**
   * Initiate Koopa's death when Mario jumps on Koopa
   * @param {Mario} player 
   */
  stomp(player) {
    if(this.isDyingCount) return;

    SOUND.stomp.play();
    
    player.bounce = true;

    this.sprite = new Sprite(
      ENEMIES_LEFT,
      new Vector(10*TILE_SIZE, 0),
      { width: TILE_SIZE, height: TILE_SIZE },
      0,
    )

    this.hitbox = {
      x: 2,
      y: 0,
      width: 12,
      height: TILE_SIZE
    }

    this.sprite.animationSpeed = 0;
    this.velocity.x = 0;
    this.isDyingCount = 10;
  }

  /**
   * Kill Koopa when Mario strikes it with bullet
   */
  bump() {
    if(this.isFlipping) return;

    SOUND.kick.play();
    
    this.isFlipping = true;
    
    this.sprite = new Sprite(
      ENEMIES_LEFT,
      new Vector(10*TILE_SIZE, 0),
      { width: TILE_SIZE, height: TILE_SIZE },
      0,
    )

    this.hitbox = {
      x: 2,
      y: 0,
      width: 12,
      height: TILE_SIZE
    }

    this.sprite.animationSpeed = 0;
    this.velocity = new Vector(0, -2.5);   
  }
}

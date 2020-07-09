/**
 * Entity Class
 * @param {Object} configuration
 * The configuration object is of the form {position: value, sprite: value, hitbox: value}
 * Position is the position of the entity; Vector
 * Sprite is the image of the Entity from the SpriteSheet
 * Hitbox is the rectangular box having {x: value, y:value, width:value, height:value}; Used for collision detection
 */
class Entity {
  constructor(configuration) {
    this.velocity = new Vector(0, 0);
    this.acceleration = new Vector(0, 0);

    this.isStanding = true;
    this.position = configuration.position;
    this.sprite = configuration.sprite;
    this.hitbox = configuration.hitbox;
    this.isFacingLeft = false;
  }

/**
 * Renders the Entity on the screen
 * @param {Object} context; HTML Canvas Context 
 * @param {Object} camera; View Port 
 */
  render(context, camera) {

    this.sprite.render(context, this.position, camera);
  }

  /**
   * Detects and Resolves wall collision
   * @param {Object} wall 
   */
  collideWithWall(wall) {
    if (this.position.x > wall.position.x) {
      //Collision from the right
      this.position.x = wall.position.x + wall.hitbox.width - this.hitbox.x;
      this.velocity.x = Math.max(0, this.velocity.x);
      this.acceleration.x = Math.max(0, this.acceleration.x);
    } else {
      this.position.x =
        wall.position.x + wall.hitbox.x - this.hitbox.width - this.hitbox.x;
      this.velocity.x = Math.min(0, this.velocity.x);
      this.acceleration.x = Math.min(0, this.acceleration.x);
    }
  }

  bump() {
      
  }
}

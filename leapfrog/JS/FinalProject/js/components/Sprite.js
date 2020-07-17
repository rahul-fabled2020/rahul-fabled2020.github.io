/**
 * Sprite Class
 * @param {string} imageUrl
 * @param {Vector} position; The position of the sprite in the spritesheet
 * @param {Object} size; {width: value, height:value} of the sprite in the spritesheet
 * @param {number} animationSpeed; no negative number indicating animation speed
 * @param {Array} animationFrames; Consecutive sprite indices in a row of SpriteSheet to be displayed per frame
 */
class Sprite {
  constructor(imageUrl, position, size, animationSpeed, animationFrames) {
    this.position = position;
    this.size = size;
    this.animationSpeed = animationSpeed;
    this.imageUrl = imageUrl;
    this.animationFrames = animationFrames;

    this.animationFrameCounter = 0;
  }

  /**
   * Updates the animationFrameIndex according to the animationSpeed and time passed in the game
   * @param {number} dt; (currentTime - previousTime)
   * @param {number} gameTime; total Elapsed time in the game
   */
  update(dt, gameTime) {
    if (gameTime && gameTime == this.previousUpdateTime) {
      return;
    }
      this.animationFrameCounter += this.animationSpeed * dt;

    if (gameTime) {
      this.previousUpdateTime = gameTime;
    }
  }

  /**
   * Sets the animationFrameIndex
   * @param {number} frame; animationFrameIndex
   */
  setAnimationFrame(frame) {
    this.animationFrameCounter = frame;
  }

  /**
   *
   * @param {Object} context; HTML Canvas context
   * @param {Vector} entityPosition
   * @param {Object} camera; ViewPort
   */
  render(context, entityPosition, camera) {
    let animationFrameIndex;

    if (this.animationSpeed > 0) {
      let numberOfFrames = this.animationFrames.length;
      let index = Math.floor(this.animationFrameCounter);

      animationFrameIndex = this.animationFrames[index % numberOfFrames];
    } else {
      animationFrameIndex = 0;
    }

    let x = this.position.x;
    let y = this.position.y;
    let imageUrl = this.imageUrl;
    let image = Game.imageLoader.getImage(imageUrl);

    x += animationFrameIndex * this.size.width;

    context.drawImage(
      image,
      x,
      y,
      this.size.width,
      this.size.height,
      Math.round(entityPosition.x - camera.x),
      Math.round(entityPosition.y - camera.y),
      this.size.width,
      this.size.height
    );
    context.strokeRect(
      Math.round(entityPosition.x - camera.x),
      Math.round(entityPosition.y - camera.y),
      this.size.width,
      this.size.height
    );
  }
}

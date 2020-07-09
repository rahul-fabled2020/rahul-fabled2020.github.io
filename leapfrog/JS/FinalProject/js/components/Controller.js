/**
 * Controller Class
 * Controller controlls the keyboard input and keeps track of Pressed Keys
 * pressedKeys: object {key: value} key is the name of the pressed key and value is the boolean value which indicates whether the key is held or released
 */
class Controller {
  constructor() {
    this.pressedKeys = {};
  }

  /**
   * Puts the key pressed from the keyboard into the pressedKeys object
   * @param {object} e; Key Event
   * @param {boolean} isActive
   */
  assignKey(e, isActive) {
    var keyCode = e.keyCode;
    var key;

    switch (keyCode) {
      case 32: //SPACE
        key = "JUMP";
        break;

      case 37: //LEFT_ARROW
        key = "LEFT";
        break;

      case 38: //UP_ARROW
        key = "UP";
        break;

      case 39: //RIGHT_ARROW
        key = "RIGHT";
        break;

      case 40: //DOWN_ARROW
        key = "DOWN";
        break;

      case 65: //A
        key = "LEFT";
        break;

      case 68: //D
        key = "RIGHT";
        break;

      case 83: //S
        key = "DOWN";
        break;

      case 87: //W
        key = "UP";
        break;

      case 88: //X
        key = "JUMP";
        break;

      case 90: //Z
        key = "RUN";
        break;

      default:
        //Other Keys
        key = String.fromCharCode(keyCode);
    }

    this.pressedKeys[key] = isActive;
    console.log(this.pressedKeys);
  }

  /**
   * Fetches the state of the given key name
   * @param {string} keyPressed
   * @return {boolean} value of pressedKeys for the given key name
   */
  isDown(keyPressed) {
    return this.pressedKeys[keyPressed.toUpperCase()];
  }

  /**
   * Clears all the keys pressed required for the game, i.e. assigns key State to Not Pressed.
   * true means key is currently held
   * false means the key is released
   */
  reset() {
    this.pressedKeys["RUN"] = false;
    this.pressedKeys["LEFT"] = false;
    this.pressedKeys["RIGHT"] = false;
    this.pressedKeys["DOWN"] = false;
    this.pressedKeys["JUMP"] = false;
  }
}

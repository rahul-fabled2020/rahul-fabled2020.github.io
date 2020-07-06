class Controller {
  constructor() {
    this.pressedKeys = {};
  }

  assignKey(e, isActive) {
    var keyCode = e.keyCode;
    var key;

    switch (keyCode) {
      case 32:
        // key = "SPACE";
        key = "JUMP";
        break;

      case 37:
        key = "LEFT";
        break;

      case 38:
        key = "UP";
        break;

      case 39:
        key = "RIGHT";
        break;

      case 40:
        key = "DOWN";
        break;

      case 88:
        key = "JUMP";
        break;

      case 90:
        key = "RUN";
        break;

      default:
        key = String.fromCharCode(keyCode);
    }

    this.pressedKeys[key] = isActive;
    console.log(this.pressedKeys)
  }

  isDown(keyPressed) {

    return this.pressedKeys[keyPressed.toUpperCase()];
  }

  reset() {
    this.pressedKeys['RUN'] = false;
    this.pressedKeys['LEFT'] = false;
    this.pressedKeys['RIGHT'] = false;
    this.pressedKeys['DOWN'] = false;
    this.pressedKeys['JUMP'] = false;
  }
}

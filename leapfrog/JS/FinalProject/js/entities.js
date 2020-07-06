function createMario(image) {
  var sprite = loadMarioSprite(image);
  var mario = new Entity();

  mario.pos = new Vector(64, 178);
  mario.vel = new Vector(5, 5);
  mario.acc = new Vector(0, 0);
  mario.moveAcc = 0;
  mario.runHeld = false;
  mario.standing = true;
  mario.power = 0;

  mario.update = function (dt, gravity) {
    this.pos.x += this.vel.x * dt;
    this.pos.y += this.vel.y * dt;
    console.log(this.vel.x);
    this.vel.x *= this.acc.x;
    // this.vel.y *= friction;
    this.vel.y += gravity * dt;

    if (this.pos.y >= 178) {
      this.pos.y = 178;
    }

    if(this.pos.y < 0){
      this.pos.y =0;
    }

    if (this.pos.x <0) {
      this.pos.x = 0;
    }
  };

  mario.draw = function (context) {
    sprite.draw("idle", context, this.pos.x, this.pos.y);
  };

  mario.run = function () {
    this.maxSpeed = 2.5;

    console.log("Running");
    this.runHeld = true;
  };

  mario.noRun = function () {
    this.maxSpeed = 1.5;
    this.moveAcc = 0.9;
    this.runHeld = false;
    console.log("Not Running");
  };

  mario.moveRight = function () {
    console.log("Moving right");
    this.vel.x +=50;
  };

  mario.moveLeft = function () {
    console.log("moving left");
    this.vel.x -=50;
  };

  mario.noWalk = function () {
    console.log("Not walking");
    this.maxSpeed = 0;
  };

  mario.crouch = function () {

  };

  mario.noCrouch = function () {
    this.crouching = false;
  };

  mario.jump = function () {
    this.vel.y=-100;
    console.log("Jumping");
  };

  mario.noJump = function () {
    this.canJump = true;
    console.log("Not jumping")

  };

  return mario;
}

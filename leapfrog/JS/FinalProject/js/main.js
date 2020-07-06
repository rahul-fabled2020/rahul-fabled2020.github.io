class Game {
  constructor(canvasId) {
    var canvasId = canvasId || "mario";
    this.gravity = 200;
    this.gameTime = 0;
    this.previousFrameTime = 0;

    this.canvas = document.getElementById(canvasId);
    this.context = this.canvas.getContext("2d");
    this.context.scale(2, 2);

    this.comp = new Compositor();
    this.controller = new Controller();
    this.imageManager = new ImageManager();

    this.imageManager.load(
      {
        characters: "images/characters.gif",
        tiles: "images/tiles.png",
      },
      this.onDone.bind(this),
      this.onProgress
    );
  }

  init() {
    console.log("In init");
    this.mario = createMario(this.imageManager.getImage("characters"));
    this.backgroundSprites = loadBackgroundSprites(
      this.imageManager.getImage("tiles")
    );

    loadLevel("1-1").then((level) => {
      this.comp.layers.push(
        createBackgroundLayer(level.backgrounds, this.backgroundSprites)
      );

      this.comp.layers.push(createSpriteLayer(this.mario));

      this.gameLoop(0);
    });
  }

  onProgress(loaded, total, key, path, success) {
    if (success) {
      console.log("Loaded " + loaded + " of " + total);
    } else {
      console.log("Error: Could not load " + path);
    }
  }

  onDone() {
    console.log("All images are loaded");
    this.init();
  }

  update(dt) {
    this.mario.update(dt, this.gravity);
  }

  handleKeyDownUp() {
    if (this.controller.isDown("RUN")) {
      this.mario.run();
    } else {
      this.mario.noRun();
    }

    if (this.controller.isDown("JUMP")) {
      this.mario.jump();
    } else {
      //we need this to handle the timing for how long you hold it
      this.mario.noJump();
    }

    if (this.controller.isDown("DOWN")) {
      this.mario.crouch();
    } else {
      this.mario.noCrouch();
    }

    if (this.controller.isDown("LEFT")) {
      // 'd' or left arrow
      this.mario.moveLeft();
    } else if (this.controller.isDown("RIGHT")) {
      // 'k' or right arrow
      this.mario.moveRight();
    } else {
      this.mario.noWalk();
    }
  }

  gameLoop(time) {
    var dt = (time - this.previousFrameTime) * ONE_THOUSANDTH_SECOND;
    this.gameTime += dt;

    if (dt > 1.2 / FPS) dt = 0;

    if (dt != 0) {
      this.handleKeyDownUp();
      this.comp.draw(this.context);
      this.update(dt);
    }

    requestAnimationFrame(this.gameLoop.bind(this));
    this.previousFrameTime = time;
  }
}

var g = new Game();

document.addEventListener("keydown", function (e) {
  g.controller.assignKey(e, true);
});

document.addEventListener("keyup", function (e) {
  g.controller.assignKey(e, false);
});

window.addEventListener("blur", function () {
  g.controller.pressedKeys = {};
});

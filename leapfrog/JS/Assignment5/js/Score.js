function Score() {
  this.best = parseInt(localStorage.getItem("best")) || 0;
  this.value = 0;
}

Score.prototype.render = function (context, state) {
  context.fillStyle = "#fff";
  context.strokeStyle = "#000";

  if (state == GAME) {
    context.lineWidth = 2;
    context.font = "35px sans-serif";
    context.fillText(this.value, context.canvas.width / 2, 50);
    context.strokeText(this.value, context.canvas.width / 2, 50);
  } else if(state == OVER) {
      //Score Value
      context.font = "25px sans-serif";
      context.fillText(this.value, 225, 186);
      context.strokeText(this.value, 225, 186);

      //Best Score
      context.fillText(this.best, 225, 228);
      context.strokeText(this.best, 225, 228);
  }
};

Score.prototype.reset = function() {
    this.value = 0;
}


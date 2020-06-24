// Point class
function Point(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;

  this.getX = function () {
    return this.x;
  };

  this.getY = function () {
    return this.y;
  };

  this.getRadius = function () {
    return this.radius;
  };

  this.getColor = function () {
    return this.color;
  };

  this.setX = function (x) {
    this.x = x;
  };

  this.setY = function (y) {
    this.y = y;
  };

  this.setRadius = function (radius) {
    this.radius = radius;
  };

  this.setColor = function (color) {
    this.color = color;
  };
}

// Container class
function Container(width, height, points) {
  self = this;

  // Properties
  this.height = height;
  this.width = width;
  this.points = points;

  // Methods
  this.getHeight = function () {
    return this.height;
  };

  this.getWidth = function () {
    return this.width;
  };

  this.setHeight = function () {
    this.height = height;
  };

  this.setWidth = function () {
    this.width = width;
  };

  renderPoint = function (point, container) {
    coordinate = document.createElement("div");
    coordinate.style.top = point.y + "px";
    coordinate.style.left = point.x + "px";
    coordinate.style.height = 2 * point.radius + "px";
    coordinate.style.width = 2 * point.radius + "px";
    coordinate.style.borderRadius = "50%";
    coordinate.style.position = "absolute";
    coordinate.style.backgroundColor = point.color;

    container.appendChild(coordinate);
  };

  this.render = function (x, y) {
    var box = document.createElement("div");
    box.style.height = this.height + "px";
    box.style.width = this.width + "px";
    box.style.border = "1px solid black";
    box.style.position = "absolute";
    box.style.top = (y || 0) + "px";
    box.style.left = (x || 0) + "px";
    box.style.overflow = "hidden";

    this.points.forEach(function (point) {
      renderPoint(point, box);
    });

    document.body.appendChild(box);
  };
}

points = [];
for (let i = 0; i < 100; i++) {
  x = Math.random() * 600;
  y = Math.random() * 600;
  red = Math.random() * 255;
  green = Math.random() * 255;
  blue = Math.random() * 255;
  color = "rgb(" + red + "," + green + "," + blue + ")";
  point = new Point(x, y, 5, color);

  points.push(point);
}

container = new Container(600, 600, points);
container.render(50, 50);

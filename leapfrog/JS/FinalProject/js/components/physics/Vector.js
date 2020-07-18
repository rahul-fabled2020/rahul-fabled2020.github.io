function Vector(x, y) {
  this.x = x;
  this.y = y;
}

//Public Methods
Vector.prototype = {
  magnitudeSquared: function () {
    return this.x * this.x + this.y * this.y;
  },

  magnitude: function () {
    return Math.sqrt(this.magnitudeSquared());
  },

  direction: function () {
    return Math.atan2(this.y, this.x); //in radians
  },

  copy: function () {
    return new Vector(this.x, this.y);
  },

  negate: function () {
    this.x = -this.x;
    this.y = -this.y;
  },

  normalize: function () {
    var magnitude = this.magnitude();
    if (magnitude > 0) {
      this.x /= magnitude;
      this.y /= magnitude;
    }

    return this.magnitude();
  },

  add: function (vector) {
    return new Vector(this.x + vector.x, this.y + vector.y);
  },

  incrementBy: function (vector) {
    this.x += vector.x;
    this.y += vector.y;
  },

  subtract: function (vector) {
    return new Vector(this.x - vector.x, this.y - vector.y);
  },

  decrementBy: function (vector) {
    this.x -= vector.x;
    this.y -= vector.y;
  },

  scaleBy: function (k) {
    this.x *= k;
    this.y *= k;
  },

  dotProduct: function (vector) {
    return this.x * vector.x + this.y * vector.y;
  },

  multiply: function (k) {
    return new Vector(this.x * k, this.y * k);
  },

  addScaled: function (vector, k) {
    return this.add(vector.multiply(k));
  },

  projection: function (vector) {
    var a = this;
    var b = vector;
    var proj;

    if (a.magnitude() == 0 || b.magnitude() == 0) {
      proj = 0;
    } else {
      proj = a.dotProduct(b) / b.magnitude();
    }

    return proj;
  },

  parallelVector: function (magnitude) {
    var clone = this.copy();
    clone.normalize();
    
    return clone.multiply(magnitude);
  },

  project: function (vector) {
    return vector.parallelVector(this.projection(vector));
  },
};

//Static Methods
Vector.distance = function (vector1, vector2) {
  return vector1.subtract(vector2).magnitude();
};

Vector.angleBetween = function (vector1, vector2) {
  return (
    vector1.dotProduct(vector2) / (vector1.magnitude() * vector2.magnitude())
  );
};

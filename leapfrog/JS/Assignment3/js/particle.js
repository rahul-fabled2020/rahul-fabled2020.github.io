function Particle(mass) {
  if (typeof mass === "undefined") mass = 1;

  this.mass = mass;
  this.x = 0;
  this.y = 0;
  this.vx = 0;
  this.vy = 0;
}

Particle.prototype = {
  get position() {

    return new Vector(this.x, this.y);
  },

  set position(pos) {
    this.x = pos.x;
    this.y = pos.y;
  },

  get velocity() {
      
    return new Vector(this.vx, this.vy);
  },

  set velocity(velo) {
    this.vx = velo.x;
    this.vy = velo.y;
  },
};

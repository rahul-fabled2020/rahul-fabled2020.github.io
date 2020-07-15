class SHM {
    constructor(position, velocity, distance) {
        this.initialPosition = position.copy();
        this.position = position;
        this.velocity = velocity;
        this.distance = distance;
        this.radians = 0;
    }

    update(dt) {
        this.position.x = this.initialPosition.x + Math.sin(this.radians)*this.distance;
        this.radians+=this.velocity.x*dt;

        if(this.radians >= 2* Math.PI) this.radians = 0;
    }
}
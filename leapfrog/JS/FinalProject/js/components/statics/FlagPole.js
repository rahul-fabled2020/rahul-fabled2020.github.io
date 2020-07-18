class FlagPole {
    constructor(position, sprite) {
        this.position = position;
        this.sprite = sprite;
    }

    render(context, camera) {
        this.sprite.render(context, this.position, camera);
    }
}
/**
 * Flagpole is found at the end of the first level
 */
class FlagPole {
    constructor(position, sprite) {
        this.position = position;
        this.sprite = sprite;
    }

    /**
     * Updates the flag pole
     * @param {Object} context 
     * @param {Camera} camera 
     */
    render(context, camera) {
        this.sprite.render(context, this.position, camera);
    }
}
export default class Poster {
    constructor(scene) {
        this.scene = scene;
        this.img = this.scene.add.image(-1000, -1000, 'mastermindPoster');
    }

    display() {
        this.img.setPosition(140, 250);
    }

    hide() {
        this.img.setPosition(-1000, -1000);
    }
}

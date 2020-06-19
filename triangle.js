export default class Triangle {
    constructor(scene) {
        this.scene = scene;
        this.img = this.scene.add.image(-1000, -1000, 'triangle');
        this.img.displayHeight = 200;
        this.img.displayWidth = 300;
    }

    display() {
        this.img.setPosition(240, 200);
    }

    hide() {
        this.img.setPosition(-1000, -1000);
    }
}

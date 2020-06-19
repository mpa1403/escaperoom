import {identifiers} from './enums.js'

export default class Door {
    constructor(scene) {
        this.scene = scene;
        this.img = this.scene.add.image(-1000, -1000, 'door').setName(identifiers.DOOR);
        this.img.setInteractive(Phaser.Geom.Rectangle());
        this.img.displayHeight = 375;
        this.img.displayWidth = 200;
        this.open = false;
    }

    openUp() {
        this.img.setTexture('doorOpen');
        this.open = true;
    }

    display() {
        this.img.setPosition(650, 295);
    }

    hide() {
        this.img.setPosition(-1000, -1000);
    }
}
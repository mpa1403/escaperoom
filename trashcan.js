import {identifiers, noteTypes} from './enums.js';
import {Note} from './inventory.js';

export default class Trashcan {
    constructor(scene) {
        this.scene = scene;
        this.img = scene.add.image(-1000, -1000, 'trashcan').setName(identifiers.TRASHCAN);
        this.img.setInteractive(Phaser.Geom.Rectangle());
        this.img.displayHeight = 100;
        this.img.displayWidth = 75;

        this.empty = false;
        this.contents = new Note(scene, 'triangleNote', noteTypes.TRIANGLE);
    }

    takeOutTrash() {
        if (!this.empty) {
            this.empty = true;
            return this.contents;
        }
    }

    display() {
        this.img.setPosition(125, 450);
    }

    hide() {
        this.img.setPosition(-1000, -1000);
    }
}
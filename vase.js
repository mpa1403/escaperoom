import {identifiers} from './enums.js';
import {Key} from './inventory.js';

export default class Vase {
    constructor(scene) {
        this.scene = scene;
        this.img = this.scene.add.image(-1000, -1000, 'keyInVase').setName(identifiers.VASE);
        this.img.setInteractive(Phaser.Geom.Rectangle());
        this.img.displayHeight = 75;
        this.img.displayWidth = 40;
        this.containsKey = true;
        this.isFilled = false;
    }

    display() {
        this.img.setPosition(400, 160);
    }

    floatKey() {
        this.isFilled = true;
        this.img.setTexture('keyInVaseWater');
    }

    takeKey() {
        this.containsKey = false;
        this.img.setTexture('vaseWater');
        return new Key(this.scene);
    }

    hide() {
        this.img.setPosition(-1000, -1000);
    }
}
import {identifiers, noteTypes} from './enums.js';
import {Note} from './inventory.js';

export default class Vent {
    constructor(scene) {
        this.scene = scene;
        this.open = false;

        this.img = scene.add.image(-1000, -1000, 'vent').setName(identifiers.VENT);
        this.img.setInteractive(Phaser.Geom.Rectangle());
        this.img.displayHeight = 75;
        this.img.displayWidth = 125;
        
        this.contents = new Note(scene, 'sudokuNote', noteTypes.SUDOKU);
    }

    openUp() {
        if (!this.open) {
            this.img = this.img.setTexture('ventOpen');
            this.img.setPosition(690, 430)
            this.open = true;
            return this.contents;
        }
    }

    display() {
        if (this.open) {
            this.img.setPosition(690, 430);
        } else {
            this.img.setPosition(690, 420);
        }
    }

    hide() {
        this.img.setPosition(-1000, -1000);
    }
}
import {identifiers, noteTypes} from './enums.js';
import {Screwdriver, Note} from './inventory.js';

export default class Desk {
    constructor(scene) {
        this.scene = scene;
        this.img = scene.add.image(-1000, -1000, 'deskClosed');
        let topDrawerContents = [new Screwdriver(this.scene), new Note(this.scene, 'mastermindNote', noteTypes.MASTERMIND)];
        this.topDrawer = new Drawer(scene, identifiers.TOPDRAWER, topDrawerContents);
        this.bottomDrawer = new Drawer(scene, identifiers.BOTTOMDRAWER, new Note(this.scene, 'sudokuNote', noteTypes.SUDOKU));
        this.img.displayHeight = 190;
        this.img.displayWidth = 400;
    }

    display() {
        this.img.setPosition(400, 420);
        if (!this.topDrawer.open && !this.bottomDrawer.open) {
            this.topDrawer.display(282, 422);
            this.bottomDrawer.display(282, 485);
        } else if (!this.topDrawer.open && this.bottomDrawer.open) {
            this.topDrawer.display(282, 422);
        } else if (this.topDrawer.open && !this.bottomDrawer.open) {
            this.bottomDrawer.display(282, 488);
        }
    }

    openTopDrawer() {
        if (this.topDrawer.open) {
            return;
        }

        if (this.bottomDrawer.open) {
            this.img = this.img.setTexture('deskOpen2');
            this.img.setPosition(400, 429)
        } else {
            this.img = this.img.setTexture('deskOpen1');
            this.img.displayHeight = 190;
            this.bottomDrawer.resize(150, 60);
            this.bottomDrawer.display(282, 488);
        }

        let contents = this.topDrawer.openUp();
        return contents;
    }

    openBottomDrawer() {
        if (this.bottomDrawer.open) {
            return;
        }

        if (this.topDrawer.open) {
            this.img = this.img.setTexture('deskOpen2');
            this.img.setPosition(400, 429)
        } else {
            this.img = this.img.setTexture('deskOpen3');
            this.img.displayHeight = 190;
            this.img.displayWidth = 400;
        }

        let contents = this.bottomDrawer.openUp();
        return contents;
    }

    hide() {
        this.img.setPosition(-1000, -1000);
        this.topDrawer.display(-1000, -1000);
        this.bottomDrawer.display(-1000, -1000);
    }
}

class Drawer {
    constructor(scene, identifier, contents) {
        this.scene = scene;
        this.open = false;
        this.contents = contents;
        this.locked = identifier == identifiers.BOTTOMDRAWER;
        this.img = this.scene.add.image(-1000, -1000, 'deskDrawer').setName(identifier);
        this.img.setInteractive(Phaser.Geom.Rectangle());
        this.img.displayHeight = 65;
        this.img.displayWidth = 150;
    }

    resize(w,h) {
        this.img.displayHeight = h;
        this.img.displaywidth = w;
    }

    display(x, y) {
        this.img.setPosition(x, y);
    }

    hide() {
        this.img.setPosition(-1000, -1000);
    }

    openUp() {
        this.open = true;
        this.hide();
        return this.contents;
    }
}
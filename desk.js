import {identifiers, noteTypes} from './enums.js';
import {Screwdriver, Note} from './inventory.js';

export default class Desk {
    constructor(scene) {
        this.scene = scene;
        this.img = scene.add.image(-1000, -1000, 'deskClosed');

        let topDrawerContents = [new Screwdriver(this.scene), new Note(this.scene, 'mastermindNote', noteTypes.MASTERMIND)];
        this.topDrawer = new Drawer(scene, identifiers.TOPDRAWER, topDrawerContents);

        let bottomDrawerContents = new Note(this.scene, 'bookNote', noteTypes.BOOK);
        this.bottomDrawer = new Drawer(scene, identifiers.BOTTOMDRAWER, bottomDrawerContents);

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

    openDrawer(drawerObj) {
        let isTop = drawerObj.name == identifiers.TOPDRAWER
        let clickedDrawer = isTop ? this.topDrawer : this.bottomDrawer;
        let otherDrawer = isTop ? this.bottomDrawer : this.topDrawer;

        if (clickedDrawer.open) {
            return;
        }

        if (otherDrawer.open) {
            this.img = this.img.setTexture('deskOpen2');
            this.img.setPosition(400, 429)
        } else if (isTop) {
            this.img = this.img.setTexture('deskOpen1');
            this.img.displayHeight = 190;
            this.bottomDrawer.resize(150, 60);
            this.bottomDrawer.display(282, 488);
        } else {
            this.img = this.img.setTexture('deskOpen3');
            this.img.displayHeight = 190;
            this.img.displayWidth = 400;
        }

        let contents = clickedDrawer.openUp();
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
        this.name = this.img.name;
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
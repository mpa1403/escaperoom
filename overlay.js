import {identifiers} from './enums.js';

export class OverlayStart {
    constructor(scene) {
        this.scene = scene;

        this.img = this.scene.add.image(-1000, -1000, 'startEndBackground');
        this.img.setDepth(1000);

        this.startButton = this.scene.add.image(-1000, -1000, 'startButton').setName(identifiers.STARTBUTTON);
        this.startButton.setInteractive(Phaser.Geom.Rectangle());
        this.startButton.setDepth(2000);

        let openingText = "You find yourself in a room\n\nthat looks like it was made\n\nin the Mac version of\n\nMicrosoft Paint.\n\nCan you escape?"
        this.text = this.scene.add.text(-1000, -1000, openingText, { color: '#fff', fontSize: 38, align: 'center' });
        this.text.setDepth(2000);
    }

    display() {
        this.img.setPosition(400, 300);
        this.text.setPosition(90, 30)
        this.startButton.setPosition(400, 500);
    }

    hide() {
        this.startButton.setPosition(-1000, -1000);
        this.text.setPosition(-1000, -1000);
        this.img.setPosition(-1000, -1000);
    }
}

export class OverlayEnd {
    constructor(scene) {
        this.scene = scene;
        this.img = this.scene.add.image(-1000, -1000, 'startEndBackground');
        this.img.setDepth(1000);
        this.text = this.scene.add.text(-1000, -1000, "", { color: '#fff', fontSize: 38, align: 'center' });
        this.text.setDepth(2000);
    }

    display() {
        this.img.setPosition(400, 300);
        this.text.setPosition(50, 50);
        this.text.setText("You escaped the room!!!\n\nGreat job!\n\n(Sy was too lazy to implement\n\na 'Play Again' button\n\nso refresh the page if you\n\nwant another go at it)")
    }
}
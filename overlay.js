import {identifiers, overlays} from './enums.js';

export default class Overlay {
    constructor(scene, type) {
        this.scene = scene;
        this.type = type;

        this.img = this.scene.add.image(-1000, -1000, 'startEndBackground');
        this.img.setDepth(1000);

        let text;
        if (this.type === overlays.START) {
            text = "You find yourself in a room\n\nthat looks like it was made\n\nin the Mac version of\n\nMicrosoft Paint.\n\nCan you escape?";
            this.startButton = this.scene.add.image(-1000, -1000, 'startButton').setName(identifiers.STARTBUTTON);
            this.startButton.setInteractive(Phaser.Geom.Rectangle());
            this.startButton.setDepth(2000);
        } else {
            text = "You escaped the room!!!\n\nGreat job!\n\n(Sy was too lazy to implement\n\na 'Play Again' button\n\nso refresh the page if you\n\nwant another go at it)";
            this.bottomText = this.scene.add.text(-1000, -1000, "Also happy birthday Len :)", { color: '#fff', fontSize: 20, align: 'center' });
            this.bottomText.setDepth(2000);
        }

        this.text = this.scene.add.text(-1000, -1000, text, { color: '#fff', fontSize: 38, align: 'center' });
        this.text.setDepth(2000);
    }

    display() {
        this.img.setPosition(400, 300);
        if (this.type === overlays.START) {
            this.text.setPosition(90, 30)
            this.startButton.setPosition(400, 500);
        } else {
            this.text.setPosition(50, 50);
            this.bottomText.setPosition(250, 540);
        }
    }

    hide() {
        this.startButton.setPosition(-1000, -1000);
        this.text.setPosition(-1000, -1000);
        this.img.setPosition(-1000, -1000);
    }
}
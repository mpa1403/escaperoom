import {identifiers} from './enums.js';

export default class MastermindLock {
    constructor(scene) {
        this.scene = scene;
        this.editable = true;
        this.img = this.scene.add.image(-1000, -1000, 'mastermindLock');

        this.colorChoices = [0xfd92f6, 0x7315a2, 0xffffff, 0x000000];
        this.colorVals = {};
        this.colors = [];
        this.colorAnswers = [0x7315a2, 0xfd92f6, 0x000000, 0xffffff]

        for (let i = 0; i < 4; i++) {
            let color = this.scene.add.image(-1000, -1000, 'mastermindColor').setName(identifiers.MASTERMIND + i);
            color.setInteractive(Phaser.Geom.Rectangle());
            color.displayHeight = 60;
            color.displayWidth = 40;
            color.setTint(this.colorChoices[0]);
            this.colorVals[color.name] = this.colorChoices[0];
            this.colors.push(color);
        }
        
        this.img.displayHeight = 120;
        this.img.displayWidth = 200;
    }

    display() {
        this.img.setPosition(125, 130);

        this.colors[0].setPosition(58, 127);
        this.colors[1].setPosition(103, 127);
        this.colors[2].setPosition(148, 127);
        this.colors[3].setPosition(193, 127);
    }

    changeColor(color) {
        if (!this.editable) {
            return;
        }

        let index = this.colorChoices.indexOf(this.colorVals[color.name]);
        index += 1;
        if (index > 3) {
            index = 0;
        }

        this.colorVals[color.name] = this.colorChoices[index];
        color.setTint(this.colorChoices[index]);
    }

    checkWin() {
        let correct = true;

        for (let i = 0; i < this.colors.length; i++) {
            if (this.colorVals[this.colors[i].name] != this.colorAnswers[i]) {
                return false;
            }
        }

        this.editable = false;
        return correct;
    }

    hide() {
        this.img.setPosition(-1000, -1000);
        for (let color of this.colors) {
            color.setPosition(-1000, -1000);
        }
    }
}
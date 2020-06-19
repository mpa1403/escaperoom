import {identifiers} from './enums.js'

export default class FinalLock {
    constructor(scene) {
        this.scene = scene;
        this.img = this.scene.add.image(-1000, -1000, 'finalLock');
        this.img.displayHeight = 75;
        this.img.displayWidth = 200;
        this.symbolValues = {};
        this.texts = {};
        this.editable = true;
        this.answer = {
            "!" : 7,
            "U" : 5,
            "^" : 3,
            "$" : 8
        };

        for (let symbol of ["!", "U", "^", "$"]) {
            let text = this.scene.add.text(-1000, -1000, 0, {color: '#000', fontSize: 45}).setName(identifiers.FINALLOCK + symbol);
            text.setInteractive();
            this.symbolValues[text.name] = 0;
            this.texts[symbol] = text;
        }
    }

    display() {
        this.img.setPosition(650, 80);
        this.texts["!"].setPosition(565, 68);
        this.texts["U"].setPosition(613, 68);
        this.texts["^"].setPosition(661, 68);
        this.texts["$"].setPosition(709, 68);
    }

    increment(text) {
        if (!this.editable) {
            return;
        }
        this.symbolValues[text.name] += 1;
        if (this.symbolValues[text.name] > 9) {
            this.symbolValues[text.name] = 0;
        }
        text.setText(this.symbolValues[text.name]);
    }

    checkWin() {
        let correct = true;
        for (let symbol in this.texts) {
            if (this.symbolValues[this.texts[symbol].name] != this.answer[symbol]) {
                correct = false;
            }
        }
        if (correct) {
            this.editable = false;
            return true;
        } else {
            return false;
        }
    }

    hide() {
        this.img.setPosition(-1000, -1000);
        for (let symbol in this.texts) {
            this.texts[symbol].setPosition(-1000, -1000);
        }
    }
}

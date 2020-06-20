import {identifiers} from './enums.js';

export default class ColorLock {
    constructor(scene) {
        this.scene = scene;
        this.texts = {};
        this.numbers = {};
        this.editable = true;
        
        this.img = this.scene.add.image(-1000, -1000, 'colorLock');
        this.img.displayHeight = 200;
        this.img.displayWidth = 250;

        this.answer = {
            "red": 4,
            "blue": 7,
            "green": 9,
            "yellow": 6
        };
        
        for (let color of ["red", "blue", "green", "yellow"]) {
            let text = this.scene.add.text(-1000, -1000, 0, {color: '#fff', fontSize: 72}).setName(identifiers.COLORLOCK + color);
            text.setInteractive();
            this.numbers[text.name] = 0;
            this.texts[color] = text;
        }
    }

    display() {
        let x = 600;
        let y = 175;

        this.img.setPosition(x, y);

        this.texts.red.setPosition(x - 95, y - 55);
        this.texts.blue.setPosition(x - 45, y - 55);
        this.texts.green.setPosition(x + 5, y - 55);
        this.texts.yellow.setPosition(x + 55, y - 55);
    }

    increment(text) {
        if (!this.editable) {
            return;
        }

        this.numbers[text.name] += 1;
        if (this.numbers[text.name] > 9) {
            this.numbers[text.name] = 0;
        }

        text.setText(this.numbers[text.name]);
    }

    checkWin() {
        let correct = true;

        for (let color in this.texts) {
            if (this.numbers[this.texts[color].name] != this.answer[color]) {
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
        for (let color in this.texts) {
            this.texts[color].setPosition(-1000, -1000);
        }
    }
}
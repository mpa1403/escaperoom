import {identifiers} from './enums.js'

export default class LetterLock {
    constructor(scene) {
        this.scene = scene;
        
        this.img = this.scene.add.image(-1000, -1000, 'letterLock');
        this.img.displayHeight = 125;
        this.img.displayWidth = 200;
        
        this.letterValues = {};
        this.texts = {};
        this.editable = true;

        this.answer = {
            "a": 4,
            "b": 3, 
            "c": 5,
            "d": 5
        }
        
        for (let letter of ["a", "b", "c", "d"]) {
            let text = this.scene.add.text(-1000, -1000, 0, {color: '#000', fontSize: 65}).setName(identifiers.LETTERLOCK + letter);
            text.setInteractive();
            this.letterValues[text.name] = 0;
            this.texts[letter] = text;
        }
    }

    display() {
        this.img.setPosition(410, 220);

        this.texts.a.setPosition(334, 175);
        this.texts.b.setPosition(372, 175);
        this.texts.c.setPosition(410, 175);
        this.texts.d.setPosition(448, 175);
    }

    increment(text) {
        if (!this.editable) {
            return;
        }

        this.letterValues[text.name] += 1;
        if (this.letterValues[text.name] > 9) {
            this.letterValues[text.name] = 0;
        }
        
        text.setText(this.letterValues[text.name]);
    }

    hide() {
        this.img.setPosition(-1000, -1000);
        for (let letter in this.texts) {
            this.texts[letter].setPosition(-1000, -1000);
        }
    }

    checkWin() {
        let correct = true;
        for (let letter in this.texts) {
            if (this.letterValues[this.texts[letter].name] != this.answer[letter]) {
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
}

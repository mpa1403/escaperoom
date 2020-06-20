export default class Screen {
    constructor(scene, placeholder) {
        this.scene = scene;
        this.placeholder = placeholder;
        this.img = this.scene.add.image(-1000, -1000, 'screen');
        this.text = this.scene.add.text(-1000, -1000, this.placeholder, { color: '#ff0000', align: 'center' });
        this.img.displayWidth = 140;
        this.img.displayHeight = 120;
    }

    display(x, y, textX, textY) {
        this.img.setPosition(x, y);
        this.text.setPosition(textX, textY);
    }

    setText(color, text, textX, textY) {
        this.text.setColor(color);
        this.text.setText(text);
        this.text.setPosition(textX, textY);
    }

    hide() {
        this.img.setPosition(-1000, -1000);
        this.text.setPosition(-1000, -1000);
    }
}
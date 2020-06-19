export default class TopText {
    constructor(scene) {
        this.scene = scene;
        this.text = this.scene.add.text(400, 20, "", { color: '#fff', align: 'center' });
        this.text.setOrigin(0.5);
        this.isHover = false;
    }

    setText(text) {
        this.text.setText(text);
    }

    clearText() {
        this.text.setText("");
        this.isHover = false;
    }

    setHoverText(text) {
        this.text.setText(text);
        this.isHover = true;
    }

    clearHoverText() {
        if (this.isHover) {
            this.text.setText("");
            this.isHover = false;
        }
    }
}
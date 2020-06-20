import {identifiers, directions} from './enums.js';

export default class Arrow {
    constructor(scene, direction, view, destination) {
        this.scene = scene;
        this.view = view;
        this.direction = direction;
        this.destination = destination;

        let image;
        if (this.direction === directions.RIGHT) {
            image = 'arrowRight'
        } else {
            image = 'arrowLeft'
        }
        
        this.name = identifiers.ARROW + this.direction + this.view.viewType;
        this.img = this.scene.add.image(-1000, -1000, image).setName(this.name);
        this.img.setInteractive(Phaser.Geom.Rectangle());
        this.img.displayWidth = 40;
        this.img.displayHeight = 65;
    }

    display() {
        let x;
        let y;
        if (this.direction === directions.RIGHT) {
            x = 770;
            y = 275;
        } else {
            x = 30;
            y = 275;
        }
        this.img.setPosition(x, y)
    }

    move() {
        this.view.hide();
        this.destination.display();
    }

    hide() {
        this.img.setPosition(-1000, -1000);
    }
}
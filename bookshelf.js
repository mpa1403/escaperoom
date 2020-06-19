import {identifiers} from './enums.js';

export default class Bookshelf {
    constructor(scene) {
        this.scene = scene;
        this.books = {};
        this.zoomBooks = {};
        this.booksByColor = {};

        this.img = this.scene.add.image(-1000, -1000, 'bookshelf');
        this.img.displayHeight = 350;
        this.img.displayWidth = 350;

        for (let color of ["red", "blue", "green", "yellow"]) {
            let book = new Book(this.scene, color+"BookBack", color+"Book", color);
            this.books[book.name] = book;
            this.zoomBooks[book.zoomName] = book;
            this.booksByColor[color] = book;
        }
    }

    openBook(book) {
        this.books[book.name].openUp();
    }

    closeBook(book) {
        this.zoomBooks[book.name].close();
    }

    display() {
        this.img.setPosition(400, 325);
        this.booksByColor["red"].display(437, 329);
        this.booksByColor["blue"].display(372, 328);
        this.booksByColor["green"].display(393, 329);
        this.booksByColor["yellow"].display(415, 328);
    }

    hide() {
        this.img.setPosition(-1000, -1000);
        for (let color in this.books) {
            this.books[color].hide();
        }
    }
}

class Book {
    constructor(scene, image, zoomImage, color) {
        this.scene = scene;

        this.zoomImg = this.scene.add.image(-1000, -1000, zoomImage).setName(identifiers.ZOOMBOOK + color + "zoom");
        this.zoomImg.setInteractive(Phaser.Geom.Rectangle());
        this.zoomImg.displayHeight = 525;
        this.zoomImg.displayWidth = 730;
        this.zoomImg.setDepth(1000);
        this.zoomName = this.zoomImg.name;

        this.img = this.scene.add.image(-1000, -1000, image).setName(identifiers.BOOK + color);
        this.img.setInteractive(Phaser.Geom.Rectangle());
        this.name = this.img.name;
        this.img.displayHeight = 65;
        this.img.displayWidth = 20;
    }

    display(x, y) {
        this.img.setPosition(x, y);
    }

    hide() {
        this.img.setPosition(-1000, -1000);
        this.zoomImg.setPosition(-1000, -1000);
    }

    openUp() {
        this.zoomImg.setPosition(400, 300);
    }

    close() {
        this.zoomImg.setPosition(-1000, -1000);
    }
}
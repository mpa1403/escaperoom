import { identifiers, noteTypes } from "./enums.js";

export class Inventory {
    constructor(scene) {
        this.scene = scene;
        this.items = [];
        this.itemMap = {};
        this.selected = null;
        this.label = this.scene.add.text(20, 553, "Inventory:", { color: '#fff' });
    }

    findItemByName(name) {
        return this.itemMap[name];
    }
    
    addItem(item) {
        this.items.push(item);
        this.itemMap[item.name] = item;
        this.displayItems();
    }

    removeItem(item) {
        this.items = this.items.filter(invItem => invItem.name != item.name);
        this.itemMap[item.name].hide();
        this.itemMap[item.name] = null;
    }

    selectItem(item) {
        this.selected = item;
        item.select();
    }

    unselectItem() {
        this.selected.unselect();
        this.selected = null;
        this.displayItems();
    }

    displayItems() {
        let x = 175;
        let y = 562;
        for (let item of this.items) {
            let height = 50;
            let width = (height * item.origWidth) / item.origHeight;
            item.resize(width, height);
            item.display(x,y);
            x += 75;
        }
    }
}


class InventoryItem {
    constructor(scene) {
        this.scene = scene;
    }

    display(x, y) {
        this.img.setPosition(x, y);
    }

    resize(width, height) {
        this.img.displayWidth = width;
        this.img.displayHeight = height;
    }

    hide() {
        this.img.setPosition(-1000, -1000);
    }
}

export class Note extends InventoryItem {
    constructor(scene, imageName, type) {
        super(scene);
        this.type = type;
        this.origHeight = 600;
        this.origWidth = 800;
        this.examining = false;
       
        this.img = scene.add.image(-1000, -1000, imageName).setName(identifiers.NOTE + this.type);
        this.img.setDepth(1000);
        this.name = this.img.name;
        this.img.setInteractive(Phaser.Geom.Rectangle());
    }

    getText() {
        switch(this.type) {
            case (noteTypes.SUDOKU):
                return "Hmmm...";
            case (noteTypes.TRIANGLE):
                return "Oooh, I love math."
            case (noteTypes.MASTERMIND):
                return "Weird..."
            case (noteTypes.BOOK):
                return "Interesting."
        }
    }

    select() {
        this.examining = true;
        this.img.setPosition(400, 300);
        this.img.displayHeight = this.origHeight;
        this.img.displayWidth = this.origWidth;
    }

    unselect() {
        this.examining = false;
        this.hide();
    }
}

export class WaterBottle extends InventoryItem {
    constructor(scene) {
        super(scene);
        
        this.img = this.scene.add.image(-1000, -1000, 'water').setName(identifiers.WATERBOTTLE);
        this.img.setInteractive(Phaser.Geom.Rectangle());
        this.img.displayHeight = 75;
        this.img.displayWidth = 40;
        
        this.name = this.img.name;
        this.origHeight = this.img.displayHeight;
        this.origWidth = this.img.displayWidth;
    }
    
    select() {
        this.img.setTint(0xff0000);
    }

    unselect() {
        this.img.clearTint();
    }
}

export class Screwdriver extends InventoryItem {
    constructor(scene) {
        super(scene);
        
        this.img = this.scene.add.image(-1000, -1000, 'screwdriver').setName(identifiers.SCREWDRIVER);
        this.img.setInteractive(Phaser.Geom.Rectangle());
        this.img.displayHeight = 75;
        this.img.displayWidth = 40;
        
        this.name = this.img.name; 
        this.origHeight = this.img.displayHeight;
        this.origWidth = this.img.displayWidth;
    }

    select() {
        this.img.setTint(0xff0000);
    }

    unselect() {
        this.img.clearTint();
    }
}

export class Key extends InventoryItem {
    constructor(scene) {
        super(scene);
        
        this.img = this.scene.add.image(-1000, -1000, 'key').setName(identifiers.KEY);
        this.img.setInteractive(Phaser.Geom.Rectangle());
        this.img.displayHeight = 40;
        this.img.displayWidth = 40;
        
        this.name = this.img.name;
        this.origHeight = this.img.displayHeight;
        this.origWidth = this.img.displayWidth;
    }

    select() {
        this.img.setTint(0xff0000);
    }

    unselect() {
        this.img.clearTint();
    }
}
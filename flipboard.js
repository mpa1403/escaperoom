import {identifiers} from './enums.js';

export default class FlipBoard {
    constructor(scene) {
        this.scene = scene;
        this.tiles = [];
        this.board = {};
        this.correctTiles = 0;
        this.winningNum = 81;
        this.editable = true;
        this.finished = false;
        this.create();
    }

    create() {
        let puzzle= [
            [0, 0, 0, 0, 0, 0, 0, 1, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1, 0, 0], 
            [1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 1]
        ];
        let x = 0;
        let y = 0;
        let size = 30;
        let offsetX = 0;
        let offsetY = 0;
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                let answer;
                if (puzzle[row][col] == 0) {
                    this.correctTiles += 1;
                    answer = false;
                } else {
                    answer = true;
                }
                let tile = this.scene.add.image(-1000, -1000, 'square').setName(identifiers.FLIPTILE + x + y);
                tile.displayHeight = size;
                tile.displayWidth = size;
                tile.setInteractive(Phaser.Geom.Rectangle());
                this.addTile(x * size + offsetX, y * size + offsetY, tile, false, answer);
                if (col == 2 || col == 5) {
                    offsetX += 3
                }
                x += 1;
            }
            if (row == 2 || row == 5) {
                offsetY += 3;
            }
            offsetX = 0;
            x = 0;
            y += 1;
        }
    }

    display() {
        let offsetX = 425;
        let offsetY = 85;
        for (let tile of this.tiles) {
            tile.tile.setPosition(tile.x + offsetX, tile.y + offsetY);
        }
    }

    addTile(x, y, tile, value, answer) {
        let flipTile = new FlipTile(x, y, tile, value, answer);
        this.tiles.push(flipTile);
        this.board[tile.name] = flipTile;
    }

    toggleTile(tile) {
        if (!this.editable) {
            return;
        }

        let flipTile = this.board[tile.name]
        let correct = flipTile.toggle();
        
        if (correct) {
            this.correctTiles += 1;
        } else {
            this.correctTiles -= 1;
        }
    }

    checkWin() {
        if (this.correctTiles == this.winningNum) {
            this.editable = false;
            this.finished = true;
            return true;
        } else {
            return false;
        }
    }

    hide() {
        this.tiles.forEach(tile => tile.tile.setPosition(-1000, -1000));
    }
}

class FlipTile {
    constructor(x, y, tile, value, answer) {
        this.x = x;
        this.y = y;
        this.tile = tile;
        this.value = value;
        this.answer = answer;
        this.editable = true;
    }

    toggle() {
        if (!this.editable) {
            return false;
        }
        if (!this.value) {
            this.tile.setTint(0x666666);
        } else {
            this.tile.setTint(0xffffff);
        }
        this.value = !this.value;
        return this.value == this.answer;
    }
}
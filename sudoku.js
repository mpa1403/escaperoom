import {identifiers} from './enums.js';

export default class SudokuBoard {
    constructor(scene) {
        this.scene = scene;
        this.editable = true;
        this.squares = [];
        this.board = {};
        this.correctSquares = [];
        this.winningNum = 10;
        this.finished = false;
        this.create();
    }

    create() {
        let puzzle= [
            [1, 6, 5, 7, 9, 4, 2, 3, 8],
            [4, -8, 7, 3, 1, 2, -9, 5, -6],
            [9, 3, 2, 8, 5, 6, 7, 1, 4],
            [8, 1, -3, 4, 7, 5, 6, 9, 2],
            [5, 7, 6, 2, 3, 9, 4, 8, -1],
            [2, 4, 9, 6, 8, 1, -3, 7, 5], 
            [3, -2, 1, 5, 6, 7, 8, 4, 9],
            [6, 9, -8, 1, 4, 3, 5, 2, 7],
            [-7, 5, -4, 9, 2, 8, 1, 6, 3]
        ];

        let x = 0;
        let y = 0;
        let size = 30;
        let offsetX = 0;
        let offsetY = 0;

        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                let value = puzzle[row][col];
                let editable = false;
                let color = '#000000';

                if (value < 0) {
                    value = 1
                    editable = true;
                    color = '#008000'
                }

                let tile = this.scene.add.image(-1000, -1000, 'square').setName(identifiers.SUDOKUTILE + x + y);
                let text = this.scene.add.text(-1000,  -1000, value, { color: color });
                
                tile.displayHeight = size;
                tile.displayWidth = size;
                tile.setInteractive(Phaser.Geom.Rectangle());
                
                this.addSquare(x * size + offsetX, y * size + offsetY, tile, text, editable, value, Math.abs(puzzle[row][col]));

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
        let offsetX = 120;
        let offsetY = 85;
        for (let square of this.squares) {
            square.tile.setPosition(square.x + offsetX, square.y + offsetY);
            square.text.setPosition(square.x + offsetX - 5, square.y + offsetY - 5);
        }
    }

    addSquare(x, y, tile, text, editable, number, answer) {
        let square = new SudokuSquare(x, y, tile, text, editable, number, answer);
        this.squares.push(square);
        this.board[tile.name] = square;
        if (editable && answer == 1) {
            this.correctSquares.push(square);
        }
    }

    incrementSquare(tile) {
        if (!this.editable) {
            return;
        }

        let sudokuSquare = this.board[tile.name];
        let correct = sudokuSquare.increment();
        let index = this.correctSquares.indexOf(sudokuSquare);
        
        if (correct && index == -1) {
            this.correctSquares.push(sudokuSquare);
        } else if (index > -1) {
            this.correctSquares.splice(index, 1);
        }
    }

    checkWin() {
        if (this.correctSquares.length == this.winningNum) {
            this.editable = false;
            this.finished = true;
            return true;
        } else {
            return false;
        }
    }

    hide() {
        for (let square of this.squares) {
            square.tile.setPosition(-1000, -1000);
            square.text.setPosition(-1000, -1000);
        }
    }
}

class SudokuSquare {
    constructor(x, y, tile, text, editable, number, answer) {
        this.x = x;
        this.y = y;
        this.tile = tile;
        this.text = text;
        this.editable = editable;
        this.number = number;
        this.answer = answer;
    }

    increment() {
        if (!this.editable) {
            return false;
        }

        this.number += 1;
        if (this.number > 9) {
            this.number = 1;
        }
        
        this.text.setText(this.number);
        return this.number == this.answer;
    }
}
import {views, directions} from './enums.js';
import Arrow from './arrow.js';
import Screen from './screen.js';
import ColorLock from './colorLock.js';
import SudokuBoard from './sudoku.js';
import FlipBoard from './flipboard.js';
import Triangle from './triangle.js';
import Desk from './desk.js';
import Bookshelf from './bookshelf.js';
import Trashcan from './trashcan.js';
import Vase from './vase.js';
import Vent from './vent.js';
import MastermindLock from './mastermindlock.js';
import {WaterBottle} from './inventory.js';
import Door from './door.js';
import Poster from './poster.js';
import FinalLock from './finalLock.js';
import LetterLock from './letterLock.js';

class View {
    constructor(scene) {
        this.scene = scene;
        this.items = [];
        this.navigation = {};
    }

    setDestinationLeft(destinationLeft) {
        this.arrowLeft = new Arrow(this.scene, directions.LEFT, this, destinationLeft);
        this.navigation[this.arrowLeft.name] = this.arrowLeft;
        this.items.push(this.arrowLeft);
    }

    setDestinationRight(destinationRight) {
        this.arrowRight = new Arrow(this.scene, directions.RIGHT, this, destinationRight);
        this.navigation[this.arrowRight.name] = this.arrowRight;
        this.items.push(this.arrowRight);
    }

    move(gameObject) {
        let arrow = this.navigation[gameObject.name];
        if (arrow && arrow.destination) {
            arrow.move();
            return arrow.destination;
        }
        return this;
    }

    hide() {
        this.items.forEach(item => item.hide());
    }
}

export class SudokuView extends View {
    constructor(scene) {
        super(scene);
        this.viewType = views.SUDOKUPUZZLE;
        this.sudokuBoard = new SudokuBoard(this.scene);
        this.flipBoard = new FlipBoard(this.scene);
        this.screen = new Screen(this.scene, "UNSOLVED\n(0/2)");
        this.items = [this.sudokuBoard, this.flipBoard, this.screen];
    }

    display() {
        this.sudokuBoard.display();
        this.flipBoard.display();
        this.arrowLeft.display();
        this.arrowRight.display();

        let screenTextX = this.complete ? 360 : 355;
        let screenTextY = this.complete ? 380 : 380;
        this.screen.display(390, 400, screenTextX, screenTextY);
    }

    checkWin() {
        let sudokuWon = this.sudokuBoard.checkWin();
        let flipBoardWon = this.flipBoard.checkWin();
        
        if (sudokuWon && flipBoardWon) {
            this.screen.setText("#00ff00", "SOLVED!\n8", 360, 380);
            return true;
        } else if (sudokuWon || flipBoardWon) {
            this.screen.setText("#ff0000", "UNSOLVED\n(1/2)", 355, 380);
            return false;
        } else {
            return false;
        }
    }
}

export class DeskView extends View {
    constructor(scene) {
        super(scene);
        
        this.viewType = views.DESK;
        this.hasWaterBottle = true;
        this.complete = false;

        this.desk = new Desk(this.scene);
        this.waterBottle = new WaterBottle(this.scene);
        this.triangle = new Triangle(this.scene);
        this.colorLock = new ColorLock(this.scene);
        this.screen = new Screen(this.scene, "UNSOLVED");
        
        this.items = [this.desk, this.waterBottle, this.triangle, this.colorLock, this.screen];
    }

    display() {
        this.desk.display();
        this.triangle.display();
        this.colorLock.display();
        this.arrowLeft.display();
        this.arrowRight.display();
        
        let screenTextX = this.complete ? 570 : 565;
        let screenTextY = this.complete ? 250 : 260;
        this.screen.display(600, 270, screenTextX, screenTextY);

        if (this.hasWaterBottle) {
            this.waterBottle.display(400, 330);
        }
    }

    takeWaterBottle() {
        this.waterBottle.hide();
        this.items = this.items.filter(item => item != this.waterBottle);
        this.hasWaterBottle = false;
        return this.waterBottle;
    }

    checkWin() {
        let won = this.colorLock.checkWin();
        if (won) {
            this.complete = true;
            this.screen.setText("#00ff00", "SOLVED!\n5", 570, 250);
        }
        return won;
    }
}

export class BookshelfView extends View {
    constructor(scene) {
        super(scene);
        
        this.viewType = views.BOOKSHELF;
        this.numLockcomplete = false;

        this.bookshelf = new Bookshelf(this.scene);
        this.trashcan = new Trashcan(this.scene);
        this.vase = new Vase(this.scene);
        this.vent = new Vent(this.scene);
        this.mastermindLock = new MastermindLock(this.scene);
        this.screen = new Screen(this.scene, "UNSOLVED");
        
        this.items = [this.bookshelf, this.trashcan, this.vase, this.vent, this.mastermindLock, this.screen];
    }

    display() {
        this.bookshelf.display();
        this.trashcan.display();
        this.vase.display();
        this.vent.display();
        this.mastermindLock.display();
        this.arrowLeft.display();
        this.arrowRight.display();

        let screenTextX = this.numLockcomplete ? 90 : 85;
        let screenTextY = this.numLockcomplete ? 210 : 220;
        this.screen.display(120, 230, screenTextX, screenTextY);
    }

    checkWin() {
        let won = this.mastermindLock.checkWin();
        if (won) {
            this.numLockcomplete = true;
            this.screen.setText("#00ff00", "SOLVED!\n7", 90, 210);
        }
        return won;
    }
}

export class DoorView extends View {
    constructor(scene) {
        super(scene);
        
        this.viewType = views.DOOR;
        this.complete = false;

        this.door = new Door(scene);
        this.poster = new Poster(scene);
        this.finalLock = new FinalLock(scene);
        this.letterLock = new LetterLock(scene);
        this.screen = new Screen(this.scene, "UNSOLVED");

        this.items = [this.door, this.poster, this.finalLock, this.letterLock, this.screen];
    }

    display() {
        this.door.display();
        this.poster.display();
        this.finalLock.display();
        this.letterLock.display();
        this.arrowLeft.display();
        this.arrowRight.display();

        let screenTextX = this.complete ? 380 : 375;
        let screenTextY = this.complete ? 305 : 310;
        this.screen.display(410, 325, screenTextX, screenTextY);
    }

    checkWin() {
        let won = this.letterLock.checkWin();
        if (won) {
            this.complete = true;
            this.screen.setText("#00ff00", "SOLVED!\n3", 380, 305);
        }
        return won;
    }

    checkFinalLockWin() {
        return this.finalLock.checkWin();
    }
}
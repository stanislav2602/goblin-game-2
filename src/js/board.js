export default class Board {
    constructor(boardElement) {
        this.boardElement = boardElement;
        this.cells = [];
        for (let i = 0; i < 16; i++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            boardElement.append(cell);
            this.cells.push(cell);
        }
    }

    getRandomCell() {
        return this.cells[Math.floor(Math.random() * 16)];
    }

    getCells() {
        return this.cells;
    }
}
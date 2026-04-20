export default class Board {
    static SIZE = 4;
    static CELLS = Board.SIZE * Board.SIZE;

    constructor(board) {
        this.board = board;
        this.cells = [];
        for (let i = 0; i < Board.CELLS; i++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            this.board.append(cell);
            this.cells.push(cell);
        }
    }

    random(excludeCell = null) {
        if (!excludeCell) {
            return this.cells[Math.floor(Math.random() * Board.CELLS)];
        }
        
        const availableCells = this.cells.filter(cell => cell !== excludeCell);
        return availableCells[Math.floor(Math.random() * availableCells.length)];
    }
}
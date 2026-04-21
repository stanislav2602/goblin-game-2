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
        if (excludeCell == null) {
            return this.cells[Math.floor(Math.random() * Board.CELLS)];
        }
        
        const excludeIndex = this.cells.indexOf(excludeCell);
        let randomIndex;
        
        do {
            randomIndex = Math.floor(Math.random() * Board.CELLS);
        } while (randomIndex === excludeIndex);
        
        return this.cells[randomIndex];
    }
}
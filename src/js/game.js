export default class Game {
    constructor(board, goblin, scoreEl, missedEl, msgEl) {
        this.board = board;
        this.goblin = goblin;
        this.scoreEl = scoreEl;
        this.missedEl = missedEl;
        this.msgEl = msgEl;
        this.score = 0;
        this.missed = 0;
        this.timer = null;
    }

    start() {
        this.score = 0;
        this.missed = 0;
        this.missedEl.textContent = '';
        this.update();
        this.move();
        this.board.boardElement.onclick = (e) => {
            const cell = e.target.closest('.cell');
            if (cell && this.goblin.cell === cell) {
                this.score++;
                this.update();
                this.goblin.hide();
                clearTimeout(this.timer);
                this.move();
            }
        };

    }

    move() {
        let newCell;
        do {
            newCell = this.board.getRandomCell();
        } while (newCell === this.goblin.cell);

        this.goblin.show(newCell);

        this.timer = setTimeout(() => {
            if (this.goblin.cell) {
                this.missed++;
                this.update();
                this.goblin.hide();
                this.missed < 5 ? this.move() : this.end();
            }
        }, 1000);
    }

    update() {
        this.scoreEl.textContent = this.score;
        this.missedEl.textContent = this.missed;
    }

    end() {
        this.goblin.hide();
        clearTimeout(this.timer);
        this.msgEl.textContent = `Игра окончена. Счет: ${this.score}`;
    }
}
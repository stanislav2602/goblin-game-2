export default class Game {
    static MAX_MISSED = 5;
    static INTERVAL = 1000;

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
        this.update();
        this.msgEl.textContent = '';
        this.move();
        this.board.board.onclick = (e) => {
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
        const newCell = this.board.random(this.goblin.cell || null);
        this.goblin.show(newCell);
        
        this.timer = setTimeout(() => {
            if (this.goblin.cell) {
                this.missed++;
                this.update();
                this.goblin.hide();
                this.missed < Game.MAX_MISSED ? this.move() : this.end();
            }
        }, Game.INTERVAL);
    }

    update() {
        this.scoreEl.textContent = this.score;
        this.missedEl.textContent = this.missed;
    }

    end() {
        this.goblin.hide();
        clearTimeout(this.timer);
        this.msgEl.textContent = `Игра окончена. Счёт: ${this.score}`;
    }
}
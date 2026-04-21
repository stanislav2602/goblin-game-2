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
        this.active = false;
        this.clickHandler = null;
    }

    start() {
        if (this.clickHandler) {
            this.board.board.removeEventListener('click', this.clickHandler);
            this.clickHandler = null;
        }
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        
        this.score = 0;
        this.missed = 0;
        this.active = true;
        this.update();
        this.msgEl.textContent = '';
        
        this.clickHandler = (e) => {
            if (!this.active) return;
            
            const cell = e.target.closest('.cell');
            if (cell && this.goblin.cell === cell) {
                this.score++;
                this.update();
                this.goblin.hide();
                
                if (this.timer) {
                    clearTimeout(this.timer);
                    this.timer = null;
                }
                
                this.move();
            }
        };
        
        this.board.board.addEventListener('click', this.clickHandler);
        this.move();
    }

    move() {
        if (!this.active) return;
        
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        
        const newCell = this.board.random(this.goblin.cell);
        this.goblin.show(newCell);
        
        this.timer = setTimeout(() => {
            if (!this.active) return;
            
            this.missed++;
            this.update();
            this.goblin.hide();
            
            if (this.missed < Game.MAX_MISSED) {
                this.move();
            } else {
                this.end();
            }
        }, Game.INTERVAL);
    }

    update() {
        this.scoreEl.textContent = this.score;
        this.missedEl.textContent = this.missed;
    }

    end() {
        this.active = false;
        this.goblin.hide();
        
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        
        if (this.clickHandler) {
            this.board.board.removeEventListener('click', this.clickHandler);
            this.clickHandler = null;
        }
        
        this.msgEl.textContent = `Игра окончена. Счёт: ${this.score}`;
    }
}
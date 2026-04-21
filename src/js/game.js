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
  
        this.goblin.hide();
        
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
                
                const previousCell = this.goblin.cell;
                this.goblin.hide();
                
                if (this.timer) {
                    clearTimeout(this.timer);
                    this.timer = null;
                }
                
                this.move(previousCell);
            }
        };
        
        this.board.board.addEventListener('click', this.clickHandler);
        this.move();
    }

    move(previousCell = null) {
        if (!this.active) return;
        
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        
        const excludeCell = previousCell !== null ? previousCell : this.goblin.cell;
        const newCell = this.board.random(excludeCell);
        this.goblin.show(newCell);
        
        this.timer = setTimeout(() => {
            if (!this.active) return;
            
            this.missed++;
            this.update();
            
            const currentCell = this.goblin.cell;
            this.goblin.hide();
            
            if (this.missed < Game.MAX_MISSED) {
                this.move(currentCell);
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
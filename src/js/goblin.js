export default class Goblin {
    constructor(img) {
        this.el = document.createElement('img');
        this.el.src = img;
        this.el.alt = 'goblin';
        this.cell = null;
    }

    show(cell) {
        this.cell = cell;
        cell.append(this.el);
    }

    hide() {
        if (this.cell) this.el.remove();
        this.cell = null;
    }
}
export default class Goblin {
    constructor(imgSrc) {
        this.element = document.createElement('img');
        this.element.src = imgSrc;
        this.cell = null;
    }

    show(cell) {
        this.cell = cell;
        cell.append(this.element);
    }

    hide() {
        if (this.cell) this.element.remove();
        this.cell = null;
    }
}
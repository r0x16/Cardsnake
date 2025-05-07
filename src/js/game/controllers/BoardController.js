import Board from '../Board.js';

export default class BoardController {
  constructor(canvasId, tileSize, width, height) {
    this.board = new Board(canvasId, tileSize, width, height);
    this.headerHeight = this.board.headerHeight;
  }

  clear() {
    this.board.clear();
  }

  clearHeader() {
    this.board.clearHeader();
  }

  clearAll() {
    this.board.clearHeader();
    this.board.clear();
  }

  drawText(text, x, y, color, font) {
    this.board.drawText(text, x, y, color, font);
  }

  isInside(x, y) {
    return this.board.isInside(x, y);
  }

  get ctx() {
    return this.board.ctx;
  }
} 
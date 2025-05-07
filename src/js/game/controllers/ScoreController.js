export default class ScoreController {
  constructor(boardController) {
    this.board = boardController;
    this.headerHeight = boardController.headerHeight;
    this.ctx = boardController.ctx;
    this.width = boardController.board.width;
    this.score = 0;
    this.font = '20px "Consolas", monospace';
    this.color = 'white';
    this.paddingRight = 20;
  }

  update(score) {
    this.score = score;
  }

  reset() {
    this.score = 0;
  }

  increment() {
    this.score++;
  }

  getScore() {
    return this.score;
  }

  draw() {
    // Dibuja el texto del puntaje centrado verticalmente y alineado a la derecha
    this.ctx.fillStyle = this.color;
    this.ctx.font = this.font;
    this.ctx.textAlign = 'right';
    this.ctx.textBaseline = 'middle';
    const x = this.width - this.paddingRight;
    const y = this.headerHeight / 2;
    this.ctx.fillText(`${this.score}`, x, y);

    // Línea horizontal decorativa a 4px debajo de la cabecera
    const lineY = this.headerHeight + 4;
    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    this.ctx.moveTo(0, lineY);
    this.ctx.lineTo(this.width, lineY);
    this.ctx.stroke();
  }
} 
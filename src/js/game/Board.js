export default class Board {
  constructor(canvasId, tileSize, width, height) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.tileSize = tileSize;
    this.width = width;
    this.height = height;
    this.headerHeight = 60;
    this.canvas.width = this.width;
    this.canvas.height = this.headerHeight + this.height;
    // Cargo la imagen de fondo del tablero
    this.bgImage = new Image();
    this.bgImage.src = 'assets/bg.png';
    // Cargo la imagen de la cabecera
    this.headerImage = new Image();
    this.headerImage.src = 'assets/header.png';
  }

  clear() {
    // Limpio la zona de juego y dibujo la imagen de fondo
    this.ctx.clearRect(0, this.headerHeight, this.width, this.height);
    if (this.bgImage.complete) {
      this.ctx.drawImage(this.bgImage, 0, this.headerHeight, this.width, this.height);
    } else {
      this.bgImage.onload = () => {
        this.ctx.drawImage(this.bgImage, 0, this.headerHeight, this.width, this.height);
      };
    }
  }

  clearHeader() {
    // Limpio el área de cabecera
    this.ctx.clearRect(0, 0, this.width, this.headerHeight);
    // Dibujo la imagen de cabecera si ya cargó, sino al cargarla
    if (this.headerImage.complete) {
      this.ctx.drawImage(this.headerImage, 0, 0, this.width, this.headerHeight);
    } else {
      this.headerImage.onload = () => {
        this.ctx.drawImage(this.headerImage, 0, 0, this.width, this.headerHeight);
      };
    }
  }

  drawText(text, x, y, color = 'white', font = '20px Arial') {
    this.ctx.fillStyle = color;
    this.ctx.font = font;
    this.ctx.fillText(text, x, y, 220);
  }

  isInside(x, y) {
    return (
      x >= 0 &&
      x < this.width &&
      y >= this.headerHeight &&
      y < this.headerHeight + this.height
    );
  }

  randomPosition() {
    const cols = Math.floor(this.width / this.tileSize);
    const rows = Math.floor(this.height / this.tileSize);
    const x = Math.floor(Math.random() * cols) * this.tileSize;
    const y = this.headerHeight + Math.floor(Math.random() * rows) * this.tileSize;
    return { x, y };
  }
} 
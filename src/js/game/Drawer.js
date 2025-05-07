export default class Drawer {
  /**
   * @param {CanvasRenderingContext2D} ctx - Contexto del canvas donde se dibuja
   * @param {number} cellSize - Tamaño (ancho y alto) de cada celda en píxeles
   */
  constructor(ctx, cellSize) {
    this.ctx = ctx;
    this.cellSize = cellSize;
  }

  /**
   * Dibuja una celda en la posición de coordenadas de celda (x, y)
   * @param {number} x - Coordenada en el eje X (en número de celdas)
   * @param {number} y - Coordenada en el eje Y (en número de celdas)
   * @param {string} fillColor - Color de relleno (por ejemplo '#FF0000')
   * @param {string} strokeColor - Color del borde (por ejemplo '#000000')
   */
  drawCell(x, y, fillColor, strokeColor) {
    const size = this.cellSize;
    const px = x;
    const py = y;

    // Rellenar la celda
    this.ctx.fillStyle = fillColor;
    this.ctx.fillRect(px, py, size, size);

    // Dibujar el borde de 1px
    this.ctx.strokeStyle = strokeColor;
    this.ctx.lineWidth = 1;
    this.ctx.strokeRect(px, py, size, size);
  }

  /**
   * Dibuja una celda con texto centrado dentro de la celda.
   * @param {number} x - Posición X en píxeles
   * @param {number} y - Posición Y en píxeles
   * @param {string} fillColor - Color de relleno de la celda
   * @param {string} strokeColor - Color del borde de la celda
   * @param {string} textColor - Color del texto
   * @param {string|number} text - Texto a mostrar
   */
  drawCellWithText(x, y, fillColor, strokeColor, textColor, text) {
    // Dibujo la base
    this.drawCell(x, y, fillColor, strokeColor);
    // Centro del texto
    const centerX = x + this.cellSize / 2;
    const centerY = y + this.cellSize / 2;
    this.ctx.fillStyle = textColor;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.font = `${this.cellSize * 0.6}px Arial`;
    this.ctx.fillText(text, centerX, centerY);
  }
} 
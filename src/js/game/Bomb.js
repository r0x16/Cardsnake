import { Entity } from './Entity.js';

export default class Bomb extends Entity {
  constructor(x, y, tileSize, canvasWidth, canvasHeight, countdown = 5) {
    super(x, y, tileSize);
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.countdown = countdown;
    this.timer = 0;
    this.isExploding = false;
    this.explosionStage = 0;
    this.shrinking = false;
  }

  update() {
    if (!this.isExploding) {
      this.timer += 150;
      if (this.timer >= this.countdown * 1000) {
        this.isExploding = true;
        this.timer = 0;
      }
    } else {
      if (!this.shrinking) {
        if (this.explosionStage < 2) this.explosionStage++;
        else this.shrinking = true;
      } else if (this.explosionStage > 0) {
        this.explosionStage--;
      }
    }
  }

  /**
   * Dibuja la bomba con conteo atrás usando Drawer; la explosión sigue igual.
   * @param {import('./Drawer.js').default} drawer - Drawer para el dibujo
   */
  draw(drawer) {
    if (!this.isExploding) {
      const msLeft = this.countdown * 1000 - this.timer;
      const secLeft = Math.ceil(msLeft / 1000);
      // Dibuja celda con texto centrado usando Drawer
      drawer.drawCellWithText(
        this.x,
        this.y,
        'black',   // color de relleno
        'white',   // color del borde
        'white',   // color del texto
        secLeft > 0 ? secLeft : 0
      );
    } else {
      for (let dx = -this.explosionStage; dx <= this.explosionStage; dx++) {
        for (let dy = -this.explosionStage; dy <= this.explosionStage; dy++) {
          const x = this.x + dx * this.tileSize;
          const y = this.y + dy * this.tileSize;
          if (x >= 0 && x < this.canvasWidth && y >= 0 && y < this.canvasHeight) {
            // Colores posibles para la explosión
            const options = [
              { fill: 'orange', stroke: 'darkorange' },
              { fill: 'yellow', stroke: 'orange' },
              { fill: 'darkorange', stroke: 'brown' }
            ];
            const { fill, stroke } = options[Math.floor(Math.random() * options.length)];
            // Dibujo cada celda de la explosión con Drawer
            drawer.drawCell(x, y, fill, stroke);
          }
        }
      }
    }
  }

  collides(x, y) {
    if (!this.isExploding) {
      return x === this.x && y === this.y;
    }
    for (let dx = -this.explosionStage; dx <= this.explosionStage; dx++) {
      for (let dy = -this.explosionStage; dy <= this.explosionStage; dy++) {
        if (this.x + dx * this.tileSize === x && this.y + dy * this.tileSize === y) {
          return true;
        }
      }
    }
    return false;
  }

  isFinished() {
    return this.isExploding && this.shrinking && this.explosionStage === 0;
  }
} 
import { Entity } from './Entity.js';

export default class Orb extends Entity {
  constructor(x, y, tileSize, countdown = 10) {
    super(x, y, tileSize);
    this.countdown = countdown;
    this.timer = 0;
    this.expired = false;
  }

  update() {
    this.timer += 150;
    if (this.timer >= this.countdown * 1000) {
      this.expired = true;
    }
  }

  /**
   * Dibuja el orbe usando Drawer para mostrar el contador centrado.
   * @param {import('./Drawer.js').default} drawer - Instancia de Drawer para el dibujo
   */
  draw(drawer) {
    const msLeft = this.countdown * 1000 - this.timer;
    const secLeft = Math.ceil(msLeft / 1000);
    // Dibuja celda con texto centrado
    drawer.drawCellWithText(
      this.x,
      this.y,
      'purple',   // color de relleno
      'black',    // color de borde
      'white',    // color del texto
      secLeft > 0 ? secLeft : 0
    );
  }

  collides(x, y) {
    return x === this.x && y === this.y;
  }

  isExpired() {
    return this.expired;
  }
} 
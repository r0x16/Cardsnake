export class Snake {
  constructor(tileSize) {
    this.tileSize = tileSize;
    this.body = [{ x: tileSize * 5, y: tileSize * 5 }];
    this.direction = { x: tileSize, y: 0 };
  }

  setDirection(x, y) {
    // Evitar reverso directo
    if (this.direction.x !== -x && this.direction.y !== -y) {
      this.direction = { x, y };
    }
  }

  move() {
    const newHead = {
      x: this.body[0].x + this.direction.x,
      y: this.body[0].y + this.direction.y
    };
    this.body.unshift(newHead);
    this.body.pop();
  }

  grow() {
    const tail = this.body[this.body.length - 1];
    this.body.push({ x: tail.x, y: tail.y });
  }

  /**
   * Dibuja la serpiente usando un Drawer para cada segmento
   * @param {import('./Drawer.js').default} drawer - Instancia de Drawer para dibujar celdas
   */
  draw(drawer) {
    const colors = ['#009A00', '#00a500'];
    const strokeColor = '#006400';
    this.body.forEach((part, index) => {
      const fillColor = colors[index % 2];
      drawer.drawCell(part.x, part.y, fillColor, strokeColor);
    });
  }

  collidesWith(x, y) {
    return this.body.some(part => {
      return part.x === x && part.y === y
    });
  }

  collidesWithSelf() {
    const [head, ...rest] = this.body;
    return rest.some(part => part.x === head.x && part.y === head.y);
  }

  get head() {
    return this.body[0];
  }

  /** Devuelve la posición de la cabeza tras el siguiente movimiento */
  getNextHeadPosition() {
    return {
      x: this.head.x + this.direction.x,
      y: this.head.y + this.direction.y
    };
  }

  /** Verifica colisión con los límites del tablero usando Board */
  willCollideWall(board) {
    const pos = this.getNextHeadPosition();
    return !board.isInside(pos.x, pos.y);
  }

  /** Verifica colisión con el propio cuerpo en la siguiente posición */
  willCollideSelf() {
    const pos = this.getNextHeadPosition();
    return this.body.some(part => part.x === pos.x && part.y === pos.y);
  }

  /** Verifica colisión global (muro o consigo mismo) */
  willCollide(board) {
    return this.willCollideWall(board) || this.willCollideSelf();
  }
} 
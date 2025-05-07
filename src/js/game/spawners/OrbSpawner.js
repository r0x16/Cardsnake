import Orb from '../Orb.js';

export default class OrbSpawner {
  constructor(board, snake, tileSize) {
    this.board = board;
    this.snake = snake;
    this.tileSize = tileSize;
    this.orbs = [];
  }

  spawn() {
    const orb = this.createOrb();
    // Agrego el orbe a la lista de orbes
    this.orbs.push(orb);
    return this.orbs;
  }

  createOrb() {
    // Lógica para crear un orbe evitando colisiones (fuera del header)
    let position;
    do {
      position = this.board.randomPosition();
    } while (
      this.isColliding(position) ||
      this.isInFront(position)
    );
    return new Orb(position.x, position.y, this.tileSize);
  }

  isColliding(position) {
    return this.snake.collidesWith(position.x, position.y) ||
           this.orbs.some(orb => orb.x === position.x && orb.y === position.y);
  }

  // Agrego método para evitar spawn en 3 bloques delante de la serpiente
  isInFront(position) {
    const head = this.snake.head;
    const { x: dx, y: dy } = this.snake.direction;
    for (let i = 1; i <= 3; i++) {
      if (position.x === head.x + dx * i && position.y === head.y + dy * i) {
        return true;
      }
    }
    return false;
  }

  update() {
    // Actualizar y eliminar orbes expirados
    this.orbs.forEach(orb => orb.update());
    this.orbs = this.orbs.filter(orb => !orb.isExpired());
  }

  draw(drawer) {
    this.orbs.forEach(orb => orb.draw(drawer));
  }
} 
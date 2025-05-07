import Melon from '../Melon.js';

export default class MelonSpawner {
  constructor(board, snake, tileSize) {
    this.board = board;
    this.snake = snake;
    this.tileSize = tileSize;
    this.melons = [];
  }

  spawn(bombs = [], orbs = []) {
    const melon = this.createMelon(bombs, orbs);
    this.melons.push(melon);
    return this.melons;
  }

  createMelon(bombs, orbs) {
    let position;
    do {
      position = this.board.randomPosition();
    } while (
      this.snake.collidesWith(position.x, position.y) ||
      this.melons.some(m => m.x === position.x && m.y === position.y) ||
      bombs.some(bomb => bomb.x === position.x && bomb.y === position.y) ||
      orbs.some(orb => orb.x === position.x && orb.y === position.y) ||
      this.isInFront(position)
    );
    return new Melon(position.x, position.y, this.tileSize);
  }

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
    // No se necesita lógica de actualización para melones
  }

  draw(drawer) {
    this.melons.forEach(melon => melon.draw(drawer));
  }
} 
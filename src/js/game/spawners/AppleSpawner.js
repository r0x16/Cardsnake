import { randomInt } from '../Utils.js';
import Apple from '../Apple.js';

export default class AppleSpawner {
  constructor(board, snake, tileSize) {
    this.board = board;
    this.snake = snake;
    this.tileSize = tileSize;
    this.apples = [];
  }

  spawn(bombs, orbs) {
    const apple = this.createApple(bombs, orbs);
    // Solo mantengo una manzana activa a la vez
    this.apples.push(apple);
    return this.apples;
  }

  createApple(bombs, orbs) {
    // Lógica para crear una manzana evitando colisiones usando board.randomPosition
    let position;
    do {
      position = this.board.randomPosition();
    } while (
      this.isColliding(position, bombs, orbs) ||
      this.isInFront(position)
    );
    return new Apple(position.x, position.y, this.tileSize);
  }

  isColliding(position, bombs, orbs) {
    return this.snake.collidesWith(position.x, position.y) ||
           bombs.some(bomb => bomb.x === position.x && bomb.y === position.y) ||
           orbs.some(orb => orb.x === position.x && orb.y === position.y);
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
    // Actualizar lógica de manzanas si es necesario
  }

  draw(drawer) {
    this.apples.forEach(apple => apple.draw(drawer));
  }
} 
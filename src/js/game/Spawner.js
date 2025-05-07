import Apple from './Apple.js';
import Bomb from './Bomb.js';
import Orb from './Orb.js';

export default class Spawner {
  constructor(board, snake, tileSize) {
    this.board = board;
    this.snake = snake;
    this.tileSize = tileSize;
  }

  spawnApple(existingBomb, existingOrb) {
    let pos;
    do {
      pos = this.board.randomPosition();
    } while (
      this.snake.collidesWith(pos.x, pos.y) ||
      (existingBomb && existingBomb.collides(pos.x, pos.y)) ||
      (existingOrb && existingOrb.collides(pos.x, pos.y))
    );
    return new Apple(pos.x, pos.y, this.tileSize);
  }

  spawnSpecial() {
    let pos;
    do {
      pos = this.board.randomPosition();
    } while (this.snake.collidesWith(pos.x, pos.y));
    if (Math.random() < 0.2) {
      return new Orb(pos.x, pos.y, this.tileSize);
    } else {
      return new Bomb(
        pos.x,
        pos.y,
        this.tileSize,
        this.board.canvas.width,
        this.board.canvas.height
      );
    }
  }
} 
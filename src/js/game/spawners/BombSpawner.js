import Bomb from '../Bomb.js';

export default class BombSpawner {
  constructor(board, snake, tileSize) {
    this.board = board;
    this.snake = snake;
    this.tileSize = tileSize;
    this.bombs = [];
  }

  spawn() {
    const bomb = this.createBomb();
    // Agrego la bomba a la lista de bombas
    this.bombs.push(bomb);
    return this.bombs;
  }

  createBomb() {
    // Lógica para crear una bomba evitando colisiones (fuera del header)
    let position;
    do {
      position = this.board.randomPosition();
    } while (
      this.isColliding(position) ||
      this.isInFront(position)
    );
    return new Bomb(
      position.x,
      position.y,
      this.tileSize,
      this.board.canvas.width,
      this.board.canvas.height
    );
  }

  isColliding(position) {
    return this.snake.collidesWith(position.x, position.y) ||
           this.bombs.some(bomb => bomb.x === position.x && bomb.y === position.y);
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
    // Actualizar y eliminar bombas que han terminado
    this.bombs.forEach(bomb => bomb.update());
    this.bombs = this.bombs.filter(bomb => !bomb.isFinished());
  }

  draw(drawer) {
    this.bombs.forEach(bomb => bomb.draw(drawer));
  }
} 
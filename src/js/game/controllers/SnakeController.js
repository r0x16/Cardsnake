import { Snake } from '../Snake.js';

export default class SnakeController {
  constructor(tileSize, boardController) {
    this.board = boardController;
    this.snake = new Snake(tileSize);
    this.directionChanged = false;
    this.queuedDirection = null;
  }

  reset() {
    this.snake = new Snake(this.snake.tileSize);
    this.directionChanged = false;
    this.queuedDirection = null;
  }

  setDirection(x, y) {
    if (!this.directionChanged) {
      this.snake.setDirection(x, y);
      this.directionChanged = true;
    } else {
      this.queuedDirection = { x, y };
    }
  }

  move() {
    this.snake.move();
    this.directionChanged = false;
    if (this.queuedDirection) {
      this.snake.setDirection(this.queuedDirection.x, this.queuedDirection.y);
      this.directionChanged = true;
      this.queuedDirection = null;
    }
  }

  grow() {
    this.snake.grow();
  }

  willCollide() {
    return this.snake.willCollide(this.board);
  }

  getNextPosition() {
    return this.snake.getNextHeadPosition();
  }

  draw(ctx) {
    this.snake.draw(ctx);
  }

  get body() {
    return this.snake.body;
  }
} 
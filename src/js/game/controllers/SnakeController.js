import { Snake } from '../Snake.js';

export default class SnakeController {
  constructor(tileSize, boardController) {
    this.board = boardController;
    this.snake = new Snake(tileSize);
  }

  reset() {
    this.snake = new Snake(this.snake.tileSize);
  }

  setDirection(x, y) {
    this.snake.setDirection(x, y);
  }

  move() {
    this.snake.move();
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
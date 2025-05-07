import Card from './Card.js';
import { randomInt } from '../Utils.js';

export default class ShrinkCard extends Card {
  constructor(game) {
    super(game);
    this.id = 'Shrink';
    this.name = 'Encoger';
  }

  use() {
    const { snakeCtrl } = this.game;
    const body = snakeCtrl.snake.body;
    const piecesToRemove = randomInt(3, 6);
    // Asegurar que siempre quede al menos la cabeza
    const removeCount = Math.min(piecesToRemove, body.length - 1);
    if (removeCount > 0) {
      body.splice(-removeCount, removeCount);
    }
  }
} 
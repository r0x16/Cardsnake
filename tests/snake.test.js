import test from 'node:test';
import assert from 'node:assert/strict';
import { Snake } from '../src/js/game/Snake.js';

test('setDirection does not allow reversing direction', () => {
  const tileSize = 20;
  const snake = new Snake(tileSize);
  const originalDirection = { ...snake.direction };
  // Try to reverse direction
  snake.setDirection(-tileSize, 0);
  assert.deepStrictEqual(snake.direction, originalDirection);
});

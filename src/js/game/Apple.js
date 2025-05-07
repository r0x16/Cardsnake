import { Entity } from './Entity.js';

export default class Apple extends Entity {
  constructor(x, y, tileSize) {
    super(x, y, tileSize);
  }

  draw(drawer) {
    const fillColor = 'red';
    const strokeColor = '#660000';
    drawer.drawCell(this.x, this.y, fillColor, strokeColor);
  }
} 
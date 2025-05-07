import { Entity } from './Entity.js';

export default class Melon extends Entity {
  constructor(x, y, tileSize) {
    super(x, y, tileSize);
  }

  draw(drawer) {
    const fillColor = '#ccd88b';
    const strokeColor = '#041d04';
    drawer.drawCell(this.x, this.y, fillColor, strokeColor);
  }
} 
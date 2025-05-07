export class Entity {
  constructor(x, y, tileSize) {
    this.x = x;
    this.y = y;
    this.tileSize = tileSize;
  }

  draw(ctx) {
    // Implementar en subclases
  }
} 
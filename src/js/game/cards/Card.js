export default class Card {
  constructor(game) {
    this.game = game;
    this.id = '';
    this.name = '';
  }

  use() {
    // Implementar en subclases
  }

  // Obtiene la ruta de la imagen de la carta según su id en minúsculas
  get imageSrc() {
    return `assets/cards/${this.id.toLowerCase()}.png`;
  }
} 
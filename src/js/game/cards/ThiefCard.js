import Card from './Card.js';

export default class ThiefCard extends Card {
  constructor(game) {
    super(game);
    this.id = 'Thief';
    this.name = 'Ladrón';
  }

  use() {
    this.game.cardCtrl.reset();
  }
} 
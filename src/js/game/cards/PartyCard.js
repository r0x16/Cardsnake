import Card from './Card.js';

export default class PartyCard extends Card {
  constructor(game) {
    super(game);
    this.id = 'Party';
    this.name = 'Fiesta';
  }

  use() {
    const { spawnerCtrl } = this.game;
    for (let i = 0; i < 4; i++) {
      spawnerCtrl.spawnSpecial();
    }
  }
} 
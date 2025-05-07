import Card from './Card.js';

export default class HarvestCard extends Card {
  constructor(game) {
    super(game);
    this.id = 'Harvest';
    this.name = 'Cosecha';
  }

  use() {
    const { spawnerCtrl } = this.game;
    
    for (let i = 0; i < 5; i++) {
      spawnerCtrl.spawnApple();
    }
  }
} 
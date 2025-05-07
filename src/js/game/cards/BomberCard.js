import Card from './Card.js';

export default class HarvestCard extends Card {
  constructor(game) {
    super(game);
    this.id = 'Bomber';
    this.name = 'Bomber';
  }

  use() {
    const { spawnerCtrl } = this.game;
    
    for (let i = 0; i < 6; i++) {
      spawnerCtrl.spawnBomb()
    }
  }
} 
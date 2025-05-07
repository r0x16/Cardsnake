import Card from './Card.js';

export default class BonusCard extends Card {
  constructor(game) {
    super(game);
    this.id = 'Bonus';
    this.name = 'Bonus';
  }

  use() {
    // Activa modo bonus por 10 segundos
    this.game.bonusActive = true;
    if (this.game.bonusTimeoutId) clearTimeout(this.game.bonusTimeoutId);
    this.game.bonusTimeoutId = setTimeout(() => {
      this.game.bonusActive = false;
      this.game.bonusTimeoutId = null;
    }, 20000);
  }
} 
import Card from './Card.js';

export default class PoliceCard extends Card {
  constructor(game) {
    super(game);
    this.id = 'Police';
    this.name = 'Policía';
  }

  use() {
    // Elimina todas las bombas del tablero
    this.game.spawnerCtrl.clearBombs();
  }
} 
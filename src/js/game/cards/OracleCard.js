import Card from './Card.js';

export default class OracleCard extends Card {
  constructor(game) {
    super(game);
    this.id = 'Oracle';
    this.name = 'Oráculo';
  }

  use() {
    // Quitar todas las cartas actuales
    this.game.cardCtrl.reset();
    // Agregar dos cartas: la primera se usará para reemplazar la posición del Oráculo, la segunda quedará como nueva carta
    this.game.spawnerCtrl.spawnOrb();
    this.game.spawnerCtrl.spawnOrb();
  }
} 
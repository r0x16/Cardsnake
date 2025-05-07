export default class CollisionController {
  constructor(game) {
    this.game = game;
  }

  update() {
    const { snakeCtrl, boardCtrl, spawnerCtrl, scoreCtrl, cardCtrl, stageCtrl } = this.game;
    // Obtener próxima posición de la cabeza de la serpiente
    const nextHead = snakeCtrl.getNextPosition();
    // Verificar colisión con bordes, consigo misma o con bombas
    const bombs = spawnerCtrl.bombs;
    if (
      !boardCtrl.isInside(nextHead.x, nextHead.y) ||
      snakeCtrl.willCollide() ||
      bombs.some(bomb => bomb.collides(nextHead.x, nextHead.y))
    ) {
      stageCtrl.endGame();
      return;
    }

    // Verificar colisión con manzana
    const apples = spawnerCtrl.apples;
    const ateApple = apples.some(apple => apple.x === nextHead.x && apple.y === nextHead.y);
    // Mover la serpiente
    snakeCtrl.move();
    if (ateApple) {
      scoreCtrl.increment();
      // Doble puntuación si el modo bonus está activo
      if (this.game.bonusActive) {
        scoreCtrl.increment();
      }
      snakeCtrl.grow();
      // Remover solo la manzana comida
      const appleIndex = apples.findIndex(apple => apple.x === nextHead.x && apple.y === nextHead.y);
      if (appleIndex !== -1) {
        apples.splice(appleIndex, 1);
      }
      // Si no quedan manzanas, spawnear una nueva
      if (apples.length === 0) {
        spawnerCtrl.spawnApple();
      }
    }

    // Verificar colisión con orbe
    const orbs = spawnerCtrl.orbs;
    const ateOrb = orbs.some(orb => orb.x === nextHead.x && orb.y === nextHead.y);
    if (ateOrb) {
      cardCtrl.addRandomCard();
      // Remover solo el orbe comido
      const orbIndex = orbs.findIndex(orb => orb.x === nextHead.x && orb.y === nextHead.y);
      if (orbIndex !== -1) {
        orbs.splice(orbIndex, 1);
      }
      // Si no quedan orbes ni bombas, programar siguiente spawn especial
      if (spawnerCtrl.orbs.length === 0 && spawnerCtrl.bombs.length === 0) {
        this.game.scheduleNextSpecial();
      }
    }

    // Verificar colisión con melón
    const melons = spawnerCtrl.melons;
    const ateMelon = melons.some(melon => melon.x === nextHead.x && melon.y === nextHead.y);
    if (ateMelon) {
      // Otorgar 10 puntos
      scoreCtrl.update(scoreCtrl.getScore() + 10);
      // Hacer crecer la serpiente en 2 cuadros
      snakeCtrl.grow();
      snakeCtrl.grow();
      // Remover solo el melón comido
      const melonIndex = melons.findIndex(m => m.x === nextHead.x && m.y === nextHead.y);
      if (melonIndex !== -1) {
        melons.splice(melonIndex, 1);
      }
      // Si no quedan especiales, programar siguiente spawn especial
      if (spawnerCtrl.melons.length === 0 && spawnerCtrl.orbs.length === 0 && spawnerCtrl.bombs.length === 0) {
        this.game.scheduleNextSpecial();
      }
    }
  }
} 
import Game from './js/game/Game.js';

document.addEventListener('DOMContentLoaded', () => {
  const game = new Game({
    canvasId: 'gameCanvas',
    startScreenId: 'startScreen',
    startButtonId: 'startButton',
    scoreButtonId: 'scoreButton',
    modalId: 'modal',
    closeModalId: 'closeModal',
    highScoresListId: 'highScoresList',
    cardSlotIds: ['card1', 'card2', 'card3']
  });
  game.init();
  // Prevenir menú contextual en los botones de dirección
  document.querySelectorAll('.control-button').forEach(btn => btn.addEventListener('contextmenu', e => e.preventDefault()));
  // Prevenir pinch-zoom en navegadores móviles
  document.addEventListener('gesturestart', e => e.preventDefault());
});
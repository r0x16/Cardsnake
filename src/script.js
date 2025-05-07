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
});
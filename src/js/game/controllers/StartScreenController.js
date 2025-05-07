import HighScoreController from './HighScoreController.js';

export default class StartScreenController {
  constructor({ startScreenId, startButtonId, scoreButtonId, modalId, highScoresListId, closeModalId, stageController }) {
    this.stageCtrl = stageController;
    this.startScreen = document.getElementById(startScreenId);
    this.startButton = document.getElementById(startButtonId);
    this.highScoreCtrl = new HighScoreController(scoreButtonId, modalId, highScoresListId, closeModalId);
  }

  init() {
    // Mostrar pantalla de inicio inicialmente
    this.startScreen.style.display = 'flex';

    // Evento click de iniciar partida
    this.startButton.addEventListener('click', () => {
      this.stageCtrl.resetGame();
      this.stageCtrl.startGame();
    });

    // Eventos de teclado para ENTER y ESC
    window.addEventListener('keydown', e => {
      if (e.key === 'Enter' && this.startScreen.style.display === 'flex') {
        this.stageCtrl.resetGame();
        this.stageCtrl.startGame();
      }
      if (e.key === 'Escape' && this.highScoreCtrl.modal.style.display === 'block') {
        this.highScoreCtrl.hide();
        if (this.stageCtrl.isGameOver()) {
          this.show();
        }
      }
    });

    // Mostrar high scores al pulsar botón
    this.highScoreCtrl.onRequestShow(() => {
      const storageKey = 'hallOfFame';
      const scores = JSON.parse(localStorage.getItem(storageKey)) || [];
      this.highScoreCtrl.show(scores);
    });

    // Cerrar modal de high scores
    this.highScoreCtrl.onClose(() => {
      this.highScoreCtrl.hide();
      if (this.stageCtrl.isGameOver()) {
        this.startScreen.style.display = 'flex';
      }
    });

    // Ocultar pantalla de inicio al empezar el juego
    this.stageCtrl.onStart(() => {
      this.hide();
    });
  }

  showHighScores(scores) {
    // Mostrar pantalla de inicio y luego el modal de score
    this.show();
    this.highScoreCtrl.show(scores);
  }

  // Ocultar pantalla de inicio
  hide() {
    this.startScreen.style.display = 'none';
    this.highScoreCtrl.hide();
  }

  // Mostrar pantalla de inicio
  show() {
    this.startScreen.style.display = 'flex';
  }
}
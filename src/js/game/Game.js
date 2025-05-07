import StageController from './controllers/StageController.js';
import BoardController from './controllers/BoardController.js';
import SnakeController from './controllers/SnakeController.js';
import SpawnerController from './controllers/SpawnerController.js';
import ScoreController from './controllers/ScoreController.js';
import CardController from './controllers/CardController.js';
import InputController from './controllers/InputController.js';
import StartScreenController from './controllers/StartScreenController.js';
import Drawer from './Drawer.js';
import CollisionController from './controllers/CollisionController.js';

export default class Game {
  constructor({
    canvasId,
    startScreenId,
    startButtonId,
    scoreButtonId,
    modalId,
    closeModalId,
    highScoresListId,
    cardSlotIds
  }) {
    this.tileSize = 20;
    this.canvasWidth = 400;
    this.canvasHeight = 400;

    // Inicializo los controllers
    this.stageCtrl = new StageController();
    // Inicializar controlador de pantalla de inicio
    this.startScreenCtrl = new StartScreenController({
      startScreenId,
      startButtonId,
      scoreButtonId,
      modalId,
      highScoresListId,
      closeModalId,
      stageController: this.stageCtrl
    });

    // Inicializo los controllers
    this.boardCtrl = new BoardController(canvasId, this.tileSize, this.canvasWidth, this.canvasHeight);
    this.drawer = new Drawer(this.boardCtrl.ctx, this.tileSize);
    this.snakeCtrl = new SnakeController(this.tileSize, this.boardCtrl);
    this.spawnerCtrl = new SpawnerController(this.boardCtrl, this.snakeCtrl, this);
    this.scoreCtrl = new ScoreController(this.boardCtrl);
    this.cardCtrl = new CardController(cardSlotIds, this);
    this.inputCtrl = new InputController(this.snakeCtrl, this.cardCtrl);
    this.collisionCtrl = new CollisionController(this);

    this.gameLoopId = null;
    this.currentTip = '';
    this.bonusActive = false;
    this.bonusTimeoutId = null;
  }

  init() {
    // Inicializar controladores de UI y eventos
    this.inputCtrl.init();
    // Inicializar pantalla de inicio y eventos relacionados
    this.startScreenCtrl.init();

    // Suscribir a eventos de estado del juego
    this.stageCtrl.onReset(() => this.resetGame());
    this.stageCtrl.onStart(() => this.start());
    this.stageCtrl.onEnd(() => this.handleGameOver());

    // Reiniciar juego al iniciar para que la pantalla de inicio funcione
    this.stageCtrl.resetGame();
  }

  resetGame() {
    this.snakeCtrl.reset();
    // Reiniciar spawners
    this.spawnerCtrl.reset();
    this.spawnerCtrl.spawnApple();

    // Reiniciar puntuación y cartas
    this.scoreCtrl.reset();
    this.cardCtrl.reset();
    this.currentTip = '';
    // Reset modo bonus
    this.bonusActive = false;
    if (this.bonusTimeoutId) {
      clearTimeout(this.bonusTimeoutId);
      this.bonusTimeoutId = null;
    }

    if (this.gameLoopId) {
      clearInterval(this.gameLoopId);
      this.gameLoopId = null;
    }
  }

  start() {
    this.startScreenCtrl.hide();
    this.scheduleNextSpecial();
    this.gameLoopId = setInterval(() => {
      this.update();
      this.draw();
    }, 150);
  }

  scheduleNextSpecial() {
    this.spawnerCtrl.scheduleSpecialSpawn();
  }

  update() {
    if (!this.stageCtrl.isRunning()) return;
    // Actualizo spawners y sincronizo estados
    this.spawnerCtrl.update();
    // Delego verificación de colisiones
    this.collisionCtrl.update();
  }

  draw() {
    // Limpiar cabecera y zona de juego
    this.boardCtrl.clearAll();
    // Dibuja puntuación en la cabecera
    this.scoreCtrl.draw();
    // Configurar alineación a la izquierda y centrado vertical para el tip
    this.boardCtrl.ctx.textAlign = 'left';
    this.boardCtrl.ctx.textBaseline = 'middle';
    // Dibuja consejo en la cabecera a la izquierda con fuente pequeña
    if (this.currentTip) {
      this.boardCtrl.drawText(this.currentTip, 60, this.boardCtrl.headerHeight / 2, 'white', '12px Arial');
    }
    // Dibuja manzana, bomba y orbe en el juego
    this.spawnerCtrl.draw(this.drawer);
    // Dibuja serpiente en el juego
    this.snakeCtrl.draw(this.drawer);
  }

  handleGameOver() {
    clearInterval(this.gameLoopId);
    this.recordHighScore();
    this.showHighScores();
  }

  recordHighScore() {
    const storageKey = 'hallOfFame';
    const currentScore = this.scoreCtrl.getScore();
    let scores = JSON.parse(localStorage.getItem(storageKey)) || [];
    // Comprobar si aplica al salón de la fama (top 5)
    if (scores.length < 5 || currentScore > scores[scores.length - 1].score) {
      const lastNameKey = 'lastNameUsed';
      let lastName = localStorage.getItem(lastNameKey) || '';
      let name;
      const regex = /^[A-Za-z0-9]{1,5}$/;
      do {
        name = prompt('¡Nuevo Puntaje! Ingresa un nombre de 1 a 5 caracteres (solo letras o números):', lastName);
      } while (!regex.test(name));
      localStorage.setItem(lastNameKey, name);
      scores.push({ name, score: currentScore });
      scores.sort((a, b) => b.score - a.score);
      scores = scores.slice(0, 5);
      localStorage.setItem(storageKey, JSON.stringify(scores));
    }
  }

  showHighScores() {
    const storageKey = 'hallOfFame';
    const scores = JSON.parse(localStorage.getItem(storageKey)) || [];
    this.startScreenCtrl.showHighScores(scores);
  }
} 
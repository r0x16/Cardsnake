export default class InputController {
  constructor(snakeController, cardController) {
    this.snakeCtrl = snakeController;
    this.cardCtrl = cardController;
  }

  init() {
    // Teclado
    window.addEventListener('keydown', e => this.handleKey(e));
    // Botones táctiles/pantalla
    ['up', 'down', 'left', 'right'].forEach(dir => {
      const btn = document.getElementById(dir);
      if (!btn) return;
      const handler = () => this.handleDirection(dir);
      btn.addEventListener('click', handler);
      btn.addEventListener('touchstart', handler);
    });
  }

  handleKey(e) {
    const d = this.snakeCtrl.snake.tileSize;
    switch (e.key) {
      case 'ArrowUp':
        this.snakeCtrl.setDirection(0, -d);
        break;
      case 'ArrowDown':
        this.snakeCtrl.setDirection(0, d);
        break;
      case 'ArrowLeft':
        this.snakeCtrl.setDirection(-d, 0);
        break;
      case 'ArrowRight':
        this.snakeCtrl.setDirection(d, 0);
        break;
      case '1':
        this.cardCtrl.useCard(0);
        break;
      case '2':
        this.cardCtrl.useCard(1);
        break;
      case '3':
        this.cardCtrl.useCard(2);
        break;
      default:
        break;
    }
  }

  handleDirection(dir) {
    const d = this.snakeCtrl.snake.tileSize;
    if (dir === 'up') this.snakeCtrl.setDirection(0, -d);
    if (dir === 'down') this.snakeCtrl.setDirection(0, d);
    if (dir === 'left') this.snakeCtrl.setDirection(-d, 0);
    if (dir === 'right') this.snakeCtrl.setDirection(d, 0);
  }
} 
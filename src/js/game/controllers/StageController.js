export default class StageController {
  constructor() {
    this.state = 'INIT';
    this.listeners = { start: [], end: [], reset: [] };
  }

  onStart(callback) {
    this.listeners.start.push(callback);
  }

  onEnd(callback) {
    this.listeners.end.push(callback);
  }

  onReset(callback) {
    this.listeners.reset.push(callback);
  }

  startGame() {
    this.state = 'RUNNING';
    this.listeners.start.forEach(cb => cb());
  }

  endGame() {
    this.state = 'GAMEOVER';
    this.listeners.end.forEach(cb => cb());
  }

  resetGame() {
    this.state = 'INIT';
    this.listeners.reset.forEach(cb => cb());
  }

  isRunning() {
    return this.state === 'RUNNING';
  }

  isGameOver() {
    return this.state === 'GAMEOVER';
  }
} 
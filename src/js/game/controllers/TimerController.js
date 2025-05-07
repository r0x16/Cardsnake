export default class TimerController {
  constructor(interval = 150) {
    this.interval = interval;
    this.listeners = [];
    this.id = null;
  }

  onTick(callback) {
    this.listeners.push(callback);
  }

  start() {
    if (this.id) return;
    this.id = setInterval(() => {
      this.listeners.forEach(cb => cb());
    }, this.interval);
  }

  stop() {
    if (!this.id) return;
    clearInterval(this.id);
    this.id = null;
  }
} 
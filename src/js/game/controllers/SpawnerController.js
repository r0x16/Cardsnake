import AppleSpawner from '../spawners/AppleSpawner.js';
import BombSpawner from '../spawners/BombSpawner.js';
import OrbSpawner from '../spawners/OrbSpawner.js';
import MelonSpawner from '../spawners/MelonSpawner.js';
import { randomInt } from '../Utils.js';

export default class SpawnerController {
  constructor(boardController, snakeController, game) {
    this.snakeController = snakeController;
    this.appleSpawner = new AppleSpawner(boardController.board, snakeController.snake, snakeController.snake.tileSize);
    this.bombSpawner = new BombSpawner(boardController.board, snakeController.snake, snakeController.snake.tileSize);
    this.orbSpawner = new OrbSpawner(boardController.board, snakeController.snake, snakeController.snake.tileSize);
    this.melonSpawner = new MelonSpawner(boardController.board, snakeController.snake, snakeController.snake.tileSize);
    this.game = game;
    this.scheduler = null;
  }

  spawnApple() {
    this.appleSpawner.snake = this.snakeController.snake;
    const apples = this.appleSpawner.spawn(this.bombSpawner.bombs, this.orbSpawner.orbs);
    return apples;
  }

  // Permite spawnear bombas desde la carta BomberCard
  spawnBomb() {
    this.bombSpawner.snake = this.snakeController.snake;
    this.bombSpawner.spawn();
  }

  spawnOrb() {
    this.orbSpawner.snake = this.snakeController.snake;
    this.orbSpawner.spawn();
  }

  scheduleSpecialSpawn() {
    const score = this.game.scoreCtrl.getScore();
    let delay;
    let count;
    if (score < 20) {
      delay = randomInt(7000, 11000);
      count = 1;
    } else if (score >= 20 && score <= 60) {
      delay = randomInt(8000, 10000);
      count = randomInt(1, 2);
    } else {
      delay = randomInt(9000, 11000);
      count = randomInt(1, 4);
    }
    this.scheduler = setTimeout(() => {
      for (let i = 0; i < count; i++) {
        this.spawnSpecial();
      }
    }, delay);
  }

  spawnSpecial() {
    this.bombSpawner.snake = this.snakeController.snake;
    this.orbSpawner.snake = this.snakeController.snake;
    this.melonSpawner.snake = this.snakeController.snake;
    const r = Math.random();
    if (r < 0.05) {
      this.melonSpawner.spawn(this.bombSpawner.bombs, this.orbSpawner.orbs);
    } else if (r < 0.4) {
      this.orbSpawner.spawn();
    } else {
      this.bombSpawner.spawn();
    }
  }

  // Actualiza bomba y orbe, maneja expiración y reprograma el siguiente spawn
  update() {
    // Actualizo spawners
    this.appleSpawner.update();
    // Manejo finalización de bombas
    const prevBombs = this.bombSpawner.bombs.length;
    this.bombSpawner.update();
    if (prevBombs > 0 && this.bombSpawner.bombs.length === 0) {
      this.scheduleSpecialSpawn();
    }
    // Manejo finalización de orbes
    const prevOrbs = this.orbSpawner.orbs.length;
    this.orbSpawner.update();
    if (prevOrbs > 0 && this.orbSpawner.orbs.length === 0) {
      this.scheduleSpecialSpawn();
    }
  }

  /**
   * Dibuja la manzana, la bomba y el orbe en el canvas.
   * Ahora recibe el contexto y el Drawer para el orbe.
   * @param {CanvasRenderingContext2D} ctx - Contexto del canvas para manzana y bomba
   * @param {import('../Drawer.js').default} drawer - Drawer para dibujar el orbe
   */
  draw(drawer) {
    // Dibuja manzanas: si el modo bonus está activo, son doradas
    if (this.game.bonusActive) {
      this.appleSpawner.apples.forEach(apple => {
        drawer.drawCell(apple.x, apple.y, 'gold', '#CCCC00');
      });
    } else {
      this.appleSpawner.draw(drawer);
    }
    this.bombSpawner.draw(drawer);
    this.orbSpawner.draw(drawer);
    this.melonSpawner.draw(drawer);
  }

  // limpia las manzanas
  clearApples() {
    this.appleSpawner.apples = [];
  }

  // limpia las bombas
  clearBombs() {
    this.bombSpawner.bombs = [];
    if (this.scheduler) {
      clearTimeout(this.scheduler);
      this.scheduler = null;
    }
    this.scheduleSpecialSpawn();
  }

  // Permite acceder a las manzanas generadas
  get apples() {
    return this.appleSpawner.apples;
  }

  // Agregar método para limpiar bombas y orbes
  clearSpecials() {
    this.bombSpawner.bombs = [];
    this.orbSpawner.orbs = [];
    this.melonSpawner.melons = [];
  }

  reset() {
    this.clearApples();
    this.clearSpecials();
    if (this.scheduler) {
      clearTimeout(this.scheduler);
      this.scheduler = null;
    }
  }

  // Getter para acceder a las bombas
  get bombs() {
    return this.bombSpawner.bombs;
  }

  // Getter para acceder a los orbes
  get orbs() {
    return this.orbSpawner.orbs;
  }

  // Getter para acceder a los melones
  get melons() {
    return this.melonSpawner.melons;
  }
} 
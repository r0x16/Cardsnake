import TipCard from '../cards/TipCard.js';
import HarvestCard from '../cards/HarvestCard.js';
import PartyCard from '../cards/PartyCard.js';
import BomberCard from '../cards/BomberCard.js';
import ShrinkCard from '../cards/ShrinkCard.js';
import ThiefCard from '../cards/ThiefCard.js';
import OracleCard from '../cards/OracleCard.js';
import PoliceCard from '../cards/PoliceCard.js';
import BonusCard from '../cards/BonusCard.js';

export default class CardController {
  constructor(cardSlotIds, game) {
    // game es la instancia principal para pasar a las cartas
    this.game = game;
    this.slots = cardSlotIds.map(id => document.getElementById(id));
    this.cards = Array(this.slots.length).fill(null);
    // Renderizo slots inicialmente (imagen de reverso)
    this.slots.forEach((_, idx) => this.renderSlot(idx));
    // Clases de cartas disponibles
    this.cardClasses = [TipCard, HarvestCard, PartyCard, BomberCard, ShrinkCard, ThiefCard, OracleCard, PoliceCard, BonusCard];
    // Bind de evento para uso de carta en UI
    this.slots.forEach((slot, idx) => {
      slot.addEventListener('click', () => this.useCard(idx));
    });
  }

  // Añade una carta aleatoria a la primera ranura vacía
  addRandomCard() {
    const idx = this.cards.findIndex(c => c === null);
    if (idx < 0) return;
    const CardClass = this.cardClasses[Math.floor(Math.random() * this.cardClasses.length)];
    const card = new CardClass(this.game);
    this.cards[idx] = card;
    this.renderSlot(idx);
    // Animar aparición de la carta
    const slot = this.slots[idx];
    const img = slot.querySelector('img');
    if (img) {
      img.classList.add('card-enter');
      img.addEventListener('animationend', function handler() {
        img.classList.remove('card-enter');
        img.removeEventListener('animationend', handler);
      });
    }
  }

  // Usa la carta en el índice dado
  useCard(idx) {
    const card = this.cards[idx];
    if (!card) return;
    card.use();
    // Animar salida de la carta antes de limpiar
    const slot = this.slots[idx];
    const img = slot.querySelector('img');
    if (img) {
      img.classList.add('card-exit');
      img.addEventListener('animationend', () => {
        this.cards[idx] = null;
        this.renderSlot(idx);
      }, { once: true });
    } else {
      this.cards[idx] = null;
      this.renderSlot(idx);
    }
  }

  // Limpia todas las cartas y slots
  reset() {
    this.cards = Array(this.slots.length).fill(null);
    // Actualizar visualización de cada slot al estado inicial
    this.slots.forEach((_, idx) => this.renderSlot(idx));
  }

  // Renderiza el slot en el índice dado, mostrando la imagen de la carta o el reverso
  renderSlot(idx) {
    const slot = this.slots[idx];
    const card = this.cards[idx];
    const src = card ? card.imageSrc : 'assets/cards/back.png';
    slot.innerHTML = `<img src="${src}" alt="${card ? card.name : 'back'}" width="110" height="168"/>`;
  }
} 
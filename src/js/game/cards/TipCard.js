import Card from './Card.js';

export default class TipCard extends Card {
  constructor(game) {
    super(game);
    this.id = 'Tip';
    this.name = 'Consejo';
  }

  use() {
    // Muestra un tip aleatorio en la cabecera
    this.game.currentTip = this.randomTip();
  }

  randomTip() {
    const tips = [
      'En los 90, Snake unía a toda la familia junto al móvil.',
      'Quien domina Snake corta manzanas al primer intento.',
      'Cada manzana es un trofeo que guarda tu serpiente.',
      'Al llegar a cien puntos, los píxeles te aplauden.',
      'Jugar Snake sin pestañear es un deporte extremo.',
      'La tensión sube con solo un píxel de espacio libre.',
      'Respira hondo antes del giro decisivo de supervivencia.',
      'Tu serpiente interior se enciende con cada mordisco.',
      'Los 3310 no tenían selfies, pero sí historias de Snake.',
      'El silencio en Snake es más potente que la música.',
      'Gritar "¡Yeepa!" al romper tu récord es parte esencial.',
      'La táctica más divertida es esquivar manzanas al azar.',
      'Snake muestra que lo simple puede llevarte muy lejos.',
      'Si tu serpiente hablara, pediría más manzanas.',
      'Nada despierta tanto como un final épico de Snake.',
      'Un giro erróneo y tu cola te enseñará la lección final.',
      'Cada curva perfecta merece un aplauso imaginario.',
      'Snake es el gimnasio oficial para tus ágiles dedos.',
      'La auténtica victoria es la sonrisa tras la partida.',
      'En este mundo de píxeles, cada manzana es pura alegría.',
      'Cada desliz es una oportunidad para superar tu propia marca.',
      'La estrategia más efectiva empieza con un giro anticipado.',
      'Entrenar a diario convierte píxeles en reflejos automáticos.',
      'Los bordes son espejos: úsalos para maniobras maestras.',
      'Un parpadeo imprevisto puede ser tu peor enemigo.',
      'El camino perfecto se construye curva tras curva.',
      'Cosecha manzanas con calma y evita el caos innecesario.',
      'Cada récord roto es un grito silencioso de satisfacción.',
      'La práctica convierte el miedo al choque en pura confianza.',
      'Terminar sin tocar la cola es un logro digno de celebrar.'
    ];
    return tips[Math.floor(Math.random() * tips.length)];
  }
} 
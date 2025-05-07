export default class HighScoreController {
  constructor(scoreButtonId, modalId, listId, closeModalId) {
    this.scoreButton = document.getElementById(scoreButtonId);
    this.modal = document.getElementById(modalId);
    this.list = document.getElementById(listId);
    this.closeButton = document.getElementById(closeModalId);
  }

  onRequestShow(callback) {
    this.scoreButton.addEventListener('click', callback);
  }

  onClose(callback) {
    this.closeButton.addEventListener('click', callback);
  }

  show(scores) {
    if (scores.length === 0) {
      this.list.innerHTML = '<p>No hay puntajes guardados.</p>';
    } else {
      // Generar cabecera y filas de high scores con estilos personalizados
      const headerHtml = `
        <div class="hs-header">
          <span class="hs-cell hs-rank-header"></span>
          <span class="hs-cell hs-medal-header"></span>
          <span class="hs-cell hs-player-header">PLAYER</span>
          <span class="hs-cell hs-score-header">SCORE</span>
        </div>`;
      const rowsHtml = scores.map((s, i) => {
        const pos = i + 1;
        let ordinal = pos === 1 ? '1st' : pos === 2 ? '2nd' : pos === 3 ? '3rd' : pos + 'th';
        const medalImg = pos <= 3 ? `<img src="./assets/${ordinal}.png" alt="Medalla ${ordinal}" width="50" height="50">` : '';
        return `
          <div class="hs-row">
            <span class="hs-cell hs-rank">${ordinal}</span>
            <span class="hs-cell hs-medal">${medalImg}</span>
            <span class="hs-cell hs-player">${s.name}</span>
            <span class="hs-cell hs-score">${s.score}</span>
          </div>`;
      }).join('');
      this.list.innerHTML = `<div class="highscores-container">${headerHtml}${rowsHtml}</div>`;
    }
    this.modal.style.display = 'block';
    // Quitar el foco del botón para que no quede seleccionado y no se pueda activar con Enter
    this.scoreButton.blur();
  }

  hide() {
    this.modal.style.display = 'none';
  }
} 
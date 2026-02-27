import { play } from './game.js';
import { resetState } from './state.js';
import { els, resetUI } from './ui.js';

// type="module" in the HTML script tag guarantees DOM is ready before this executes,
// so no DOMContentLoaded wrapper is needed
els.choiceBtns.forEach(btn => {
  btn.addEventListener('click', () => play(btn.dataset.choice));
});

els.resetBtn.addEventListener('click', () => {
  resetState();
  resetUI();
});
// Cached at module load — querySelector calls are cheap but caching communicates intent
// and avoids repeated DOM traversal if the module is imported multiple times
export const els = {
  playerScore:  document.getElementById('player-score'),
  cpuScore:     document.getElementById('cpu-score'),
  roundCounter: document.getElementById('round-counter'),
  playerChoice: document.getElementById('player-choice'),
  cpuChoice:    document.getElementById('cpu-choice'),
  resultBadge:  document.getElementById('result-badge'),
  resetBtn:     document.getElementById('reset-btn'),
  choiceBtns:   document.querySelectorAll('.choice-btn'),
};

export function setButtonsDisabled(disabled) {
  els.choiceBtns.forEach(btn => (btn.disabled = disabled));
}

export function clearResultClasses(el) {
  el.classList.remove('win', 'lose', 'draw', 'thinking');
}

// Momentarily scales the score display to draw attention to the change
export function bumpScore(el) {
  el.classList.add('bump');
  el.addEventListener('transitionend', () => el.classList.remove('bump'), { once: true });
}

// Applies all visual outcome states in one call — game.js provides the outcome string,
// this function owns all the DOM consequences of that outcome
export function applyOutcome(outcome, playerChoiceEmoji, cpuChoiceEmoji) {
  els.playerChoice.textContent = playerChoiceEmoji;
  els.cpuChoice.textContent    = cpuChoiceEmoji;

  if (outcome === 'win') {
    els.playerChoice.classList.add('win');
    els.cpuChoice.classList.add('lose');
    els.resultBadge.textContent  = '🎉 You win this round!';
    els.resultBadge.className    = 'result-badge win visible';
  } else if (outcome === 'lose') {
    els.playerChoice.classList.add('lose');
    els.cpuChoice.classList.add('win');
    els.resultBadge.textContent  = '😬 CPU wins this round';
    els.resultBadge.className    = 'result-badge lose visible';
    // Shake gives tactile "missed" feedback on the losing choice
    els.playerChoice.style.animation = 'shake 0.4s ease';
    els.playerChoice.addEventListener('animationend', () => {
      els.playerChoice.style.animation = '';
    }, { once: true });
  } else {
    els.playerChoice.classList.add('draw');
    els.cpuChoice.classList.add('draw');
    els.resultBadge.textContent  = '🤝 Draw!';
    els.resultBadge.className    = 'result-badge draw visible';
  }
}

// Restores all display elements to their pre-game placeholder state
export function resetUI() {
  clearResultClasses(els.playerChoice);
  clearResultClasses(els.cpuChoice);
  els.playerChoice.textContent  = '🤔';
  els.cpuChoice.textContent     = '🤖';
  els.playerScore.textContent   = '0';
  els.cpuScore.textContent      = '0';
  els.roundCounter.textContent  = 'Round 1';
  els.resultBadge.className     = 'result-badge';
  els.resultBadge.textContent   = '';
}
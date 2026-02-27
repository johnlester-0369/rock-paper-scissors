import { CHOICES, CHOICE_KEYS } from './constants.js';
import { state } from './state.js';
import { els, setButtonsDisabled, clearResultClasses, bumpScore, applyOutcome } from './ui.js';

export function play(playerChoice) {
  setButtonsDisabled(true);

  // Reset arena visuals from the previous round before showing the new picks
  clearResultClasses(els.playerChoice);
  clearResultClasses(els.cpuChoice);
  els.resultBadge.className   = 'result-badge';
  els.resultBadge.textContent = '';

  // Show player's pick immediately; CPU "thinks" for 500ms for dramatic effect before reveal
  els.playerChoice.textContent = CHOICES[playerChoice].emoji;
  els.cpuChoice.textContent    = '🤖';
  els.cpuChoice.classList.add('thinking');

  setTimeout(() => {
    const cpuChoice = CHOICE_KEYS[Math.floor(Math.random() * CHOICE_KEYS.length)];
    clearResultClasses(els.cpuChoice);

    // "beats" lookup resolves outcome in O(1) without any conditionals per choice pair
    let outcome;
    if (playerChoice === cpuChoice) {
      outcome = 'draw';
    } else if (CHOICES[playerChoice].beats === cpuChoice) {
      outcome = 'win';
    } else {
      outcome = 'lose';
    }

    applyOutcome(outcome, CHOICES[playerChoice].emoji, CHOICES[cpuChoice].emoji);

    // Update score state and animate the changed score display
    if (outcome === 'win') {
      state.playerScore++;
      els.playerScore.textContent = state.playerScore;
      bumpScore(els.playerScore);
    } else if (outcome === 'lose') {
      state.cpuScore++;
      els.cpuScore.textContent = state.cpuScore;
      bumpScore(els.cpuScore);
    }

    state.round++;
    els.roundCounter.textContent = `Round ${state.round}`;
    setButtonsDisabled(false);
  }, 500);
}
// Single source of truth for all mutable session values
export const state = {
  playerScore: 0,
  cpuScore:    0,
  round:       1,
};

// Encapsulates the reset transition — callers don't need to know which fields exist
export function resetState() {
  state.playerScore = 0;
  state.cpuScore    = 0;
  state.round       = 1;
}
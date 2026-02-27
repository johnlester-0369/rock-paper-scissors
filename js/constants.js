// Game rules encoded as a lookup table — O(1) win resolution vs. O(n²) nested if/else
export const CHOICES = {
  rock:     { emoji: '✊', beats: 'scissors' },
  paper:    { emoji: '✋', beats: 'rock'     },
  scissors: { emoji: '✌️', beats: 'paper'   },
};

// Derived at module load time so random CPU selection doesn't need Object.keys() on every round
export const CHOICE_KEYS = Object.keys(CHOICES);
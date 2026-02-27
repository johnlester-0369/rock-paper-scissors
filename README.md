# Rock · Paper · Scissors

A clean, dark-arcade Rock Paper Scissors game built with vanilla HTML, CSS, and JavaScript — no frameworks, no build tools, no dependencies.

**[▶ Play it live](https://johnlester-0369.github.io/rock-paper-scissors)**

---

![Game screenshot showing the dark arcade interface with lime and magenta score identity colors](https://johnlester-0369.github.io/rock-paper-scissors/preview.png)

---

## Features

- Dark arcade aesthetic with electric lime (player) vs. hot magenta (CPU) identity colors
- 500ms CPU "thinking" animation for dramatic effect before the reveal
- Per-round result badge with win / lose / draw states
- Persistent session scoreboard with bump animation on score change
- Fully accessible — semantic HTML, `aria-live` result announcements, `aria-label` on all controls
- Zero dependencies — no npm, no bundler, no runtime libraries

## Tech Stack

| Concern | Solution |
|---------|----------|
| Markup | Semantic HTML5 |
| Styles | Vanilla CSS with custom properties (design tokens) |
| Logic | Vanilla JavaScript — ES Modules |
| Font | [Syne](https://fonts.google.com/specimen/Syne) via Google Fonts |
| Hosting | GitHub Pages |

## Project Structure

```
rock-paper-scissors/
├── index.html          # Markup only — no inline styles or scripts
├── css/
│   └── styles.css      # All styles; design tokens defined in :root
└── js/
    ├── constants.js    # CHOICES lookup table and CHOICE_KEYS array (game rules)
    ├── state.js        # Mutable session state (scores, round counter)
    ├── ui.js           # DOM references and all UI mutation functions
    ├── game.js         # Round orchestration — zero direct DOM access
    └── main.js         # Entry point — event listener wiring only
```

Each JS file has a single, explicit responsibility. Adding a new move (e.g. Lizard/Spock) requires changes only in `constants.js`. Adding score persistence (e.g. `localStorage`) requires changes only in `state.js`.

## Running Locally

ES Modules require an HTTP server — browsers block module imports over `file://` due to CORS restrictions.

```bash
# Clone the repo
git clone https://github.com/johnlester-0369/rock-paper-scissors.git
cd rock-paper-scissors

# Serve with any static file server — npx serve is the zero-install option
npx serve .
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

Any static server works — Python, Live Server (VS Code extension), etc.:

```bash
# Python alternative
python3 -m http.server 3000
```

## How to Play

1. Click **Rock**, **Paper**, or **Scissors**
2. Watch the CPU "think" for a moment, then see the result
3. Score updates automatically — first to as many rounds as you like wins bragging rights
4. Hit **Reset scores** to start a fresh session

## Architecture Notes

**Why five JS modules instead of one script?**  
Each module has a single reason to change. `game.js` resolves outcomes without touching the DOM. `ui.js` owns all DOM mutations without knowing game rules. This separation means a CSS-only change never risks breaking game logic, and vice versa.

**Why no bundler?**  
Native ES Modules work in all modern browsers. Introducing Vite or Webpack would add tooling overhead with no runtime benefit for a five-file static game (YAGNI).

**Why `npx serve .` instead of opening `index.html` directly?**  
ES module imports are blocked by browsers over `file://` protocol. A local HTTP server is the minimal fix — `npx serve .` requires no global install.

## License

MIT — do whatever you like with it.
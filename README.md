# Hand Betting Game

A browser-based prediction game using Mahjong-inspired tiles where you bet on whether your next hand will be higher or lower than your current one.

## Gameplay

1. You are dealt a hand of tiles, each with a point value.
2. Bet **Higher** or **Lower** — will your next hand total more or fewer points than this one?
3. Win bets increase your score; honor tile values in the newly drawn hand shift up.
4. Lose bets do not reduce your score, but honor tile values in the newly drawn hand shift down.
5. Ties are a push — no score change, no value change.
6. The game ends when any honor tile value hits the boundary (0 or 10) or you exhaust your reshuffles.

## Tech Stack

| Layer       | Choice                              |
| ----------- | ----------------------------------- |
| UI          | React 19 + TypeScript               |
| State       | Zustand 5                           |
| Styling     | CSS Modules + CSS custom properties |
| Build       | Vite                                |
| Persistence | localStorage (leaderboard)          |

## Architecture

```text
src/
├── config/
│   └── gameConfig.ts          # All tunable constants (hand size, tie behavior, etc.)
├── domain/
│   ├── tile.ts                # Tile types and interfaces
│   ├── hand.ts                # Hand and history entry interfaces
│   ├── session.ts             # GameSession, GameStatus, GameOverReason
│   └── engine/
│       ├── tileFactory.ts     # Builds the 136-tile deck
│       ├── deckEngine.ts      # Shuffle, draw, discard
│       ├── roundEngine.ts     # Resolve bets, score, update tile values
│       ├── gameOverEngine.ts  # Check end conditions
│       └── index.ts           # Barrel export
├── store/
│   ├── gameStore.ts           # Game state + actions (Zustand)
│   └── leaderboardStore.ts    # Leaderboard with localStorage persistence
├── components/
│   ├── shared/Button.tsx
│   ├── landing/               # LandingPage + Leaderboard
│   └── game/                  # GameScreen, TileCard, HandDisplay,
│                              # BetControls, HandHistory, DeckStatus,
│                              # GameOverScreen
├── utils/
│   └── tileDisplay.ts         # Tile display helpers
└── styles/
    └── tokens.css             # Design tokens (colors, spacing, radii)
```

The domain layer has zero React or Zustand dependencies — it is pure TypeScript logic that can be tested in isolation. Zustand stores act as thin orchestration layers that call engine functions and commit the results to state.

## Key Decisions

**Hand size is configurable** — `GAME_CONFIG.HAND_SIZE` defaults to 3. Change it once and the entire game adapts.

**Tie is a push** — configurable via `GAME_CONFIG.TIE_BEHAVIOR`. Set to `'loss'` to penalize ties instead.

**History entries are snapshots** — each history entry preserves the hand as it appeared when the round resolved, so future tile value changes do not retroactively alter the history display.

**`const` object pattern instead of `enum`** — TypeScript `enum` declarations are not permitted under `erasableSyntaxOnly`. All enums use the `const` object + type alias pattern, which preserves a clean call-site API (`TileType.Number`, `BetDirection.Higher`, etc.).

**Stable primitive selectors** — Zustand uses `useSyncExternalStore`, which requires selector reference equality between renders. Selectors that return new objects on every call can cause infinite render loops, so selectors in this project return primitives or stable references.

**Honor tiles use English labels** — Dragons display as `DR`, `DG`, `DW`; Winds as `E`, `S`, `W`, `N` for clarity and better cross-environment rendering.

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

```bash
npm run build
npm run preview
```

## Possible Extensions

* Difficulty presets (hand size, tile value range, reshuffle limit)
* Streak bonuses for consecutive correct bets
* Animated tile deal and flip transitions
* Multiplayer via WebSocket with a shared deck
* Per-session stats (win rate, longest streak, average score)

## AI Usage

AI tools were used during development to assist with:

* speeding up initial scaffolding and boilerplate code
* suggesting UI structure and component breakdown
* refining some TypeScript typings and edge cases

However, the core architecture, domain design, and validation of logic were carefully reviewed and implemented manually.

All critical decisions such as:

* state management design
* domain-engine separation
* history snapshot handling
* selector stability and bug fixes

were verified and adjusted to ensure correctness and maintainability.

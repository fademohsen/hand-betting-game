import { create } from "zustand";

import { GAME_CONFIG } from "../config/gameConfig";
import { BetDirection, TileValueMap } from "../domain/tile";
import { Hand, HandHistoryEntry } from "../domain/hand";
import { GameSession, GameStatus, GameOverReason } from "../domain/session";
import {
  createInitialDeckState,
  drawTiles,
  discardHand,
  buildHand,
  resolveRound,
  scoreForResult,
  updateTileValues,
  checkGameOver,
} from "../domain/engine";

// ─── Initial state ────────────────────────────────────────────────────────────

function makeIdleSession(): GameSession {
  return {
    status: GameStatus.Idle,
    currentHand: null,
    previousHand: null,
    score: 0,
    deck: createInitialDeckState(),
    tileValues: {},
    history: [],
  };
}

// ─── Store interface ──────────────────────────────────────────────────────────

interface GameStore {
  session: GameSession;
  startNewGame: () => void;
  placeBet: (direction: BetDirection) => void;
  exitGame: () => void;
  resetGame: () => void;
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const useGameStore = create<GameStore>((set) => ({
  session: makeIdleSession(),

  /**
   * Starts a fresh game session:
   *   1. Build a new shuffled deck
   *   2. Draw the first hand (no prior bet to resolve)
   *   3. Set status → Playing
   */
  startNewGame: () => {
    const deck = createInitialDeckState();
    const tileValues: TileValueMap = {};

    const { drawn, deck: updatedDeck } = drawTiles(deck, GAME_CONFIG.HAND_SIZE);
    const currentHand: Hand = buildHand(drawn, tileValues);

    set({
      session: {
        status: GameStatus.Playing,
        currentHand,
        previousHand: null,
        score: 0,
        deck: updatedDeck,
        tileValues,
        history: [],
      },
    });
  },

  /**
   * Resolves the current round and advances the game:
   *   1. Treat currentHand as the previousHand (the hand that was bet on)
   *   2. Discard its tiles into the discard pile
   *   3. Draw a new hand — triggers reshuffle if draw pile runs low
   *   4. Resolve the bet (higher / lower) against the new hand's total
   *   5. Update score
   *   6. Scale honor tile values based on win / loss / tie
   *   7. Check game-over conditions
   *   8. Append the resolved previousHand to history
   *   9. Advance currentHand → newHand
   */
  placeBet: (direction: BetDirection) => {
    set((state) => {
      const { session } = state;

      if (session.status !== GameStatus.Playing || !session.currentHand) {
        return state;
      }

      const previousHand = session.currentHand;

      // Move previous hand tiles to discard before drawing
      const deckAfterDiscard = discardHand(session.deck, previousHand.tiles);

      // Draw new hand — reshuffle is handled inside drawTiles
      const { drawn, deck: updatedDeck } = drawTiles(
        deckAfterDiscard,
        GAME_CONFIG.HAND_SIZE,
      );
      const newHand = buildHand(drawn, session.tileValues);

      // Resolve round
      const result = resolveRound(previousHand, newHand, direction);
      const scoreGained = scoreForResult(result);

      // Update honor tile values based on result (applied to tiles in newHand)
      const newTileValues = updateTileValues(
        newHand,
        result,
        session.tileValues,
      );

      // Check game-over after value updates and deck state change
      const gameOverReason = checkGameOver(newTileValues, updatedDeck);

      // Record the resolved hand in history
      const historyEntry: HandHistoryEntry = {
        hand: previousHand,
        bet: direction,
        result,
        scoreGained,
      };

      return {
        session: {
          ...session,
          status: gameOverReason ? GameStatus.GameOver : GameStatus.Playing,
          currentHand: newHand,
          previousHand,
          score: session.score + scoreGained,
          deck: updatedDeck,
          tileValues: newTileValues,
          history: [...session.history, historyEntry],
          gameOverReason: gameOverReason ?? undefined,
        },
      };
    });
  },

  /**
   * Returns to the landing page without resetting the session.
   * The session is kept so the game-over screen can still display the final score.
   */
  exitGame: () => {
    set((state) => ({
      session: { ...state.session, status: GameStatus.Idle },
    }));
  },

  /**
   * Fully resets all session state back to idle.
   * Called from the game-over screen when starting fresh.
   */
  resetGame: () => {
    set({ session: makeIdleSession() });
  },
}));

// ─── Derived selectors ────────────────────────────────────────────────────────
// Prefer small, named selectors over selecting the whole session in components.

export const selectSession = (s: GameStore) => s.session;
export const selectStatus = (s: GameStore) => s.session.status;
export const selectCurrentHand = (s: GameStore) => s.session.currentHand;
export const selectPreviousHand = (s: GameStore) => s.session.previousHand;
export const selectScore = (s: GameStore) => s.session.score;
export const selectDeck = (s: GameStore) => s.session.deck;
export const selectTileValues = (s: GameStore) => s.session.tileValues;
export const selectHistory = (s: GameStore) => s.session.history;
export const selectGameOver = (s: GameStore) => ({
  reason: s.session.gameOverReason,
  score: s.session.score,
});

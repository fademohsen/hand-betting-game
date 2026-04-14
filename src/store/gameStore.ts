import { create } from 'zustand';

import type { TileValueMap } from '../domain/tile';
import type { Hand, HandHistoryEntry } from '../domain/hand';
import type { GameSession } from '../domain/session';
import { BetDirection } from '../domain/tile';
import { GameStatus } from '../domain/session';
import { GAME_CONFIG } from '../config/gameConfig';
import {
  createInitialDeckState,
  drawTiles,
  discardHand,
  buildHand,
  resolveRound,
  scoreForResult,
  updateTileValues,
  checkGameOver,
} from '../domain/engine';

function makeIdleSession(): GameSession {
  return {
    status:       GameStatus.Idle,
    currentHand:  null,
    previousHand: null,
    score:        0,
    deck:         createInitialDeckState(),
    tileValues:   {},
    history:      [],
  };
}

interface GameStore {
  session:      GameSession;
  startNewGame: () => void;
  placeBet:     (direction: BetDirection) => void;
  exitGame:     () => void;
  resetGame:    () => void;
}

export const useGameStore = create<GameStore>((set) => ({
  session: makeIdleSession(),

  startNewGame: () => {
    const deck                               = createInitialDeckState();
    const tileValues: TileValueMap           = {};
    const { drawn, deck: updatedDeck }       = drawTiles(deck, GAME_CONFIG.HAND_SIZE);
    const currentHand: Hand                  = buildHand(drawn, tileValues);

    set({
      session: {
        status: GameStatus.Playing,
        currentHand,
        previousHand: null,
        score:        0,
        deck:         updatedDeck,
        tileValues,
        history:      [],
      },
    });
  },

  placeBet: (direction: BetDirection) => {
    set((state) => {
      const { session } = state;

      if (session.status !== GameStatus.Playing || !session.currentHand) return state;

      const previousHand                         = session.currentHand;
      const deckAfterDiscard                     = discardHand(session.deck, previousHand.tiles);
      const { drawn, deck: updatedDeck }         = drawTiles(deckAfterDiscard, GAME_CONFIG.HAND_SIZE);
      const newHand                              = buildHand(drawn, session.tileValues);
      const result                               = resolveRound(previousHand, newHand, direction);
      const scoreGained                          = scoreForResult(result);
      const newTileValues                        = updateTileValues(newHand, result, session.tileValues);
      const gameOverReason                       = checkGameOver(newTileValues, updatedDeck);

      const historyEntry: HandHistoryEntry = { hand: previousHand, bet: direction, result, scoreGained };

      return {
        session: {
          ...session,
          status:         gameOverReason ? GameStatus.GameOver : GameStatus.Playing,
          currentHand:    newHand,
          previousHand,
          score:          session.score + scoreGained,
          deck:           updatedDeck,
          tileValues:     newTileValues,
          history:        [...session.history, historyEntry],
          gameOverReason: gameOverReason ?? undefined,
        },
      };
    });
  },

  exitGame: () => {
    set((state) => ({ session: { ...state.session, status: GameStatus.Idle } }));
  },

  resetGame: () => {
    set({ session: makeIdleSession() });
  },
}));

export const selectSession      = (s: GameStore) => s.session;
export const selectStatus       = (s: GameStore) => s.session.status;
export const selectCurrentHand  = (s: GameStore) => s.session.currentHand;
export const selectPreviousHand = (s: GameStore) => s.session.previousHand;
export const selectScore        = (s: GameStore) => s.session.score;
export const selectDeck         = (s: GameStore) => s.session.deck;
export const selectTileValues   = (s: GameStore) => s.session.tileValues;
export const selectHistory      = (s: GameStore) => s.session.history;
export const selectGameOver     = (s: GameStore) => ({ reason: s.session.gameOverReason, score: s.session.score });

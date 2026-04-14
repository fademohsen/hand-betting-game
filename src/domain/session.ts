import type { Hand, HandHistoryEntry } from './hand';
import type { DeckState } from './deck';
import type { TileValueMap } from './tile';

export const GameStatus = {
  Idle:     'idle',
  Playing:  'playing',
  GameOver: 'game-over',
} as const;
export type GameStatus = typeof GameStatus[keyof typeof GameStatus];

export const GameOverReason = {
  TileValueLimit: 'tile-value-limit',
  MaxReshuffles:  'max-reshuffles',
} as const;
export type GameOverReason = typeof GameOverReason[keyof typeof GameOverReason];

export interface GameSession {
  status:          GameStatus;
  currentHand:     Hand | null;
  previousHand:    Hand | null;
  score:           number;
  deck:            DeckState;
  tileValues:      TileValueMap;
  history:         HandHistoryEntry[];
  gameOverReason?: GameOverReason;
}

import type { Hand, HandHistoryEntry } from './hand';
import type { DeckState } from './deck';
import type { TileValueMap } from './tile';

export enum GameStatus {
  Idle     = 'idle',
  Playing  = 'playing',
  GameOver = 'game-over',
}

export enum GameOverReason {
  TileValueLimit = 'tile-value-limit',
  MaxReshuffles  = 'max-reshuffles',
}

export interface GameSession {
  status:          GameStatus;
  currentHand:     Hand | null;
  previousHand:    Hand | null;
  score:           number;
  deck:            DeckState;
  /** Honor tile values tracked globally for the duration of this session */
  tileValues:      TileValueMap;
  history:         HandHistoryEntry[];
  gameOverReason?: GameOverReason;
}

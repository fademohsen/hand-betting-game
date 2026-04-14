import type { Tile } from './tile';
import type { BetDirection, RoundResult } from './tile';

export interface Hand {
  tiles: Tile[];
  total: number;
}

/**
 * Snapshot of one round stored in history.
 * `bet` and `result` are null for the first hand (no prior prediction to resolve).
 */
export interface HandHistoryEntry {
  hand:        Hand;
  bet:         BetDirection | null;
  result:      RoundResult  | null;
  scoreGained: number;
}

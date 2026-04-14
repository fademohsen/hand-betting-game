import type { Tile } from './tile';
import { BetDirection, RoundResult } from './tile';

export interface Hand {
  tiles: Tile[];
  total: number;
}

/**
 * Snapshot of one completed round stored in the history log.
 *
 * `bet` and `result` are null for the very first hand drawn,
 * which has no prior prediction to resolve against.
 */
export interface HandHistoryEntry {
  hand:        Hand;
  bet:         BetDirection | null;
  result:      RoundResult  | null;
  scoreGained: number;
}

// Re-export so consumers can import everything hand-related from one place
export { BetDirection, RoundResult };

import { TileType, TileValueMap, BetDirection, RoundResult } from '../tile';
import { Hand } from '../hand';
import { GAME_CONFIG } from '../../config/gameConfig';

// ─── Bet resolution ──────────────────────────────────────────────────────────

/**
 * Compares the previous and new hand totals against the player's bet.
 */
export function resolveRound(
  previousHand: Hand,
  newHand:      Hand,
  bet:          BetDirection,
): RoundResult {
  if (newHand.total > previousHand.total) {
    return bet === BetDirection.Higher ? RoundResult.Win : RoundResult.Loss;
  }

  if (newHand.total < previousHand.total) {
    return bet === BetDirection.Lower ? RoundResult.Win : RoundResult.Loss;
  }

  // Totals are equal — apply configured tie behavior
  if (GAME_CONFIG.TIE_BEHAVIOR === 'loss') return RoundResult.Loss;
  return RoundResult.Tie;
}

// ─── Score ───────────────────────────────────────────────────────────────────

export function scoreForResult(result: RoundResult): number {
  return result === RoundResult.Win ? 1 : 0;
}

// ─── Dynamic tile value scaling ──────────────────────────────────────────────

/**
 * Updates tracked honor tile values based on the round result.
 *
 * Applies only to honor tiles in the NEW hand:
 *   Win  → each honor tile tileKey +1
 *   Loss → each honor tile tileKey -1
 *   Tie  → no change
 *
 * Values are clamped to [TILE_VALUE_MIN, TILE_VALUE_MAX].
 * Returns a new map — does not mutate the input.
 */
export function updateTileValues(
  newHand:    Hand,
  result:     RoundResult,
  tileValues: TileValueMap,
): TileValueMap {
  if (result === RoundResult.Tie) return tileValues;

  const delta = result === RoundResult.Win ? 1 : -1;
  const updated = { ...tileValues };

  for (const tile of newHand.tiles) {
    if (tile.type === TileType.Honor) {
      const current = updated[tile.tileKey] ?? GAME_CONFIG.STARTING_TILE_VALUE;
      updated[tile.tileKey] = Math.min(
        GAME_CONFIG.TILE_VALUE_MAX,
        Math.max(GAME_CONFIG.TILE_VALUE_MIN, current + delta),
      );
    }
  }

  return updated;
}

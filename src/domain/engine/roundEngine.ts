import type { TileValueMap } from '../tile';
import type { Hand } from '../hand';
import { TileType, BetDirection, RoundResult } from '../tile';
import { GAME_CONFIG } from '../../config/gameConfig';

export function resolveRound(previousHand: Hand, newHand: Hand, bet: BetDirection): RoundResult {
  if (newHand.total > previousHand.total) {
    return bet === BetDirection.Higher ? RoundResult.Win : RoundResult.Loss;
  }
  if (newHand.total < previousHand.total) {
    return bet === BetDirection.Lower ? RoundResult.Win : RoundResult.Loss;
  }
  // Tie — behaviour is configurable
  return GAME_CONFIG.TIE_BEHAVIOR === 'loss' ? RoundResult.Loss : RoundResult.Tie;
}

export function scoreForResult(result: RoundResult): number {
  return result === RoundResult.Win ? 1 : 0;
}

/**
 * Scales honor tiles that appear in `newHand` based on the round result.
 * Win → +1, Loss → -1, Tie → no change. Values clamped to [MIN, MAX].
 */
export function updateTileValues(
  newHand:    Hand,
  result:     RoundResult,
  tileValues: TileValueMap,
): TileValueMap {
  if (result === RoundResult.Tie) return tileValues;

  const delta   = result === RoundResult.Win ? 1 : -1;
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

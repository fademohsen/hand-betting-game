import { TileValueMap } from '../tile';
import { DeckState } from '../deck';
import { GameOverReason } from '../session';
import { GAME_CONFIG } from '../../config/gameConfig';

/**
 * Returns the reason the game should end, or null if the game can continue.
 * Checked after each round resolves.
 */
export function checkGameOver(
  tileValues:  TileValueMap,
  deck:        DeckState,
): GameOverReason | null {
  // Condition 1: any honor tile has reached the min or max value boundary
  for (const value of Object.values(tileValues)) {
    if (value <= GAME_CONFIG.TILE_VALUE_MIN || value >= GAME_CONFIG.TILE_VALUE_MAX) {
      return GameOverReason.TileValueLimit;
    }
  }

  // Condition 2: deck has been reshuffled the maximum number of times
  if (deck.reshuffleCount >= GAME_CONFIG.MAX_RESHUFFLES) {
    return GameOverReason.MaxReshuffles;
  }

  return null;
}

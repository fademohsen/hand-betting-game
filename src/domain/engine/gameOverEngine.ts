import type { TileValueMap } from '../tile';
import type { DeckState } from '../deck';
import { GameOverReason } from '../session';
import { GAME_CONFIG } from '../../config/gameConfig';

export function checkGameOver(tileValues: TileValueMap, deck: DeckState): GameOverReason | null {
  for (const value of Object.values(tileValues)) {
    if (value <= GAME_CONFIG.TILE_VALUE_MIN || value >= GAME_CONFIG.TILE_VALUE_MAX) {
      return GameOverReason.TileValueLimit;
    }
  }

  if (deck.reshuffleCount >= GAME_CONFIG.MAX_RESHUFFLES) {
    return GameOverReason.MaxReshuffles;
  }

  return null;
}

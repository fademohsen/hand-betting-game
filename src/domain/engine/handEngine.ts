import { Tile, TileType, TileValueMap } from '../tile';
import { Hand } from '../hand';
import { GAME_CONFIG } from '../../config/gameConfig';

/**
 * Resolves the current value of a tile.
 * Number tiles always use their rank.
 * Honor tiles look up the tracked value; fall back to STARTING_TILE_VALUE if unseen.
 */
export function resolveTileValue(tile: Tile, tileValues: TileValueMap): number {
  if (tile.type === TileType.Number) {
    return tile.rank!;
  }
  return tileValues[tile.tileKey] ?? GAME_CONFIG.STARTING_TILE_VALUE;
}

/**
 * Builds a Hand from a set of drawn tiles and the current value map.
 */
export function buildHand(tiles: Tile[], tileValues: TileValueMap): Hand {
  const total = tiles.reduce(
    (sum, tile) => sum + resolveTileValue(tile, tileValues),
    0,
  );
  return { tiles, total };
}

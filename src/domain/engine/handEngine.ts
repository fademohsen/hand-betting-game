import type { Tile, TileValueMap } from '../tile';
import type { Hand } from '../hand';
import { TileType } from '../tile';
import { GAME_CONFIG } from '../../config/gameConfig';

export function resolveTileValue(tile: Tile, tileValues: TileValueMap): number {
  if (tile.type === TileType.Number) return tile.rank!;
  return tileValues[tile.tileKey] ?? GAME_CONFIG.STARTING_TILE_VALUE;
}

export function buildHand(tiles: Tile[], tileValues: TileValueMap): Hand {
  const total = tiles.reduce((sum, tile) => sum + resolveTileValue(tile, tileValues), 0);
  return { tiles, total };
}

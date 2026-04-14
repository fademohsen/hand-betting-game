import type { Tile } from '../tile';
import { TileType, TileSuit, DragonVariant, WindVariant } from '../tile';

const SUIT_SYMBOLS: Record<TileSuit, string> = {
  [TileSuit.Characters]: 'm',
  [TileSuit.Bamboo]:     'b',
  [TileSuit.Circles]:    'c',
  [TileSuit.Dragon]:     '',
  [TileSuit.Wind]:       '',
};

const DRAGON_SYMBOLS: Record<DragonVariant, string> = {
  [DragonVariant.Red]:   '中',
  [DragonVariant.Green]: '發',
  [DragonVariant.White]: '白',
};

const WIND_SYMBOLS: Record<WindVariant, string> = {
  [WindVariant.East]:  '東',
  [WindVariant.South]: '南',
  [WindVariant.West]:  '西',
  [WindVariant.North]: '北',
};

const NUMBER_SUITS: TileSuit[] = [TileSuit.Characters, TileSuit.Bamboo, TileSuit.Circles];
const COPIES_PER_TILE = 4;

function makeNumberTiles(): Tile[] {
  const tiles: Tile[] = [];
  for (const suit of NUMBER_SUITS) {
    for (let rank = 1; rank <= 9; rank++) {
      const tileKey = `${suit}-${rank}`;
      for (let copy = 0; copy < COPIES_PER_TILE; copy++) {
        tiles.push({
          id: `${tileKey}-${copy}`,
          tileKey,
          type: TileType.Number,
          suit,
          rank,
          symbol: `${rank}${SUIT_SYMBOLS[suit]}`,
        });
      }
    }
  }
  return tiles;
}

function makeDragonTiles(): Tile[] {
  const tiles: Tile[] = [];
  for (const variant of Object.values(DragonVariant)) {
    const tileKey = `dragon-${variant}`;
    for (let copy = 0; copy < COPIES_PER_TILE; copy++) {
      tiles.push({
        id: `${tileKey}-${copy}`,
        tileKey,
        type: TileType.Honor,
        suit: TileSuit.Dragon,
        variant,
        symbol: DRAGON_SYMBOLS[variant],
      });
    }
  }
  return tiles;
}

function makeWindTiles(): Tile[] {
  const tiles: Tile[] = [];
  for (const variant of Object.values(WindVariant)) {
    const tileKey = `wind-${variant}`;
    for (let copy = 0; copy < COPIES_PER_TILE; copy++) {
      tiles.push({
        id: `${tileKey}-${copy}`,
        tileKey,
        type: TileType.Honor,
        suit: TileSuit.Wind,
        variant,
        symbol: WIND_SYMBOLS[variant],
      });
    }
  }
  return tiles;
}

/** Returns a complete unshuffled 136-tile Mahjong deck. */
export function createDeck(): Tile[] {
  return [...makeNumberTiles(), ...makeDragonTiles(), ...makeWindTiles()];
}

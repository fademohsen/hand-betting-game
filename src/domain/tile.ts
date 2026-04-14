export enum TileType {
  Number = 'number',
  Honor  = 'honor',
}

export enum TileSuit {
  Characters = 'characters',
  Bamboo     = 'bamboo',
  Circles    = 'circles',
  Dragon     = 'dragon',
  Wind       = 'wind',
}

export enum DragonVariant {
  Red   = 'red',
  Green = 'green',
  White = 'white',
}

export enum WindVariant {
  East  = 'east',
  South = 'south',
  West  = 'west',
  North = 'north',
}

export enum BetDirection {
  Higher = 'higher',
  Lower  = 'lower',
}

export enum RoundResult {
  Win  = 'win',
  Loss = 'loss',
  Tie  = 'tie',
}

/**
 * One physical tile in the deck.
 *
 * `id`      — unique per physical copy  (e.g. "dragon-red-2")
 * `tileKey` — shared by all copies of the same tile identity (e.g. "dragon-red")
 *             used as the lookup key in TileValueMap for dynamic value tracking
 */
export interface Tile {
  id:       string;
  tileKey:  string;
  type:     TileType;
  suit:     TileSuit;
  rank?:    number;
  variant?: DragonVariant | WindVariant;
  symbol:   string;
}

/**
 * Tracks the current value of each honor tile identity within a game session.
 * Number tiles are excluded — their value is always derived from `rank`.
 */
export type TileValueMap = Record<string, number>;

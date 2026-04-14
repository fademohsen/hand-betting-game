export const TileType = {
  Number: 'number',
  Honor:  'honor',
} as const;
export type TileType = typeof TileType[keyof typeof TileType];

export const TileSuit = {
  Characters: 'characters',
  Bamboo:     'bamboo',
  Circles:    'circles',
  Dragon:     'dragon',
  Wind:       'wind',
} as const;
export type TileSuit = typeof TileSuit[keyof typeof TileSuit];

export const DragonVariant = {
  Red:   'red',
  Green: 'green',
  White: 'white',
} as const;
export type DragonVariant = typeof DragonVariant[keyof typeof DragonVariant];

export const WindVariant = {
  East:  'east',
  South: 'south',
  West:  'west',
  North: 'north',
} as const;
export type WindVariant = typeof WindVariant[keyof typeof WindVariant];

export const BetDirection = {
  Higher: 'higher',
  Lower:  'lower',
} as const;
export type BetDirection = typeof BetDirection[keyof typeof BetDirection];

export const RoundResult = {
  Win:  'win',
  Loss: 'loss',
  Tie:  'tie',
} as const;
export type RoundResult = typeof RoundResult[keyof typeof RoundResult];

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

/** Tracks the current value of each honor tile identity within a game session. */
export type TileValueMap = Record<string, number>;

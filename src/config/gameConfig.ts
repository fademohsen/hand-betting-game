export const GAME_CONFIG = {
  HAND_SIZE: 3,
  TIE_BEHAVIOR: 'push',       // 'push' | 'loss'
  STARTING_TILE_VALUE: 5,
  TILE_VALUE_MIN: 0,
  TILE_VALUE_MAX: 10,
  MAX_RESHUFFLES: 3,
  LEADERBOARD_SIZE: 5,
} as const;

export type TieBehavior = 'push' | 'loss';

import type { Tile } from './tile';

export interface DeckState {
  drawPile:      Tile[];
  discardPile:   Tile[];
  reshuffleCount: number;
}

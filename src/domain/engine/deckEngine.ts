import type { Tile } from '../tile';
import type { DeckState } from '../deck';
import { GAME_CONFIG } from '../../config/gameConfig';
import { createDeck } from './tileFactory';

/** Fisher-Yates shuffle — returns a new array, does not mutate input. */
export function shuffleDeck(tiles: Tile[]): Tile[] {
  const deck = [...tiles];
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

export function createInitialDeckState(): DeckState {
  return {
    drawPile:       shuffleDeck(createDeck()),
    discardPile:    [],
    reshuffleCount: 0,
  };
}

/** Combines the discard pile with a fresh deck and shuffles into a new draw pile. */
export function reshuffle(deck: DeckState): DeckState {
  return {
    drawPile:       shuffleDeck([...deck.discardPile, ...createDeck()]),
    discardPile:    [],
    reshuffleCount: deck.reshuffleCount + 1,
  };
}

export interface DrawResult {
  drawn: Tile[];
  deck:  DeckState;
}

/** Draws `count` tiles, reshuffling first if the draw pile is insufficient. */
export function drawTiles(deck: DeckState, count: number = GAME_CONFIG.HAND_SIZE): DrawResult {
  const workingDeck = deck.drawPile.length < count ? reshuffle(deck) : deck;
  const drawn       = workingDeck.drawPile.slice(0, count);
  return {
    drawn,
    deck: { ...workingDeck, drawPile: workingDeck.drawPile.slice(count) },
  };
}

export function discardHand(deck: DeckState, tiles: Tile[]): DeckState {
  return { ...deck, discardPile: [...deck.discardPile, ...tiles] };
}

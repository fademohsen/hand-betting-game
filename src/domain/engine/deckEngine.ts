import { Tile } from '../tile';
import { DeckState } from '../deck';
import { GAME_CONFIG } from '../../config/gameConfig';
import { createDeck } from './tileFactory';

// ─── Shuffle ─────────────────────────────────────────────────────────────────

/** Fisher-Yates shuffle — returns a new array, does not mutate input */
export function shuffleDeck(tiles: Tile[]): Tile[] {
  const deck = [...tiles];

  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  return deck;
}

// ─── Initial state ───────────────────────────────────────────────────────────

export function createInitialDeckState(): DeckState {
  return {
    drawPile:      shuffleDeck(createDeck()),
    discardPile:   [],
    reshuffleCount: 0,
  };
}

// ─── Reshuffle ───────────────────────────────────────────────────────────────

/**
 * Combines the discard pile with a fresh deck, shuffles, and resets.
 * Called whenever the draw pile has fewer tiles than HAND_SIZE.
 */
export function reshuffle(deck: DeckState): DeckState {
  const combined = [...deck.discardPile, ...createDeck()];

  return {
    drawPile:      shuffleDeck(combined),
    discardPile:   [],
    reshuffleCount: deck.reshuffleCount + 1,
  };
}

// ─── Draw ────────────────────────────────────────────────────────────────────

export interface DrawResult {
  drawn: Tile[];
  deck:  DeckState;
}

/**
 * Draws `count` tiles from the top of the draw pile.
 * Reshuffles first if the draw pile has insufficient tiles.
 * Returns the drawn tiles and the updated deck state.
 */
export function drawTiles(deck: DeckState, count: number = GAME_CONFIG.HAND_SIZE): DrawResult {
  const workingDeck = deck.drawPile.length < count ? reshuffle(deck) : deck;

  const drawn       = workingDeck.drawPile.slice(0, count);
  const remaining   = workingDeck.drawPile.slice(count);

  return {
    drawn,
    deck: {
      ...workingDeck,
      drawPile: remaining,
    },
  };
}

/**
 * Moves the previous hand's tiles into the discard pile.
 */
export function discardHand(deck: DeckState, tiles: Tile[]): DeckState {
  return {
    ...deck,
    discardPile: [...deck.discardPile, ...tiles],
  };
}

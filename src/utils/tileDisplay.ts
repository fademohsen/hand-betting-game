/**
 * Splits a tile symbol into a main character and an optional suit label.
 *
 * Number tiles (e.g. "5m", "3b", "9c") → { main: "5", sub: "m" }
 * Honor tiles  (e.g. "DR", "E")        → { main: "DR" }
 */
export function getTileDisplayParts(symbol: string): { main: string; sub?: string } {
  const SUIT_LABELS = ['m', 'b', 'c'];
  const lastChar    = symbol.slice(-1);

  if (symbol.length > 1 && SUIT_LABELS.includes(lastChar)) {
    return { main: symbol.slice(0, -1), sub: lastChar };
  }

  return { main: symbol };
}

/** Human-readable suit label used in aria attributes */
export function getSuitLabel(sub: string | undefined): string {
  const MAP: Record<string, string> = { m: 'Characters', b: 'Bamboo', c: 'Circles' };
  return sub ? (MAP[sub] ?? '') : '';
}

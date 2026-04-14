import type { Tile, TileValueMap } from '../../domain/tile';
import { TileSuit, TileType } from '../../domain/tile';
import { resolveTileValue } from '../../domain/engine';
import { getTileDisplayParts, getSuitLabel } from '../../utils/tileDisplay';
import styles from './TileCard.module.css';

type Size = 'sm' | 'md';

interface TileCardProps {
  tile:       Tile;
  tileValues: TileValueMap;
  size?:      Size;
}

const SUIT_CLASS: Record<TileSuit, string> = {
  [TileSuit.Characters]: styles.characters,
  [TileSuit.Bamboo]:     styles.bamboo,
  [TileSuit.Circles]:    styles.circles,
  [TileSuit.Dragon]:     styles.dragon,
  [TileSuit.Wind]:       styles.wind,
};

export default function TileCard({ tile, tileValues, size = 'md' }: TileCardProps) {
  const value      = resolveTileValue(tile, tileValues);
  const { main, sub } = getTileDisplayParts(tile.symbol);
  const suitLabel  = tile.type === TileType.Number
    ? getSuitLabel(sub)
    : tile.suit === TileSuit.Dragon ? 'Dragon' : 'Wind';

  const classes = [
    styles.tile,
    styles[size],
    SUIT_CLASS[tile.suit],
  ].join(' ');

  return (
    <div
      className={classes}
      role="img"
      aria-label={`${main}${sub ? ' ' + suitLabel : ''}, value ${value}`}
    >
      <div className={styles.symbolWrapper}>
        <span className={styles.main}>{main}</span>
        {sub && <span className={styles.sub}>{sub}</span>}
      </div>
      <span className={styles.value}>{value}</span>
    </div>
  );
}

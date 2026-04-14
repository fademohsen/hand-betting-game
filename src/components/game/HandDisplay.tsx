import type { Hand } from '../../domain/hand';
import type { TileValueMap } from '../../domain/tile';
import TileCard from './TileCard';
import styles from './HandDisplay.module.css';

interface HandDisplayProps {
  hand:       Hand;
  tileValues: TileValueMap;
  label?:     string;
  tileSize?:  'sm' | 'md';
}

export default function HandDisplay({ hand, tileValues, label, tileSize = 'md' }: HandDisplayProps) {
  return (
    <div className={styles.wrapper}>
      {label && <p className={styles.label}>{label}</p>}

      <div className={styles.tiles}>
        {hand.tiles.map((tile) => (
          <TileCard key={tile.id} tile={tile} tileValues={tileValues} size={tileSize} />
        ))}
      </div>

      <p className={styles.total} data-size={tileSize}>
        {hand.total}
        <span className={styles.totalLabel}>pts</span>
      </p>
    </div>
  );
}

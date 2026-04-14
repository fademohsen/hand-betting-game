import type { Hand } from '../../domain/hand';
import type { TileValueMap } from '../../domain/tile';
import TileCard from './TileCard';
import styles from './HandDisplay.module.css';

interface HandDisplayProps {
  hand:       Hand;
  tileValues: TileValueMap;
  label?:     string;
}

export default function HandDisplay({ hand, tileValues, label }: HandDisplayProps) {
  return (
    <div className={styles.wrapper}>
      {label && <p className={styles.label}>{label}</p>}

      <div className={styles.tiles}>
        {hand.tiles.map((tile) => (
          <TileCard key={tile.id} tile={tile} tileValues={tileValues} />
        ))}
      </div>

      <p className={styles.total}>
        {hand.total}
        <span className={styles.totalLabel}>pts</span>
      </p>
    </div>
  );
}

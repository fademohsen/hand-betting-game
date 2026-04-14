import type { HandHistoryEntry } from '../../domain/hand';
import type { TileValueMap } from '../../domain/tile';
import { RoundResult, BetDirection } from '../../domain/tile';
import { useGameStore, selectHistory, selectTileValues } from '../../store/gameStore';
import HandDisplay from './HandDisplay';
import styles from './HandHistory.module.css';

const RESULT_LABEL: Record<RoundResult, string> = {
  [RoundResult.Win]:  'Win',
  [RoundResult.Loss]: 'Loss',
  [RoundResult.Tie]:  'Tie',
};

const BET_LABEL: Record<BetDirection, string> = {
  [BetDirection.Higher]: '↑ Higher',
  [BetDirection.Lower]:  '↓ Lower',
};

interface EntryRowProps {
  entry:      HandHistoryEntry;
  tileValues: TileValueMap;
}

function EntryRow({ entry, tileValues }: EntryRowProps) {
  // In practice result and bet are always set for history entries,
  // but the type allows null for the initial hand case.
  if (!entry.result || !entry.bet) return null;

  const resultClass = styles[entry.result];

  return (
    <div className={`${styles.entry} ${resultClass}`}>
      <span className={`${styles.badge} ${resultClass}`}>
        {RESULT_LABEL[entry.result]}
      </span>

      <div className={styles.handArea}>
        <HandDisplay hand={entry.hand} tileValues={tileValues} tileSize="sm" />
      </div>

      <span className={styles.betLabel}>{BET_LABEL[entry.bet]}</span>
    </div>
  );
}

export default function HandHistory() {
  const history    = useGameStore(selectHistory);
  const tileValues = useGameStore(selectTileValues);

  if (history.length === 0) return null;

  // Newest entries at top
  const reversed = [...history].reverse();

  return (
    <section className={styles.section}>
      <p className={styles.heading}>History</p>

      <div className={styles.list}>
        {reversed.map((entry, i) => (
          <EntryRow key={i} entry={entry} tileValues={tileValues} />
        ))}
      </div>
    </section>
  );
}

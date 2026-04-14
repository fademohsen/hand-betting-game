import { useLeaderboardStore, selectEntries } from '../../store/leaderboardStore';
import styles from './Leaderboard.module.css';

const RANK_CLASS: Record<number, string> = {
  0: styles.gold,
  1: styles.silver,
  2: styles.bronze,
};

const RANK_LABEL = ['①', '②', '③', '④', '⑤'];

export default function Leaderboard() {
  const entries = useLeaderboardStore(selectEntries);

  return (
    <div className={styles.card}>
      <p className={styles.header}>Leaderboard</p>

      {entries.length === 0 ? (
        <p className={styles.empty}>No scores yet — be the first!</p>
      ) : (
        <ol className={styles.list}>
          {entries.map((entry, i) => (
            <li key={`${entry.playerName}-${entry.date}`} className={styles.entry}>
              <span className={`${styles.rank} ${RANK_CLASS[i] ?? ''}`}>
                {RANK_LABEL[i]}
              </span>
              <span className={styles.name}>{entry.playerName}</span>
              <span className={styles.score}>{entry.score}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

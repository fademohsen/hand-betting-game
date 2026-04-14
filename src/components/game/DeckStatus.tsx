import { useGameStore, selectDeck } from '../../store/gameStore';
import { GAME_CONFIG } from '../../config/gameConfig';
import styles from './DeckStatus.module.css';

export default function DeckStatus() {
  const deck = useGameStore(selectDeck);
  const reshufflesLeft = GAME_CONFIG.MAX_RESHUFFLES - deck.reshuffleCount;

  return (
    <div className={styles.bar} aria-label="Deck status">
      <div className={styles.stat}>
        <span className={styles.statValue}>{deck.drawPile.length}</span>
        <span className={styles.statLabel}>Draw</span>
      </div>

      <div className={styles.divider} aria-hidden="true" />

      <div className={styles.stat}>
        <span className={styles.statValue}>{deck.discardPile.length}</span>
        <span className={styles.statLabel}>Discard</span>
      </div>

      <div className={styles.divider} aria-hidden="true" />

      <div className={styles.stat}>
        <span
          className={`${styles.statValue} ${reshufflesLeft <= 1 ? styles.reshuffleWarning : ''}`}
        >
          {reshufflesLeft}
        </span>
        <span className={styles.statLabel}>Reshuffles left</span>
      </div>
    </div>
  );
}

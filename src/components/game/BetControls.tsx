import { BetDirection } from '../../domain/tile';
import { GameStatus } from '../../domain/session';
import { useGameStore, selectStatus } from '../../store/gameStore';
import Button from '../shared/Button';
import styles from './BetControls.module.css';

export default function BetControls() {
  const placeBet = useGameStore((s) => s.placeBet);
  const status   = useGameStore(selectStatus);
  const disabled = status !== GameStatus.Playing;

  return (
    <div className={styles.wrapper}>
      <p className={styles.prompt}>Will the next hand be…</p>

      <div className={styles.buttons}>
        <Button
          variant="secondary"
          size="lg"
          fullWidth
          disabled={disabled}
          onClick={() => placeBet(BetDirection.Higher)}
          className={styles.higher}
        >
          ↑ Higher
        </Button>

        <Button
          variant="secondary"
          size="lg"
          fullWidth
          disabled={disabled}
          onClick={() => placeBet(BetDirection.Lower)}
          className={styles.lower}
        >
          ↓ Lower
        </Button>
      </div>
    </div>
  );
}

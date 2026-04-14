import { useGameStore, selectScore } from '../../store/gameStore';
import styles from './ScoreDisplay.module.css';

export default function ScoreDisplay() {
  const score = useGameStore(selectScore);

  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>Score</span>
      <span className={styles.score}>{score}</span>
    </div>
  );
}

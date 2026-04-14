import { useGameStore } from '../../store/gameStore';
import Button from '../shared/Button';
import Leaderboard from './Leaderboard';
import styles from './LandingPage.module.css';

export default function LandingPage() {
  const startNewGame = useGameStore((s) => s.startNewGame);

  return (
    <main className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.title}>
          Hand <span>Betting</span> Game
        </h1>

        <p className={styles.subtitle}>
          Predict whether the next hand is higher or lower. How far can you go?
        </p>
      </div>

      <div className={styles.actions}>
        <Button size="lg" fullWidth onClick={startNewGame}>
          New Game
        </Button>
      </div>

      <Leaderboard />
    </main>
  );
}

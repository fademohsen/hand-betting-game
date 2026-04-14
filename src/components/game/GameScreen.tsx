import {
  useGameStore,
  selectCurrentHand,
  selectTileValues,
} from '../../store/gameStore';
import HandDisplay from './HandDisplay';
import BetControls from './BetControls';
import ScoreDisplay from './ScoreDisplay';
import DeckStatus from './DeckStatus';
import Button from '../shared/Button';
import styles from './GameScreen.module.css';

export default function GameScreen() {
  const currentHand = useGameStore(selectCurrentHand);
  const tileValues  = useGameStore(selectTileValues);
  const exitGame    = useGameStore((s) => s.exitGame);

  if (!currentHand) return null;

  return (
    <div className={styles.screen}>
      <header className={styles.header}>
        <Button variant="ghost" size="sm" onClick={exitGame}>
          ← Exit
        </Button>
        <ScoreDisplay />
      </header>

      <main className={styles.main}>
        <HandDisplay
          hand={currentHand}
          tileValues={tileValues}
          label="Current Hand"
        />
        <BetControls />
      </main>

      <DeckStatus />

      {/* Phase 4 — HandHistory */}
      <div className={styles.historyPlaceholder}>
        Hand History — Phase 4
      </div>
    </div>
  );
}

import { useState } from 'react';
import { GameOverReason } from '../../domain/session';
import { useGameStore, selectGameOverScore, selectGameOverReason } from '../../store/gameStore';
import { useLeaderboardStore, selectSubmitScore } from '../../store/leaderboardStore';
import Button from '../shared/Button';
import styles from './GameOverScreen.module.css';

const REASON_TEXT: Record<GameOverReason, string> = {
  [GameOverReason.TileValueLimit]: 'A tile value reached the boundary.',
  [GameOverReason.MaxReshuffles]:  'The deck ran out of reshuffles.',
};

function getScoreMessage(score: number): string {
  if (score >= 10) return 'Exceptional run!';
  if (score >= 7)  return 'Great effort!';
  if (score >= 4)  return 'Nice work!';
  if (score >= 1)  return 'Not bad!';
  return 'Better luck next time.';
}

export default function GameOverScreen() {
  const score  = useGameStore(selectGameOverScore);
  const reason = useGameStore(selectGameOverReason);
  const submitScore       = useLeaderboardStore(selectSubmitScore);
  const resetGame         = useGameStore((s) => s.resetGame);
  const exitGame          = useGameStore((s) => s.exitGame);

  const [playerName, setPlayerName] = useState('');
  const [submitted, setSubmitted]   = useState(false);

  const handleSubmit = () => {
    const name = playerName.trim();
    if (!name) return;
    submitScore(name, score);
    setSubmitted(true);
  };

  return (
    <div className={styles.screen}>
      <div>
        <h1 className={styles.title}>Game Over</h1>
        {reason && <p className={styles.reason}>{REASON_TEXT[reason]}</p>}
      </div>

      <div className={styles.scoreBlock}>
        <span className={styles.scoreLabel}>Final Score</span>
        <span className={styles.score}>{score}</span>
        <span className={styles.scoreMessage}>{getScoreMessage(score)}</span>
      </div>

      {submitted ? (
        <p className={styles.submitted}>✓ Score submitted to the leaderboard!</p>
      ) : (
        <div className={styles.submitForm}>
          <input
            className={styles.input}
            type="text"
            placeholder="Enter your name…"
            value={playerName}
            maxLength={24}
            onChange={(e) => setPlayerName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          />
          <Button
            variant="secondary"
            fullWidth
            disabled={!playerName.trim()}
            onClick={handleSubmit}
          >
            Submit Score
          </Button>
        </div>
      )}

      <div className={styles.actions}>
        <Button variant="primary" fullWidth onClick={resetGame}>
          Play Again
        </Button>
        <Button variant="ghost" fullWidth onClick={exitGame}>
          Exit
        </Button>
      </div>
    </div>
  );
}

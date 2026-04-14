import { useGameStore, selectStatus } from './store/gameStore';
import { GameStatus } from './domain/session';

/**
 * Root router — swaps between views based on game status.
 * Each view will be its own component added in Step 6 (UI).
 */
export default function App() {
  const status = useGameStore(selectStatus);

  return (
    <div style={{ padding: '2rem', color: 'var(--color-text)' }}>
      {status === GameStatus.Idle     && <p>Landing Page (Step 6)</p>}
      {status === GameStatus.Playing  && <p>Game Screen (Step 6)</p>}
      {status === GameStatus.GameOver && <p>Game Over Screen (Step 6)</p>}
    </div>
  );
}

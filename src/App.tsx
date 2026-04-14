import { useGameStore, selectStatus } from './store/gameStore';
import { GameStatus } from './domain/session';
import LandingPage from './components/landing/LandingPage';

/**
 * Root router — swaps between views based on game status.
 * GameScreen and GameOverScreen will be added in subsequent phases.
 */
export default function App() {
  const status = useGameStore(selectStatus);

  return (
    <>
      {status === GameStatus.Idle     && <LandingPage />}
      {status === GameStatus.Playing  && <p style={{ color: 'var(--color-text)', padding: '2rem' }}>Game Screen — Phase 2</p>}
      {status === GameStatus.GameOver && <p style={{ color: 'var(--color-text)', padding: '2rem' }}>Game Over — Phase 5</p>}
    </>
  );
}

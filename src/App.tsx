import { useGameStore, selectStatus } from './store/gameStore';
import { GameStatus } from './domain/session';
import LandingPage  from './components/landing/LandingPage';
import GameScreen   from './components/game/GameScreen';

/**
 * Root router — swaps between views based on game status.
 * GameOverScreen will be added in Phase 5.
 */
export default function App() {
  const status = useGameStore(selectStatus);

  return (
    <>
      {status === GameStatus.Idle     && <LandingPage />}
      {status === GameStatus.Playing  && <GameScreen />}
      {status === GameStatus.GameOver && <p style={{ color: 'var(--color-text)', padding: '2rem' }}>Game Over — Phase 5</p>}
    </>
  );
}

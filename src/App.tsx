import { useGameStore, selectStatus } from './store/gameStore';
import { GameStatus } from './domain/session';
import LandingPage    from './components/landing/LandingPage';
import GameScreen     from './components/game/GameScreen';
import GameOverScreen from './components/game/GameOverScreen';

export default function App() {
  const status = useGameStore(selectStatus);

  return (
    <>
      {status === GameStatus.Idle     && <LandingPage />}
      {status === GameStatus.Playing  && <GameScreen />}
      {status === GameStatus.GameOver && <GameOverScreen />}
    </>
  );
}

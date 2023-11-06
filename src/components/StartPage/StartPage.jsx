import { useState } from 'react';
import CheckersBoard from '../CheckersBoard/CheckersBoard';
import styles from './StartPage.module.css'

function StartPage() {
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = () => {
    setGameStarted(true);
  };

  const handleJoinGame = () => {
    // Logic for continuing the game
  };

  const handleContinueGame = () => {
    // Logic for loading a saved game
  };

  if (gameStarted) {
    return <CheckersBoard />;
  }

  return (
    <div>
      <h1>Checkers Game</h1>
      <div className={styles.buttonWrap}>
      <button onClick={handleStartGame}>Start New Game</button>
      <button onClick={handleJoinGame}>Join Game</button>
      <button onClick={handleContinueGame}>Continue Game</button>
      </div>
    </div>
  );
}

export default StartPage;

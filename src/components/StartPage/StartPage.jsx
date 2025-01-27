import { useState } from 'react';
import CheckersBoard from '../CheckersBoard/CheckersBoard';
import { startNewLobby, joinGame } from '../../api/CheckersApi';
import styles from './StartPage.module.css';

function StartPage() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameId, setGameId] = useState(null); // Track the game ID
  const [playerId] = useState(1); // Example: hardcoded player ID, can be made dynamic

  const handleStartGame = async () => {
    try {
      const newGameData = await startNewLobby(playerId, 'LIGHT');
      if (newGameData && newGameData.gameId) {
        setGameId(newGameData.gameId); // Save gameId from response
        console.log('New Game Started:', newGameData.gameId);
        setGameStarted(true);
      } else {
        console.error('Invalid response:', newGameData);
      }
    } catch (error) {
      console.error('Error starting a new game:', error);
    }
  };

  const handleJoinGame = async () => {
    try {
      if (!gameId) {
        alert('You must start a game first or provide a valid gameId!');
        return;
      }
      const joinGameResponse = await joinGame(gameId, playerId);
      console.log('Joined Game:', joinGameResponse);
      setGameStarted(true); // Redirect to game board after joining
    } catch (error) {
      console.error('Error joining game:', error);
    }
  };

  const handleContinueGame = () => {
    console.log('Continuing game...');
    // Add logic to fetch saved game and navigate to it
  };

  if (gameStarted) {
    return <CheckersBoard gameId={gameId} />;
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

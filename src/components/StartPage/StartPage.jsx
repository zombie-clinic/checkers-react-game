import { useState } from 'react';
import CheckersBoard from '../CheckersBoard/CheckersBoard';
import { startNewLobby, joinGame } from '../../api/CheckersApi';
import styles from './StartPage.module.css';

function StartPage() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameId, setGameId] = useState(null); // Track the game ID
  const [inputGameId, setInputGameId] = useState('');
  const [side, setSide] = useState('');
  const [playerId, setPlayerId] = useState(); // Example: hardcoded player ID, can be made dynamic

  const handleStartGame = async () => {
    try {
      const newGameData = await startNewLobby(1, 'LIGHT'); //playerId = 1 by default
      if (newGameData && newGameData.gameId) {
        setGameId(newGameData.gameId); // Save gameId from response
        setSide('LIGHT');
        setPlayerId(1);
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
      const storedGameId = inputGameId || gameId;
      if (!storedGameId) {
        alert('You must enter a game ID!');
        return;
      }
      setGameId(storedGameId);
      const joinGameResponse = await joinGame(storedGameId, 2); //playerId = 2 by default
      setSide('DARK');
      setPlayerId(2);
      setGameStarted(true);
      console.log('Joined Game:', joinGameResponse);
    } catch (error) {
      console.error('Error joining game:', error);
    }
  };

  const handleContinueGame = () => {
    console.log('Continuing game...');
    // Add logic to fetch saved game and navigate to it
  };

  if (gameStarted) {
    return <CheckersBoard gameId={gameId} side={side} playerId={playerId} />;
  }

  return (
    <div>
      <h1>Checkers Game</h1>
      <div className={styles.buttonWrap}>
        <button onClick={handleStartGame}>Start New Game</button>
        <div className={styles.joinGameContainer}>
          <input
            type="text"
            placeholder="Enter game ID"
            value={inputGameId}
            onChange={e => setInputGameId(e.target.value)}
          />
          <button onClick={handleJoinGame}>Join Game</button>
        </div>
        <button onClick={handleContinueGame}>Continue Game</button>
      </div>
    </div>
  );
}

export default StartPage;

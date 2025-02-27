import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // импортируем для навигации
import { startNewLobby, joinGame } from '../../api/CheckersApi';
import styles from './StartPage.module.css';

function StartPage() {
  const [gameId, setGameId] = useState(null);
  const [inputGameId, setInputGameId] = useState('');
  // const [gameStarted, setGameStarted] = useState(false);
  // const [side, setSide] = useState('');
  // const [playerId, setPlayerId] = useState();
  const navigate = useNavigate(); // Используем навигацию

  const handleStartGame = async () => {
    try {
      const newGameData = await startNewLobby(1, 'LIGHT');
      if (newGameData?.gameId) {
        setGameId(newGameData.gameId);
        // setSide('LIGHT');
        // setPlayerId(1);
        // setGameStarted(true);

        navigate(`/game/${newGameData.gameId}`, {
          state: { side: 'LIGHT', playerId: 1 },
        });
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
      // setSide('DARK');
      // setPlayerId(2);
      // setGameStarted(true);

      navigate(`/game/${storedGameId}`, {
        state: { side: 'DARK', playerId: 2 },
      });
    } catch (error) {
      console.error('Error joining game:', error);
    }
  };

  return (
    <>
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
      </div>
    </>
  );
}

export default StartPage;

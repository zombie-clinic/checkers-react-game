import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  startNewLobby,
  joinGame,
  startImportedGame,
} from '../../api/CheckersApi';
import styles from './StartPage.module.css';

function StartPage() {
  const [gameId, setGameId] = useState(null);
  const [inputGameId, setInputGameId] = useState('');
  const [importGameState, setImportGameState] = useState('');
  const navigate = useNavigate();

  const handleStartGame = async () => {
    try {
      const newGameData = await startNewLobby(1, 'LIGHT');
      if (newGameData?.gameId) {
        setGameId(newGameData.gameId);

        const startingState = newGameData.startingState || '';
        const startingPossibleMoves = newGameData.possibleMoves;
        navigate(`/game/${newGameData.gameId}`, {
          state: {
            side: 'LIGHT',
            playerId: 1,
            startingState,
            startingPossibleMoves,
          },
        });
      }
    } catch (error) {
      console.error('Error starting a new game:', error);
    }
  };

  const handleImportGame = async () => {
    try {
      const state =
        importGameState.trim() === ''
          ? JSON.parse('{"dark":[1,2],"light":[21,17],"kings":[]}')
          : JSON.parse(importGameState.trim());
      const newGameData = await startImportedGame(1, 'LIGHT', state);
      if (newGameData?.gameId) {
        setGameId(newGameData.gameId);

        // todo what would be the default starting state (instead of empty string)
        // see also the same method in handleStartGame
        const startingState = newGameData.startingState || '';
        const startingPossibleMoves = newGameData.possibleMoves;
        navigate(`/game/${newGameData.gameId}`, {
          state: {
            side: 'LIGHT',
            playerId: 1,
            startingState,
            startingPossibleMoves,
          },
        });
      }
    } catch (error) {
      console.error('Error importing a game:', error);
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

      const joinGameData = await joinGame(storedGameId, 2);

      const startingState = joinGameData.startingState || '';
      console.log(
        `Joining game ${storedGameId} with starting state ${startingState}`
      );
      navigate(`/game/${storedGameId}`, {
        state: { side: 'DARK', playerId: 2, startingState },
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
        <div className={styles.joinGameContainer}>
          <input
            type="text"
            placeholder="Enter game state"
            value={importGameState}
            onChange={e => setImportGameState(e.target.value)}
          />
          <button onClick={handleImportGame}>Import Game</button>
        </div>
      </div>
    </>
  );
}

export default StartPage;

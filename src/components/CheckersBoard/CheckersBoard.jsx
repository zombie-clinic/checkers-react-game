import { useState, useEffect } from 'react';
import { startNewLobby } from '../../api/CheckersApi.js';
import CheckersBoardDebug from '../CheckersBoardDebug/CheckersBoardDebug.jsx';
// import StartForm from ../StartForm/StartForm.jsx
import { getCheckersPositions } from '../../api/CheckersApi.js';
import { isArraysEqual } from '../../utils/isArraysEqual.js';
import { getCellColor } from '../../utils/getCellColor.js';
import styles from './CheckersBoard.module.css';
import checkerData from '../../data/newgame.json';
// let gameId = '0a83d555-abfe-42f9-8d46-0d23d7a1d863';

const CheckerBoard = () => {
  const [playerId, setPlayerId] = useState(1); //on gameStart
  const [side, setSide] = useState('LIGHT'); //on gameStart
  const [testGameId, setTestGameId] = useState(''); //on gameStart
  const [gameId, setGameId] = useState('0a83d555-abfe-42f9-8d46-0d23d7a1d863'); //on gameStart
  const [dark, setDark] = useState(checkerData.dark);
  const [light, setLight] = useState(checkerData.light);
  const [isOpponentTurn, setIsOpponentTurn] = useState(true); // opponent's turn is default
  const [possibleMoves, setpossibleMoves] = useState([]); //
  const [startMoveCell, setStartMoveCell] = useState(null); // Начальная клетка
  const [endMoveCell, setEndMoveCell] = useState(null); // Конечная клетка
  const [highlightedCell, setHighlightedCell] = useState(null); // Подсвеченная ячейка

  // Function to start a new game and set gameId and side
  const initializeNewGame = async () => {
    // try {
    const newGameData = await startNewLobby(1, 'LIGHT');
    // setGameId(newGameData.gameId);
    setTestGameId(newGameData.gameId); // REMOVE IT after tests
    setSide(newGameData.side);
    console.log(newGameData.gameId);
    // } catch (error) {
    //   // Handle any request or network errors
    //   console.error('Error starting a new game:', error);
    //   throw error;
    // }
  };

  useEffect(() => {
    // Run the startNewLobby function when the component is loaded
    initializeNewGame();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getCheckersPositions(gameId);
        if (
          !isArraysEqual(data.state.dark, dark) ||
          !isArraysEqual(data.state.light, light)
        ) {
          setDark(data.state.dark);
          setLight(data.state.light);
          setIsOpponentTurn(false); // Update the state variable
          setpossibleMoves(data.possibleMoves);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    const fetchDataInterval = setInterval(() => {
      if (isOpponentTurn) {
        fetchData();
      }
    }, 1000); // 1 time per second

    return () => {
      clearInterval(fetchDataInterval); // Clear the interval when the component unmounts
    };
  }, [gameId, isOpponentTurn, dark, light]); // Add dataFetched to the dependency array

  const handleCellClick = cellNumber => {
    if (startMoveCell === null) {
      // Проверяем, принадлежит ли шашка текущей стороне
      const playerCheckers = side === 'LIGHT' ? light : dark;
      if (playerCheckers.includes(cellNumber)) {
        setStartMoveCell(cellNumber);
        setHighlightedCell(cellNumber); // Подсветка ячейки
      }
    } else {
      // Устанавливаем конечную ячейку
      setEndMoveCell(cellNumber);
      const move = `${startMoveCell}-${cellNumber}`;
      if (possibleMoves.includes(move)) {
        // Валидный ход
        const moveData = {
          side,
          move,
          state: {
            dark,
            light,
          },
          playerId,
        };
        console.log('Move data:', moveData);
        // Отправить данные хода на сервер (добавить)
        // reset состояния после успешного хода
        setStartMoveCell(null);
        setHighlightedCell(null);
      } else {
        // Невалидный ход
        setStartMoveCell(null);
        setHighlightedCell(null);
      }
    }
  };

  console.log(testGameId);

  // Генерация доски
  const renderTable = () => {
    let blackCellCounter = 0;
    return Array.from({ length: 8 }, (_, row) => (
      <tr key={row}>
        {Array.from({ length: 8 }, (_, col) => {
          const cellColor = getCellColor(row, col);
          const isBlackCell = cellColor === 'black';
          const cellNumber = isBlackCell ? ++blackCellCounter : null;
          const isHighlighted = cellNumber === highlightedCell;

          const cellText =
            isBlackCell && dark.includes(cellNumber)
              ? '⚫'
              : isBlackCell && light.includes(cellNumber)
              ? '⚪'
              : '';

          return (
            <td
              key={col}
              className={`${styles.cell} ${styles[cellColor]}`}
              data-number={cellNumber}
              onClick={() => handleCellClick(cellNumber)}
            >
              <div
                className={`${styles.checkerPiece} ${
                  isHighlighted && cellText ? styles.pulsing : ''
                }`}
              >
                {cellText}
              </div>
              <div className={styles.cellLabel}>{cellNumber}</div>
            </td>
          );
        })}
      </tr>
    ));
  };

  return (
    <div>
      <table className={styles.checkerboard}>
        <tbody>{renderTable()}</tbody>
      </table>

      {/* Подключение CheckersBoardDebug */}
      <CheckersBoardDebug
        state={{
          playerId,
          side,
          gameId,
          dark,
          light,
          isOpponentTurn,
          possibleMoves,
          // moveData,
        }}
      />
    </div>
  );
};

export default CheckerBoard;

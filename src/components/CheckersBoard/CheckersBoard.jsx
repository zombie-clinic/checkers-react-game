import { useState, useEffect } from 'react';
import { submitMove, getCheckersPositions } from '../../api/CheckersApi.js';
import CheckersBoardDebug from '../CheckersBoardDebug/CheckersBoardDebug.jsx';
import InfoPanel from '../InfoPanel/InfoPanel.jsx';
import { isArraysEqual } from '../../utils/isArraysEqual.js';
import { getCellColor } from '../../utils/getCellColor.js';
import styles from './CheckersBoard.module.css';
// import checkerData from '../../data/newgame.json'; // переписать, чтобы брать из InitialBoardState.json
// import InitialBoardState from '../../data/InitialBoardState.json';

const CheckerBoard = ({
  gameId,
  side,
  playerId,
  startingState,
  startingPossibleMoves,
}) => {
  const [darkPositions, setDarkPositions] = useState(
    JSON.parse(startingState).dark
  );
  const [lightPositions, setLightPositions] = useState(
    JSON.parse(startingState).light
  );
  const [kings, setKings] = useState(JSON.parse(startingState).kings);
  const [isOpponentTurn, setIsOpponentTurn] = useState(false); // opponent's turn is default
  const [possibleMoves, setPossibleMoves] = useState([]); // move strings [1-2, 2-3, ...]
  const [sideToMove, setSideToMove] = useState();
  const [fullPossibleMoves, setFullPossibleMoves] = useState([]); // full moves object
  const [startMoveCell, setStartMoveCell] = useState(null); // Начальная клетка
  const [highlightedCell, setHighlightedCell] = useState(null); // Подсвеченная ячейка
  const [moveData, setMoveData] = useState(null); // Состояние для moveData только для CheckersBoardDebug!

  // Преобразуем possibleMoves в массив строк и устанавливаем state
  const formatAndSetPossibleMoves = possibleMoves => {
    const formattedMoves = Object.entries(possibleMoves).flatMap(
      ([position, moves]) =>
        moves.map(move => `${position}-${move.destination}`)
    );
    setPossibleMoves(formattedMoves);
  };

  // Функция для обновления состояния доски
  const updateBoardState = async () => {
    try {
      const data = await getCheckersPositions(gameId);
      console.log('Server response:', data);

      if (
        !isArraysEqual(data.serverState.dark, darkPositions) ||
        !isArraysEqual(data.serverState.light, lightPositions)
      ) {
        setDarkPositions(data.serverState.dark);
        setLightPositions(data.serverState.light);
        setKings(data.serverState.kings || []);
        formatAndSetPossibleMoves(data.possibleMoves);
        setFullPossibleMoves(data.possibleMoves);

        // console.log('Server response side:', data.side);
        // console.log('Current player side:', side);
        setIsOpponentTurn(side !== data.side);
        setSideToMove(data.side);
        return data; //REMOVE THIS AFTER TEST
      }
    } catch (error) {
      console.error('Error updating board state:', error);
    }
  };

  useEffect(() => {
    // Создаем начальные ходы один раз при загрузке компонента
    const initializePossibleMoves = () => {
      if (side === 'LIGHT') {
        // Получаем список ходов из startingPossibleMoves
        formatAndSetPossibleMoves(startingPossibleMoves);
        setFullPossibleMoves(startingPossibleMoves);
      } else if (side === 'DARK') {
        updateBoardState();
        setIsOpponentTurn(true); // setting 2nd turn for 'DARK'-side player
      }
    };

    initializePossibleMoves(); // Вызываем функцию инициализации
  }, []); // Выполняется один раз после загрузки

  useEffect(() => {
    // console.log(`Polling: isOpponentTurn=${isOpponentTurn}`);
    const fetchDataInterval = setInterval(() => {
      if (isOpponentTurn) {
        updateBoardState();
      }
    }, 2000); // 1 time per 2 seconds

    return () => {
      clearInterval(fetchDataInterval); // Clear the interval when the component unmounts
    };
  }, [isOpponentTurn, darkPositions, lightPositions]); // Add dataFetched to the dependency array

  const handleCellClick = async cellNumber => {
    if (startMoveCell === null) {
      // Проверяем, принадлежит ли шашка текущей стороне
      const playerCheckers = side === 'LIGHT' ? lightPositions : darkPositions;
      if (playerCheckers.includes(cellNumber)) {
        setStartMoveCell(cellNumber);
        setHighlightedCell(cellNumber); // Подсветка ячейки
      }
    } else {
      // Получаем возможные ходы из fullPossibleMoves
      const moveOptions = fullPossibleMoves[startMoveCell] || [];
      const selectedMove = moveOptions.find(m => m.destination === cellNumber);

      if (selectedMove) {
        // Определяем, является ли ход взятием
        const isCapture = selectedMove.isCapture;
        const move = isCapture
          ? `${startMoveCell}x${cellNumber}`
          : `${startMoveCell}-${cellNumber}`;

        // Валидный ход
        const newMoveData = {
          side,
          move,
          clientState: {
            dark: darkPositions,
            light: lightPositions,
            kings: kings,
          },
          playerId,
        };
        setMoveData(newMoveData); // Обновляем состояние moveData
        console.log('Move data:', newMoveData);
        try {
          // Отправить данные хода на сервер
          await submitMove(gameId, newMoveData);
          console.log('Move successfully submitted:', newMoveData);
          // Reset состояния после успешного хода
          setStartMoveCell(null);
          setHighlightedCell(null);
          // updateBoardState(); // UNCOMMENT BACK AFTER TEST
          const updatedData = await updateBoardState(); // Дожидаемся обновленных данных; REMOVE AFTER TEST
          console.log('Updated board state:', updatedData); // Выводим обновленные данные; REMOVE AFTER TEST
        } catch (error) {
          console.error('Failed to submit move:', error);
        }
      } else {
        // Невалидный ход
        setStartMoveCell(null);
        setHighlightedCell(null);
      }
    }
  };

  // Генерация доски
  const renderTable = () => {
    let blackCellCounter = side === 'LIGHT' ? 0 : 33;
    return Array.from({ length: 8 }, (_, row) => (
      <tr key={row}>
        {Array.from({ length: 8 }, (_, col) => {
          const cellColor = getCellColor(row, col);
          const isBlackCell = cellColor === 'black';
          let cellNumber;
          if (side === 'LIGHT') {
            cellNumber = isBlackCell ? ++blackCellCounter : null;
          } else {
            cellNumber = isBlackCell ? --blackCellCounter : null;
          }

          const isHighlighted = cellNumber === highlightedCell;
          const isKing = kings.includes(cellNumber);
          const isDark = darkPositions.includes(cellNumber);
          const isLight = lightPositions.includes(cellNumber);

          const cellText =
            isBlackCell && isDark ? '⚫' : isBlackCell && isLight ? '⚪' : '';

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
                {isKing && (
                  <div
                    className={styles.king}
                    style={{ color: isDark ? 'white' : 'black' }}
                  >
                    K
                  </div>
                )}
              </div>
              <div className={styles.cellLabel}>{cellNumber}</div>
            </td>
          );
        })}
      </tr>
    ));
  };

  return (
    <div className={styles.container}>
      <div className={styles.boardWrapper}>
        <table className={styles.checkerboard}>
          <tbody>{renderTable()}</tbody>
        </table>
        {/* Подключение InfoPanel */}
        <div className={styles.infopanel}>
          <InfoPanel
            isOpponentTurn={isOpponentTurn}
            side={side}
            data={{
              localState: { dark: darkPositions, light: lightPositions },
            }}
            possibleMoves={possibleMoves}
          />
        </div>
      </div>
      {/* Подключение CheckersBoardDebug */}
      <div className={styles.debug}>
        <CheckersBoardDebug
          state={{
            playerId,
            side,
            sideToMove,
            gameId,
            dark: darkPositions,
            light: lightPositions,
            kings: kings,
            isOpponentTurn,
            possibleMoves,
            fullPossibleMoves,
          }}
          moveData={moveData}
        />
      </div>
    </div>
  );
};

export default CheckerBoard;

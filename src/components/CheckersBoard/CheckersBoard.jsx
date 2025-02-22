import { useState, useEffect } from 'react';
import { submitMove, getCheckersPositions } from '../../api/CheckersApi.js';
import CheckersBoardDebug from '../CheckersBoardDebug/CheckersBoardDebug.jsx';
import { isArraysEqual } from '../../utils/isArraysEqual.js';
import { getCellColor } from '../../utils/getCellColor.js';
import styles from './CheckersBoard.module.css';
import checkerData from '../../data/newgame.json'; // переписать, чтобы брать из InitialBoardState.json
import InitialBoardState from '../../data/InitialBoardState.json';

const CheckerBoard = ({ gameId, side, playerId }) => {
  // const [playerId, setPlayerId] = useState(); //on gameStart
  // const [side, setSide] = useState('LIGHT'); //on gameStart
  // const [currentGameId, setCurrentGameId] = useState(gameId); //on gameStart
  const [darkPositions, setDarkPositions] = useState(checkerData.dark);
  const [lightPositions, setLightPositions] = useState(checkerData.light);
  const [isOpponentTurn, setIsOpponentTurn] = useState(false); // opponent's turn is default
  const [possibleMoves, setPossibleMoves] = useState([]); // move strings [1-2, 2-3, ...]
  const [fullPossibleMoves, setFullPossibleMoves] = useState([]); // full moves object
  const [startMoveCell, setStartMoveCell] = useState(null); // Начальная клетка
  // const [endMoveCell, setEndMoveCell] = useState(null); // Конечная клетка
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

      if (
        !isArraysEqual(data.state.dark, darkPositions) ||
        !isArraysEqual(data.state.light, lightPositions)
      ) {
        setDarkPositions(data.state.dark);
        setLightPositions(data.state.light);
        formatAndSetPossibleMoves(data.possibleMoves);
        setFullPossibleMoves(data.possibleMoves);

        // console.log('Server response side:', data.side);
        // console.log('Current player side:', side);
        setIsOpponentTurn(side !== data.side);
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
        // Получаем список ходов из InitialBoardState
        formatAndSetPossibleMoves(InitialBoardState.possibleMoves);
      } else if (side === 'DARK') {
        updateBoardState();
        setIsOpponentTurn(true);
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
    }, 1000); // 1 time per second

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
      // Устанавливаем конечную ячейку
      // setEndMoveCell(cellNumber);

      // Получаем возможные ходы из fullPossibleMoves
      const moveOptions = fullPossibleMoves[startMoveCell] || [];
      const selectedMove = moveOptions.find(m => m.destination === cellNumber);

      if (selectedMove) {
        // Определяем, является ли ход взятием
        const isCapture = selectedMove.isCapture;
        const move = isCapture
          ? `${startMoveCell}x${cellNumber}`
          : `${startMoveCell}-${cellNumber}`;

        // const move = `${startMoveCell}-${cellNumber}`;
        // if (possibleMoves.includes(move)) {
        // // Получаем данные о возможных ходах для startMoveCell
        // const moveOptions =
        //   InitialBoardState.possibleMoves[startMoveCell] || [];
        // const selectedMove = moveOptions.find(
        //   m => m.destination === cellNumber
        // );
        // let capturedCheckers = [];
        // if (selectedMove && selectedMove.isCapture) {
        //   // Вычисляем клетку, где стоит шашка противника
        //   const capturedCell = Math.floor((startMoveCell + cellNumber) / 2);
        //   capturedCheckers.push(capturedCell);
        // }
        // Валидный ход
        const newMoveData = {
          side,
          move,
          state: {
            dark: darkPositions,
            light: lightPositions,
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

          const cellText =
            isBlackCell && darkPositions.includes(cellNumber)
              ? '⚫'
              : isBlackCell && lightPositions.includes(cellNumber)
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
          dark: darkPositions,
          light: lightPositions,
          isOpponentTurn,
          possibleMoves,
        }}
        moveData={moveData}
      />
    </div>
  );
};

export default CheckerBoard;

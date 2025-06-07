import { useState, useEffect } from 'react';
import { submitMove, getCheckersPositions } from '../../api/CheckersApi.js';
import CheckersBoardDebug from '../CheckersBoardDebug/CheckersBoardDebug.jsx';
import InfoPanel from '../InfoPanel/InfoPanel.jsx';
import { isArraysEqual } from '../../utils/isArraysEqual.js';
import { getCellColor } from '../../utils/getCellColor.js';
import styles from './CheckersBoard.module.css';

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
  const [isOpponentTurn, setIsOpponentTurn] = useState(false); // opponent moves first by default
  const [possibleMoves, setPossibleMoves] = useState([]); // move strings like 1-2
  const [sideToMove, setSideToMove] = useState();
  const [fullPossibleMoves, setFullPossibleMoves] = useState([]); // complete move objects
  const [startMoveCell, setStartMoveCell] = useState(null); // starting cell
  const [highlightedCell, setHighlightedCell] = useState(null); // highlighted cell
  const [moveData, setMoveData] = useState(null); // data for CheckersBoardDebug only

  // Convert possibleMoves to an array of strings and store in state
  const formatAndSetPossibleMoves = possibleMoves => {
    const formattedMoves = Object.entries(possibleMoves).flatMap(
      ([position, moves]) =>
        moves.map(move => `${position}-${move.destination}`)
    );
    setPossibleMoves(formattedMoves);
  };

  // Fetch the latest board state from the server
  const updateBoardState = async () => {
    try {
      const data = await getCheckersPositions(gameId);

      if (
        !isArraysEqual(data.serverState.dark, darkPositions) ||
        !isArraysEqual(data.serverState.light, lightPositions)
      ) {
        setDarkPositions(data.serverState.dark);
        setLightPositions(data.serverState.light);
        setKings(data.serverState.kings || []);
        formatAndSetPossibleMoves(data.possibleMoves);
        setFullPossibleMoves(data.possibleMoves);

        setIsOpponentTurn(side !== data.side);
        setSideToMove(data.side);
        return data;
      }
    } catch (error) {
      console.error('Error updating board state:', error);
    }
  };

  useEffect(() => {
    // Initialize moves once when the component mounts
    const initializePossibleMoves = () => {
      if (side === 'LIGHT') {
        // Use the move list from startingPossibleMoves
        formatAndSetPossibleMoves(startingPossibleMoves);
        setFullPossibleMoves(startingPossibleMoves);
      } else if (side === 'DARK') {
        updateBoardState();
        setIsOpponentTurn(true); // setting 2nd turn for 'DARK'-side player
      }
    };

    initializePossibleMoves();
  }, []); // run only once on mount

  useEffect(() => {
    const fetchDataInterval = setInterval(() => {
      if (isOpponentTurn) {
        updateBoardState();
      }
    }, 2000); // poll every two seconds

    return () => {
      clearInterval(fetchDataInterval); // Clear the interval when the component unmounts
    };
  }, [isOpponentTurn, darkPositions, lightPositions]);

  const handleCellClick = async cellNumber => {
    if (startMoveCell === null) {
      // Check that the piece belongs to the current player
      const playerCheckers = side === 'LIGHT' ? lightPositions : darkPositions;
      if (playerCheckers.includes(cellNumber)) {
        setStartMoveCell(cellNumber);
        setHighlightedCell(cellNumber); // highlight the selected cell
      }
    } else {
      // Retrieve available moves from fullPossibleMoves
      const moveOptions = fullPossibleMoves[startMoveCell] || [];
      const selectedMove = moveOptions.find(m => m.destination === cellNumber);

      if (selectedMove) {
        // Determine if the move is a capture
        const isCapture = selectedMove.isCapture;
        const move = isCapture
          ? `${startMoveCell}x${cellNumber}`
          : `${startMoveCell}-${cellNumber}`;

        // Valid move
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
        setMoveData(newMoveData); // update move data for debugging
        try {
          // Submit move to the server
          await submitMove(gameId, newMoveData);
          // Reset state after a successful move
          setStartMoveCell(null);
          setHighlightedCell(null);
          const updatedData = await updateBoardState();
        } catch (error) {
          console.error('Failed to submit move:', error);
        }
      } else {
        // Invalid move
        setStartMoveCell(null);
        setHighlightedCell(null);
      }
    }
  };

  // Generate the board markup
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

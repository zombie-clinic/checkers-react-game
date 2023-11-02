import { useState, useEffect } from 'react';
// import StartForm from ../StartForm/StartForm.jsx
import { getCheckersPositions } from '../../api/CheckersApi.js';
import { isArraysEqual } from '../../utils/isArraysEqual.js';
import { getCellColor } from '../../utils/getCellColor.js';
import styles from './CheckersBoard.module.css';
import checkerData from '../../data/newgame.json';
let gameId = '7304942c-1bfd-4c23-8c83-c9902a866807';

const CheckerBoard = () => {
// const [gameId, setGameId] = useState(null)
const [dark, setDark] = useState(checkerData.dark);
const [light, setLight] = useState(checkerData.light);
const [isOpponentTurn, setIsOpponentTurn] = useState(true); // opponent's turn is default
// const [validMoves, setValidMoves] = useState(true);
// const [moveData, setMoveData] = useState(
//   {
//     side: '',
//     move: '',
//     state: {
//       black: [],
//       white: [],
//     },
//     playerId: 0,
//   }
// ); //object with hadlers call results

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getCheckersPositions(gameId);
        if (!isArraysEqual(data.state.dark, dark) || !isArraysEqual(data.state.light, light)) {
          setDark(data.state.dark)
          setLight(data.state.light)
          setIsOpponentTurn(false); // Update the state variable
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

  }, [isOpponentTurn, dark, light]); // Add dataFetched to the dependency array


  // const handleCellClick = (cellNumber) => {
  //   if (possibleMoves[cellNumber]) {

  //   }
  // }

  const renderTable = () => {
    let blackCellCounter = 0;
    return Array.from({ length: 8 }, (_, row) => (
      <tr key={row}>
        {Array.from({ length: 8 }, (_, col) => {
          const cellColor = getCellColor(row, col);
          const isBlackCell = cellColor === 'black';
          const cellNumber = isBlackCell ? ++blackCellCounter : null;
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
            >
              {cellText}
              {/* <div className={styles.cellLabel}>{cellNumber}</div> */}
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
      <div>
      <h2>Checkers Data</h2>
      <pre>{JSON.stringify(checkerData)}</pre>
      </div>
    </div>
  );
};


export default CheckerBoard;
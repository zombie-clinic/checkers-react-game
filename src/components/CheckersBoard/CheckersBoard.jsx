import { useState, useEffect } from 'react';

import { getCheckersPositions } from '../../api/CheckersApi.js';
import styles from './CheckersBoard.module.css';
import checkerData from '../../data/data.json';
let gameId = '7304942c-1bfd-4c23-8c83-c9902a866807';

const CheckerBoard = () => {
const [black, setBlack] = useState(checkerData.black);
const [white, setWhite] = useState(checkerData.white);
const [isOpponentTurn, setIsOpponentTurn] = useState(true); // opponent's turn is default
const [moveData, setMoveData] = useState(
  {
    side: '',
    move: '',
    state: {
      black: [],
      white: [],
    },
    playerId: 0,
  }
); //object with hadlers call results


  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getCheckersPositions(gameId);
          setBlack(data.state.black)
          setWhite(data.state.white)
          setIsOpponentTurn(false); // Update the state variable
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

  }, [isOpponentTurn]); // Add dataFetched to the dependency array


  const getCellColor = (row, col) => {
    if ((row + col) % 2 === 0) {
      return 'white';
    } else {
      return 'black';
    }
  };


  const renderTable = () => {
    let blackCellCounter = 0;
    return Array.from({ length: 8 }, (_, row) => (
      <tr key={row}>
        {Array.from({ length: 8 }, (_, col) => {
          const cellColor = getCellColor(row, col);
          const isBlackCell = cellColor === 'black';
          const cellNumber = isBlackCell ? ++blackCellCounter : null;
          const cellText =
            isBlackCell && black.includes(cellNumber)
              ? '⚫'
              : isBlackCell && white.includes(cellNumber)
              ? '⚪'
              : '';

          return (
            <td
              key={col}
              className={`${styles.cell} ${styles[cellColor]}`}
              data-number={cellNumber}
            >
              {cellText}
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
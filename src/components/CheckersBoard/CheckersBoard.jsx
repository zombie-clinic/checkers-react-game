

import { useState, useEffect } from 'react';

import { CheckersApi } from '../../api/CheckersApi.js';
import styles from './CheckersBoard.module.css';
import checkerData from '../../data/data.json';


const CheckerBoard = () => {
const [black, setBlack] = useState(checkerData.black);
const [white, setWhite] = useState(checkerData.white);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await CheckersApi();
          setBlack(data.state.black)
          setWhite(data.state.white)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    
    fetchData();
  }, []); // Empty dependency array to run this effect only once when the component mounts


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
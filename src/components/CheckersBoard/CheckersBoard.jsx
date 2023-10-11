

import { useState, useEffect } from 'react';

import { CheckersApi } from '../../api/CheckersApi.js';
import styles from './CheckersBoard.module.css';
import checkerData from '../../data/data.json';


const CheckerBoard = () => {
const [black, setBlack] = useState(checkerData.black);
const [white, setWhite] = useState(checkerData.white);
  // const [black, setBlack] = useState(null);
  // const [white, setWhite] = useState(null);

  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await CheckersApi();
        setApiData(data); // Update state with API data
          // setBlack(apiData.state.black)
          // setWhite(data.state.white)
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
              ? 'black'
              : isBlackCell && white.includes(cellNumber)
              ? 'white'
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

  console.log('this is apiData value');
  console.log(apiData);

  // const {gameId, state} = apiData;
  // console.log(gameId);
  // console.log(Object.keys(apiData)); //error
  // console.log(JSON.parse(JSON.stringify(apiData)));
  // console.log(black);
  // console.log(white);

  return (
    <div>
    <table className={styles.checkerboard}>
      <tbody>{renderTable()}</tbody>
    </table>
    {/* Render API data, if available */}
    {apiData && (
        <div>
          <h2>API Data State(simlpy taken from fetch data)</h2>
          {<pre>{apiData.state}</pre>}
        </div>
      )}
      <div>
      <h2>Checkers Data</h2>
      <pre>{JSON.stringify(checkerData)}</pre>
      </div>
    </div>
  );
};


export default CheckerBoard;
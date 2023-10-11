// // import React from 'react';
// import styles from './CheckersBoard.module.css';
// import checkerData from '../../data/data.json';

// const CheckerBoard = () => {
//   const { black, white } = checkerData;

//   // Function to determine the cell color based on its position
//   const getCellColor = (row, col) => {
//     // Check if the sum of row and column indices is even
//     if ((row + col) % 2 === 0) {
//       return 'white';
//     } else {
//       return 'black';
//     }
//   };

//   // Function to render the table rows and cells
//   const renderTable = () => {
//     let blackCellCounter = 0; // Counter for numbering black cells

//     return Array.from({ length: 8 }, (_, row) => (
//       <tr key={row}>
//         {Array.from({ length: 8 }, (_, col) => {
//           const cellColor = getCellColor(row, col);

//           // Determine if the cell is black and should be numbered
//           const isBlackCell = cellColor === 'black';
//           const cellNumber = isBlackCell ? ++blackCellCounter : null;

//           // Determine if the cell should have "black" or "white" text
//           const cellText =
//             isBlackCell && black.includes(cellNumber)
//               ? 'black'
//               : isBlackCell && white.includes(cellNumber)
//               ? 'white'
//               : '';

//           return (
//             <td
//               key={col}
//               className={`${styles.cell} ${styles[cellColor]}`}
//               data-number={cellNumber}
//             >
//               {cellText}
//             </td>
//           );
//         })}
//       </tr>
//     ));
//   };

//   return (
//     <table className={styles.checkerboard}>
//       <tbody>{renderTable()}</tbody>
//     </table>
//   );
// };

// export default CheckerBoard;

// import { Component } from 'react';
// import styles from './CheckersBoard.module.css';
// import checkerData from '../../data/data.json';
// import { CheckersApi } from '../../api/CheckersApi.js'

// class CheckerBoard extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       black: checkerData.black,
//       white: checkerData.white,
//     };
//   }

//   getCellColor(row, col) {
//     if ((row + col) % 2 === 0) {
//       return 'black';
//     } else {
//       return 'white';
//     }
//   }

//   renderTable() {
//     let blackCellCounter = 0;
//     const { black, white } = this.state;

//     return Array.from({ length: 8 }, (_, row) => (
//       <tr key={row}>
//         {Array.from({ length: 8 }, (_, col) => {
//           const cellColor = this.getCellColor(row, col);
//           const isBlackCell = cellColor === 'black';
//           const cellNumber = isBlackCell ? ++ blackCellCounter : null;
//           const cellText =
//             isBlackCell && black.includes(cellNumber)
//               ? 'black'
//               : isBlackCell && white.includes(cellNumber)
//               ? 'white'
//               : '';

//           return (
//             <td
//               key={col}
//               className={`${styles.cell} ${styles[cellColor]}`}
//               data-number={cellNumber}
//             >
//               {cellText}
//             </td>
//           );
//         })}
//       </tr>
//     ));
//   }

//   render() {
//     return (
//       <table className={styles.checkerboard}>
//         <tbody>{this.renderTable()}</tbody>
//       </table>
//     );
//   }
// }

// export default CheckerBoard;

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
    // Define an async function to fetch data
    async function fetchData() {
      try {
        const data = await CheckersApi();
        setApiData(data); // Update state with API data
        // setApiData(JSON.parse(JSON.stringify(data)));
        console.log('this is fetched data');
        console.log(data);
          // Теперь можно обращаться к apiData.state
          console.log(apiData.state);
          // setBlack(apiData.state.black)
          // setWhite(data.state.white)
      } catch (error) {
        console.error('Error fetching data:', error);
        // setApiData(null);
      }
    }

    // Call the fetchData function immediately
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
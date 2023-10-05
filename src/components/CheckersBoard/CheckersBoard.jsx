// import React from 'react';
import styles from './CheckersBoard.module.css';
import checkerData from '../../data/data.json';

const CheckerBoard = () => {
  const { black, white } = checkerData;

  // Function to determine the cell color based on its position
  const getCellColor = (row, col) => {
    // Check if the sum of row and column indices is even
    if ((row + col) % 2 === 0) {
      return 'white';
    } else {
      return 'black';
    }
  };

  // Function to render the table rows and cells
  const renderTable = () => {
    let blackCellCounter = 0; // Counter for numbering black cells

    return Array.from({ length: 8 }, (_, row) => (
      <tr key={row}>
        {Array.from({ length: 8 }, (_, col) => {
          const cellColor = getCellColor(row, col);

          // Determine if the cell is black and should be numbered
          const isBlackCell = cellColor === 'black';
          const cellNumber = isBlackCell ? ++blackCellCounter : null;

          // Determine if the cell should have "black" or "white" text
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

  return (
    <table className={styles.checkerboard}>
      <tbody>{renderTable()}</tbody>
    </table>
  );
};

export default CheckerBoard;
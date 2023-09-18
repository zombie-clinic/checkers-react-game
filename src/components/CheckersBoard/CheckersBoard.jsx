
import React from 'react';
import Cell from '../Cell/Cell';
// import css from './CheckersBoard.css';


// Functional component for the entire 8x8 table
function CheckersBoard() {
  // Generate the table rows and cells
  const tableRows = [];
  for (let row = 0; row < 8; row++) {
    const cells = [];
    for (let col = 0; col < 8; col++) {
      const checker = (row + col) % 2 === 0 ? 'black' : 'white'; // Determine checker color
      cells.push(<Cell key={`cell-${row}-${col}`} row={row} col={col} checker={checker} />);
    }
    tableRows.push(<tr key={`row-${row}`}>{cells}</tr>);
  }

  return (
    <div>
      <table border="1">
        <tbody>
          {tableRows}
        </tbody>
      </table>
    </div>
  );
}

export default CheckersBoard;
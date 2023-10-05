import React, { useEffect, useState } from 'react';

// Functional component for a single cell
function TableCell(props) {
  const { row, col, checker, cellNumber } = props;
  const isEvenCell = (row + col) % 2 === 0;

  // Style the cell based on whether it's even or odd and the checker prop
  const cellStyle = {
    width: '50px', // Adjust cell size as needed
    height: '50px',
    textAlign: 'center',
    verticalAlign: 'middle',
    fontWeight: 'bold',
    backgroundColor: isEvenCell ? getCellColor(checker) : '',
    color: isEvenCell ? getTextColor(checker) : '',
  };

  function getCellColor(checker) {
    return checker === 'black' ? '#333' : checker === 'white' ? '#fff' : '';
  }

  function getTextColor(checker) {
    return checker === 'no' ? 'transparent' : checker === 'black' ? '#fff' : checker === 'white' ? '#000' : '';
  }

  // Determine the text to display based on cellNumber and checker
  let cellText = '';
  if (cellNumber >= 1 && cellNumber <= 12) {
    cellText = 'black';
  } else if (cellNumber >= 21 && cellNumber <= 32) {
    cellText = 'white';
  }

  return <td style={cellStyle}>{cellText}</td>;
}

// Functional component for the entire 8x8 table
function EightByEightTable() {
  const [data, setData] = useState({ black: [], white: [] });

  useEffect(() => {
    // Load data from data.json or your preferred data source
    fetch('data.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error('Error loading data:', error));
  }, []);

  if (data.black.length === 0 || data.white.length === 0) {
    return <div>Loading...</div>;
  }

  // Generate the table rows and cells
  const tableRows = [];
  for (let row = 0; row < 8; row++) {
    const cells = [];
    for (let col = 0; col < 8; col++) {
      const cellNumber = row * 8 + col + 1;
      const checker = data.black.includes(cellNumber) ? 'black' : data.white.includes(cellNumber) ? 'white' : 'no';
      cells.push(<TableCell key={`cell-${row}-${col}`} row={row} col={col} checker={checker} cellNumber={cellNumber} />);
    }
    tableRows.push(<tr key={`row-${row}`}>{cells}</tr>);
  }

  return (
    <div>
      <table border="1">
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  );
}

export default EightByEightTable;
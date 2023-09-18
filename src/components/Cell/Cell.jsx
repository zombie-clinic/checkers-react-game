import React from 'react';

// Single cell
function Cell(props) {
  const { row, col, checker } = props;
  const isEvenCell = (row + col) % 2 === 0;

  // Styles based on even or odd and the checker prop
  const cellStyle = {
    width: '50px',
    height: '50px',
    textAlign: 'center',
    verticalAlign: 'middle',
    fontWeight: 'bold',
    backgroundColor: isEvenCell ? getCellColor(checker, true) : getCellColor(checker, false),
    color: isEvenCell ? getTextColor(checker, true) : getTextColor(checker, false),
  };

  function getCellColor(checker, isEven) {
    if (checker === 'black') {
      return isEven ? '#333' : '#fff';
    } else if (checker === 'white') {
      return isEven ? '#fff' : '#333';
    } else {
      return '';
    }
  }

  function getTextColor(checker, isEven) {
    return checker === 'no' ? 'transparent' : isEven ? (checker === 'black' ? '#fff' : '#000') : (checker === 'black' ? '#000' : '#fff');
  }

  return <td style={cellStyle}>{checker === 'no' ? '' : `Row ${row + 1}, Cell ${col + 1}`}</td>;
}

export default Cell
import { getCellColor, getTextColor } from '../../../utils/getColor.js'
import css from '../CheckersBoard.module.css'

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

  return <td className={css.tableCell} style={cellStyle}>{checker === 'no' ? '' : `Row ${row + 1}, Cell ${col + 1}`}</td>;
}

export default Cell
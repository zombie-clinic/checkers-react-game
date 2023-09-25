
import Cell from '../Cell/Cell';
import css from './CheckersBoard.module.css';


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
    tableRows.push(<tr className={css.tableRow} key={`row-${row}`}>{cells}</tr>);
  }

  return (
    <div className={css.CheckersBoardWrap}>
      <table border="1">
        <tbody>
          {tableRows}
        </tbody>
      </table>
    </div>
  );
}

export default CheckersBoard;
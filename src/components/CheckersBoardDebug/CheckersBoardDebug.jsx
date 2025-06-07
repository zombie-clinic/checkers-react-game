import PropTypes from 'prop-types';
import styles from './CheckersBoardDebug.module.css';

function CheckersBoardDebug({ state, moveData }) {
  return (
    <div className={styles.debugContainer}>
      <h3>Debug State</h3>

      {/* State table */}
      <table className={styles.debugTable}>
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(state).map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>
                {value !== undefined
                  ? typeof value === 'object'
                    ? JSON.stringify(value)
                    : value.toString()
                  : 'undefined'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Move data table */}
      <h3>Move Data</h3>
      <table className={styles.debugTable}>
        <thead>
          <tr>
            <th>Property</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {moveData ? (
            Object.entries(moveData).map(([key, value]) => (
              <tr key={key}>
                <td>{key}</td>
                <td>
                  {value !== undefined
                    ? typeof value === 'object'
                      ? JSON.stringify(value)
                      : value.toString()
                    : 'undefined'}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className={styles.noDataMessage}>
                No move data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

CheckersBoardDebug.propTypes = {
  state: PropTypes.object.isRequired,
  moveData: PropTypes.object,
};

export default CheckersBoardDebug;

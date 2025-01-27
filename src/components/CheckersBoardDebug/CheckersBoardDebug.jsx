import React from 'react';
import PropTypes from 'prop-types';
import styles from './CheckersBoardDebug.module.css';

const CheckersBoardDebug = ({ state }) => {
  return (
    <div className={styles.debugState}>
      <h2>Debug State</h2>
      <table className={styles.table}>
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
                {typeof value === 'object' ? (
                  <pre>{JSON.stringify(value, null, 2)}</pre>
                ) : (
                  value.toString()
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

CheckersBoardDebug.propTypes = {
  state: PropTypes.object.isRequired,
};

export default CheckersBoardDebug;

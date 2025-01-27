import React from 'react';
import PropTypes from 'prop-types';
import styles from './CheckersBoardDebug.module.css';

function CheckersBoardDebug({ state }) {
  return (
    <div style={{ marginTop: '20px' }}>
      <h3>Debug State</h3>
      <table border="1" style={{ width: '100%', textAlign: 'left' }}>
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
              {/* Проверяем, является ли value объектом, массивом или другим типом */}
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
    </div>
  );
}

CheckersBoardDebug.propTypes = {
  state: PropTypes.object.isRequired,
};

export default CheckersBoardDebug;

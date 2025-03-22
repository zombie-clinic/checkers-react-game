import React from 'react';
import styles from './InfoPanel.module.css';

const InfoPanel = ({ isOpponentTurn, side, data }) => {
  const yourLostPieces =
    side === 'DARK'
      ? 12 - data.state.dark.length
      : 12 - data.state.light.length;
  const opponentLostPieces =
    side === 'DARK'
      ? 12 - data.state.light.length
      : 12 - data.state.dark.length;

  return (
    <div className={styles.container}>
      <p className={isOpponentTurn ? styles.opponentTurn : styles.yourTurn}>
        {isOpponentTurn ? "OPPONENT'S TURN" : 'Y O U R  TURN'}
      </p>
      <p className={styles.piecesLost}>
        Pieces lost - Your: {side === 'DARK' ? '⚫' : '⚪'} x {yourLostPieces}
        &nbsp; Opponent: {side === 'DARK' ? '⚪' : '⚫'} x {opponentLostPieces}
      </p>
    </div>
  );
};

export default InfoPanel;

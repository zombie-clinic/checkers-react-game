import React from 'react';
import styles from './InfoPanel.module.css';
import getGameResultMessage from '../../utils/endgameCondition.jsx';

// const InfoPanel = ({ isOpponentTurn, side, data }) => {
//   const yourLostPieces =
//     side === 'DARK'
//       ? 12 - data.state.dark.length
//       : 12 - data.state.light.length;
//   const opponentLostPieces =
//     side === 'DARK'
//       ? 12 - data.state.light.length
//       : 12 - data.state.dark.length;

const InfoPanel = ({ isOpponentTurn, side, data }) => {
  const piecesLeft = data.state[side.toLowerCase()].length;
  const opponentSide = side === 'DARK' ? 'light' : 'dark';
  const opponentPiecesLeft = data.state[opponentSide].length;

  const yourLostPieces = 12 - piecesLeft;
  const opponentLostPieces = 12 - opponentPiecesLeft;

  return (
    <div className={styles.container}>
      <p className={isOpponentTurn ? styles.opponentTurn : styles.yourTurn}>
        {isOpponentTurn ? "OPPONENT'S TURN" : 'Y O U R  TURN'}
      </p>
      <p className={styles.piecesLost}>
        Pieces lost - Your: {side === 'DARK' ? '⚫' : '⚪'} x {yourLostPieces}
        &nbsp; Opponent: {side === 'DARK' ? '⚪' : '⚫'} x {opponentLostPieces}
      </p>
      {/* <p>{getGameResultMessage}</p> */}
    </div>
  );
};

export default InfoPanel;

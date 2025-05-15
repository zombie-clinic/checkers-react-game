import React from 'react';
import styles from './InfoPanel.module.css';
import getGameResultMessage from '../../utils/endgameCondition.jsx';

const InfoPanel = ({ isOpponentTurn, side, data, possibleMoves }) => {
  const getGameResultMessage = () => {
    if (possibleMoves.length === 0) {
      return 'GAME OVER';
    }

    const yourPieces =
      side === 'DARK' ? data.localState.dark : data.localState.light;
    const opponentPieces =
      side === 'DARK' ? data.localState.light : data.localState.dark;

    if (yourPieces.length > 0 && opponentPieces.length === 0) {
      return 'YOU WIN!';
    }

    if (yourPieces.length === 0 && opponentPieces.length > 0) {
      return 'YOU LOSE!';
    }

    return null;
  };

  const yourLostPieces =
    12 -
    (side === 'DARK'
      ? data.localState.dark.length
      : data.localState.light.length);
  const opponentLostPieces =
    12 -
    (side === 'DARK'
      ? data.localState.light.length
      : data.localState.dark.length);
  const resultMessage = getGameResultMessage();

  return (
    <div className={styles.infoPanel}>
      <div className={isOpponentTurn ? styles.oppTurn : styles.yourTurn}>
        {isOpponentTurn ? "OPPONENT'S TURN" : 'YOUR TURN'}
      </div>
      <div className={styles.pieceStats}>
        Pieces lost - Your: {side === 'DARK' ? '⚫' : '⚪'} x {yourLostPieces}{' '}
        &nbsp; Opponent: {side === 'DARK' ? '⚪' : '⚫'} x {opponentLostPieces}
      </div>
      {resultMessage && (
        <div className={styles.gameResult}>{resultMessage}</div>
      )}
    </div>
  );
};

export default InfoPanel;

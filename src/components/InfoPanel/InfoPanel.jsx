import React from 'react';
import styles from './InfoPanel.module.css';

const InfoPanel = ({ isOpponentTurn, side, data, possibleMoves }) => {
  const calculateResultMessages = () => {
    const messages = [];
    const yourPieces =
      side === 'DARK' ? data.localState.dark : data.localState.light;
    const opponentPieces =
      side === 'DARK' ? data.localState.light : data.localState.dark;

    if (yourPieces.length > 0 && opponentPieces.length === 0) {
      messages.push('YOU WIN!');
    }

    if (yourPieces.length === 0 && opponentPieces.length > 0) {
      messages.push('YOU LOSE!');
    }

    if (possibleMoves.length === 0) {
      messages.push('GAME OVER');
    }

    return messages.length > 0 ? messages : null;
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
  const resultMessage = calculateResultMessages();

  return (
    <div className={styles.infoPanel}>
      <div className={isOpponentTurn ? styles.opponentTurn : styles.yourTurn}>
        {isOpponentTurn ? "OPPONENT'S TURN" : 'YOUR TURN'}
      </div>
      <div className={styles.pieceStats}>
        Pieces lost - Your: {side === 'DARK' ? '⚫' : '⚪'} x {yourLostPieces}{' '}
        &nbsp; Opponent: {side === 'DARK' ? '⚪' : '⚫'} x {opponentLostPieces}
      </div>
      {resultMessage && (
        <div className={styles.gameResult}>
          {Array.isArray(resultMessage) ? (
            resultMessage.map((msg, idx) => <div key={idx}>{msg}</div>)
          ) : (
            <div>{resultMessage}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default InfoPanel;

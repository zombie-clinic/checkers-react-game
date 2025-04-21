import React from 'react';
import styles from './InfoPanel.module.css';
import getGameResultMessage from '../../utils/endgameCondition.jsx';

// // const InfoPanel = ({ isOpponentTurn, side, data }) => {
// //   const yourLostPieces =
// //     side === 'DARK'
// //       ? 12 - data.state.dark.length
// //       : 12 - data.state.light.length;
// //   const opponentLostPieces =
// //     side === 'DARK'
// //       ? 12 - data.state.light.length
// //       : 12 - data.state.dark.length;

// const InfoPanel = ({ isOpponentTurn, side, data }) => {
//   const piecesLeft = data.state[side.toLowerCase()].length;
//   const opponentSide = side === 'DARK' ? 'light' : 'dark';
//   const opponentPiecesLeft = data.state[opponentSide].length;

//   const yourLostPieces = 12 - piecesLeft;
//   const opponentLostPieces = 12 - opponentPiecesLeft;

//   return (
//     <div className={styles.container}>
//       <p className={isOpponentTurn ? styles.opponentTurn : styles.yourTurn}>
//         {isOpponentTurn ? "OPPONENT'S TURN" : 'Y O U R  TURN'}
//       </p>
//       <p className={styles.piecesLost}>
//         Pieces lost - Your: {side === 'DARK' ? '⚫' : '⚪'} x {yourLostPieces}
//         &nbsp; Opponent: {side === 'DARK' ? '⚪' : '⚫'} x {opponentLostPieces}
//       </p>
//       <p>{}</p>
//     </div>
//   );
// };

// export default InfoPanel;

const InfoPanel = ({ isOpponentTurn, side, data, possibleMoves }) => {
  const getGameResultMessage = () => {
    if (possibleMoves.length === 0) {
      return 'GAME OVER';
    }

    const yourPieces = side === 'DARK' ? data.state.dark : data.state.light;
    const opponentPieces = side === 'DARK' ? data.state.light : data.state.dark;

    if (yourPieces.length > 0 && opponentPieces.length === 0) {
      return 'YOU WIN!';
    }

    if (yourPieces.length === 0 && opponentPieces.length > 0) {
      return 'YOU LOSE!';
    }

    return null;
  };

  const yourLostPieces =
    12 - (side === 'DARK' ? data.state.dark.length : data.state.light.length);
  const opponentLostPieces =
    12 - (side === 'DARK' ? data.state.light.length : data.state.dark.length);
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

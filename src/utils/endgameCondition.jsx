const getGameResultMessage = ({ dark, light }) => {
  if (dark.length == 0) {
    return 'WHITE WINS!';
  }

  if (light.length == 0) {
    return 'DARK WINS!';
  }

  return 'the game goes on';
};

export default getGameResultMessage;

// export const getGameResultMessage = ({ side, possibleMoves, dark, light }) => {
//   // Если нет доступных ходов — конец игры
//   if (possibleMoves.length === 0) {
//     return 'GAME OVER';
//   }

//   const yourPieces = side === 'DARK' ? dark : light;
//   const opponentPieces = side === 'DARK' ? light : dark;

//   const yourCount = yourPieces.length;
//   const opponentCount = opponentPieces.length;

//   if (yourCount > 0 && opponentCount === 0) {
//     return 'YOU WIN!';
//   }

//   if (yourCount === 0 && opponentCount > 0) {
//     return 'YOU LOSE!';
//   }

//   return null; // Игра ещё продолжается
// };

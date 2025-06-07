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

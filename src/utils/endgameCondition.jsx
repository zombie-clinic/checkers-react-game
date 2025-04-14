const getGameResultMessage = ({ dark, light }) => {
  if (dark.length == 0) {
    return 'WHITE WINS!';
  }

  if (light.length == 0) {
    return 'DARK WINS!';
  }

  return '';
};

export default getGameResultMessage;

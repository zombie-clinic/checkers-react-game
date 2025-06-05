export const getCellColor = (row, col) => {
  if ((row + col) % 2 === 0) {
    return 'white';
  }
  return 'black';
};

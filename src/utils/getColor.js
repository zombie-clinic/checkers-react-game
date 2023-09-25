export function getCellColor(checker, isEven) {
  if (checker === 'black') {
    return isEven ? '#333' : '#fff';
  } else if (checker === 'white') {
    return isEven ? '#fff' : '#333';
  } else {
    return '';
  }
}

export function getTextColor(checker, isEven) {
  return checker === 'no' ? 'transparent' : isEven ? (checker === 'black' ? '#fff' : '#000') : (checker === 'black' ? '#000' : '#fff');
}

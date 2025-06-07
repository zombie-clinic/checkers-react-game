let unixTime = 1701543600;
export function convertUnixTimeToFormattedDate(unixTime) {
  // Convert Unix time to milliseconds
  const unixTimeInMilliseconds = unixTime * 1000;

  // Create a new Date object
  const date = new Date(unixTimeInMilliseconds);

  // Get the individual components of the date
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  // Construct the formatted date string
  const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;

  return formattedDate;
}


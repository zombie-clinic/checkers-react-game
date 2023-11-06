
const data = {
  "gameId": "7304942c-1bfd-4c23-8c83-c9902a866807",
  "state": {
    "black": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    "white": [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32]
  },
  "possibleMoves": {
    "21": [{ "side": "WHITE", "position": 21, "destination": 17, "isCapture": false, "isTerminal": false }],
    "22": [
      { "side": "WHITE", "position": 22, "destination": 17, "isCapture": false, "isTerminal": false },
      { "side": "WHITE", "position": 22, "destination": 18, "isCapture": false, "isTerminal": false }
    ],
    "23": [
      { "side": "WHITE", "position": 23, "destination": 18, "isCapture": false, "isTerminal": false },
      { "side": "WHITE", "position": 23, "destination": 19, "isCapture": false, "isTerminal": false }
    ],
    "24": [
      { "side": "WHITE", "position": 24, "destination": 19, "isCapture": false, "isTerminal": false },
      { "side": "WHITE", "position": 24, "destination": 20, "isCapture": false, "isTerminal": false }
    ]
  }
};

// Get the property names (keys) in "possibleMoves"
const possibleMoveKeys = Object.keys(data.possibleMoves);


//*******************************************************************************


import { useState, useEffect } from 'react';

// ... (other imports and component setup)

const CheckerBoard = () => {
  // ... (existing state and useEffect)

  const getCellColor = (row, col) => {
    if ((row + col) % 2 === 0) {
      return 'white';
    } else {
      return 'black';
    }
  };

  const handleCellClick = (cellNumber) => {
    if (possibleMoves[cellNumber]) {
      // If the clicked cell has possible moves, attach new click event listeners
      const possibleMove = possibleMoves[cellNumber][0]; // Assuming there is only one move for simplicity
      const destinationCellNumber = possibleMove.destination;

      // Create a new click event listener for the destination cell
      const destinationCell = document.querySelector(`[data-number="${destinationCellNumber}"]`);
      if (destinationCell) {
        destinationCell.addEventListener('click', () => {
          if (possibleMove.isTerminal) {
            const moveString = `${cellNumber}-${destinationCellNumber}`;
            setMoveData({
              side: possibleMove.side,
              move: moveString,
              state: data.state,
              playerId: 0,
            });
          }
        });
      }
    }
  };

  useEffect(() => {
    // Attach event listeners to cells with "data-number" based on possible moves
    Object.keys(possibleMoves).forEach((cellNumber) => {
      const cell = document.querySelector(`[data-number="${cellNumber}"]`);
      if (cell) {
        cell.addEventListener('click', () => {
          handleCellClick(cellNumber);
        });
      }
    });

    // Clear event listeners when the component unmounts
    return () => {
      Object.keys(possibleMoves).forEach((cellNumber) => {
        const cell = document.querySelector(`[data-number="${cellNumber}"]`);
        if (cell) {
          cell.removeEventListener('click', () => {
            handleCellClick(cellNumber);
          });
        }
      });
    };
  }, [possibleMoves]);

  // ... (rendering logic)

  return (
    <div>
      <table className={styles.checkerboard}>
        <tbody>{renderTable()}</tbody>
      </table>
      {/* <div>
        <h2>Checkers Data</h2>
        <pre>{JSON.stringify(checkerData)}</pre>
      </div> */}
    </div>
  );
};

export default CheckerBoard;


//************************************************* */

import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/games'
});

export const startNewGame = async (player = 1, side = 'LIGHT') => {
  try {
    const requestData = {
      playerId: player,
      side: side,
    };

    const response = await instance.post('/', requestData);

    if (response.status === 201) {
      const newGameData = response.data;
      // You can do something with newGameData here
      return newGameData;
    } else {
      // Handle other status codes or errors as needed
      throw new Error(`Failed to start a new game. Status code: ${response.status}`);
    }
  } catch (error) {
    // Handle any request or network errors
    console.error('Error starting a new game:', error);
    throw error;
  }
};

// Save to grepper
// In this code:

// We create an Axios request data object requestData containing the playerId and side properties.
// We send a POST request to the base URL with an empty path ('/') and the requestData as the request body.
// We check if the response status is 201 (Created). If it is, we assume the request was successful, and you can access the newGameData from the response.data.
// If the response status is not 201, you can handle other status codes or errors as needed.
// We use try-catch to catch and handle any request or network errors that might occur during the HTTP request. Errors are logged and rethrown so that you can handle them as needed in your application.
// This function should meet the described conditions and allow you to start a new game and handle the response data or errors accordingly.





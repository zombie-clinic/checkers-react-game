import axios from 'axios';

// const moveData = {
//   side: 'BLACK',
//   move: '10-14',
//   state: {
//     black: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
//     white: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32],
//   },
//   playerId: 2,
// };

// const API_KEY = 'PUT IT HERE IF NEEDED';
// const BASE_URL = 'http://localhost:8080/games/';

// export const getCheckersPositions = async (gameId = '7304942c-1bfd-4c23-8c83-c9902a866807') => {
//   const url = `${BASE_URL}${gameId}/moves`;
//   const { data } = await axios.get(url);
//   return data;
// };

const instance = axios.create({
  baseURL: 'http://localhost:8080/games/',
});

export const startNewLobby = async (player = 1, side = 'LIGHT') => {
  const requestData = {
    playerId: player,
    side: side,
  };
  const newGameData = await instance.post(
    'http://localhost:8080/games/',
    requestData
  );
  // const newGameData = response.data;
  console.log('posting a new game');
  return newGameData;
};

//Get current state of a game (the result of the last move)
export const getCheckersPositions = async gameId => {
  const { data } = await instance.get(`/${gameId}/moves`);
  console.log('fetching board state');
  return data;
};

// export const sendMoveData = async (gameId) => {
//   const { data } = await instance.put(`/${gameId}/moves`, moveData)
//   console.log('response on put moveData')
//   return data;
// }

// the game API

// GET
// /game
// Get games

// POST
// /game
// Start a new game

// GET
// /game/{gameId}
// Find game by ID

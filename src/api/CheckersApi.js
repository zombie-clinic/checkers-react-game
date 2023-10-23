import axios from 'axios';

// const API_KEY = 'PUT IT HERE IF NEEDED';
// const BASE_URL = 'http://localhost:8080/games/';

// export const getCheckersPositions = async (gameId = '7304942c-1bfd-4c23-8c83-c9902a866807') => {
//   const url = `${BASE_URL}${gameId}/moves`;
//   const { data } = await axios.get(url);
//   return data;
// };


const instance = axios.create ({
  baseURL: 'http://localhost:8080/games'
})

//Get current state of a game (the result of the last move)
export const getCheckersPositions = async (gameId) => {
  
  const { data } = await instance.get(`/${gameId}/moves`)
  console.log('fetching board state')
  return data;
}

// export const putMoveData = async (gameId) => {
//   const { response } = await instance.put
// }

// /move/{gameId}
// Make a move within a game
// game


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


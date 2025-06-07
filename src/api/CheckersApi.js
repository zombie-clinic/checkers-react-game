import axios from 'axios';

// const API_KEY = 'PUT IT HERE IF NEEDED';
const BASE_URL = 'http://localhost:8080';
// const BASE_URL =
//   'https://978f-2a02-2455-81dc-9d00-229c-100a-5f89-ca09.ngrok-free.app';

const instance = axios.create({
  baseURL: BASE_URL,
  headers: { 'ngrok-skip-browser-warning': 'sthg' },
});

export const startNewLobby = async (player, side) => {
  const requestData = {
    playerId: player,
    side: side,
  };
  const response = await instance.post('/games', requestData);
  return response.data;
};

export const startImportedGame = async (player, side, state) => {
  const requestData = {
    playerId: player,
    side: side,
    clientState: state,
  };
  const response = await instance.post('/games?isImport=true', requestData);
  return response.data;
};

export const joinGame = async (gameId, playerId) => {
  const requestData = {
    gameId,
    playerId,
  };
  const response = await instance.put('/games', requestData);
  return response.data;
};

/**
 * PUT a new move to a specified game.
 *
 * @param {String} gameId
 * @param {JSON} moveData
 * @returns
 */
export const submitMove = async (gameId, moveData) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/games/${gameId}/moves`,
      moveData
    );

    return response.data;
  } catch (error) {
    console.error('Error submitting move:', error);
    throw error;
  }
};

/**
 * GET current state of a game (the result of the last move).
 */
export const getCheckersPositions = async gameId => {
  const { data } = await instance.get(`/games/${gameId}/moves`);
  return data;
};

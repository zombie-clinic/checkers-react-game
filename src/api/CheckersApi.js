import axios from 'axios';

// const API_KEY = 'PUT IT HERE IF NEEDED';
const BASE_URL = 'http://localhost:8080/games/';

export const CheckersApi = async (gameId = '7304942c-1bfd-4c23-8c83-c9902a866807') => {
  const url = `${BASE_URL}${gameId}/moves`;
  const { data } = await axios.get(url);
  return data;
};
import axios from 'axios';

const SSE_URL = 'http://localhost:8080/sse/subscribe';

// request template
// curl -X POST --url localhost:8080/sse/subscribe --data '{"gameId":"43a9356e-1dc7-42fc-ac6b-36afd681554d","playerId":1}' -H "content-type: application/json"

export const playerSubscribe = async ({ gameId, playerId }) => {
  try {
    const response = await axios.post(
      SSE_URL,
      { gameId, playerId },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error in playerSubscribe:', error);
    throw error;
  }
};

// const eventSource = new EventSource(url);

// eventSource.onmessage = event => {
//   try {
//     const data = JSON.parse(event.data);
//     setMessage(data);
//     console.log('SSE message:', data);
//   } catch (e) {
//     console.error('Failed to parse SSE message:', e);
//   }
// };

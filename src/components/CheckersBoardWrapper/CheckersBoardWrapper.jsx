import { useParams, useLocation } from 'react-router-dom';
import CheckersBoard from '../CheckersBoard/CheckersBoard';

function CheckersBoardWrapper() {
  const { gameId } = useParams();
  const location = useLocation();
  const { side, playerId } = location.state || {}; // Берём из state, если есть

  if (!side || !playerId) {
    return <div>Error: Missing game data.</div>; // На случай, если зашли напрямую без state
  }

  return <CheckersBoard gameId={gameId} side={side} playerId={playerId} />;
}

export default CheckersBoardWrapper;

import { useParams, useLocation } from 'react-router-dom';
import CheckersBoard from '../CheckersBoard/CheckersBoard';

function CheckersBoardWrapper() {
  const { gameId } = useParams();
  const location = useLocation();
  const { side, playerId, startingState, startingPossibleMoves } =
    location.state || {}; // use navigation state if present

  if (!side || !playerId) {
    return <div>Error: Missing game data.</div>; // fallback when visiting directly
  }

  return (
    <CheckersBoard
      gameId={gameId}
      side={side}
      playerId={playerId}
      startingState={startingState}
      startingPossibleMoves={startingPossibleMoves}
    />
  );
}

export default CheckersBoardWrapper;

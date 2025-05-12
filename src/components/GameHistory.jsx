const GameHistory = ({ history }) => {
  return (
    <div className="mt-8 bg-gray-100 p-4 rounded-lg shadow-inner max-h-64 overflow-y-auto">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Game History</h3>
      {history.length === 0 ? (
        <p className="text-gray-500">No games played yet</p>
      ) : (
        <ul className="space-y-2">
          {history.map((game, index) => (
            <li key={index} className="bg-white p-3 rounded shadow">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">
                    Game {history.length - index}: {/* Calculate game number based on array length */}
                    <span className={
                      game.result === 'Win' ? 'text-green-600' :
                      game.result === 'Lose' ? 'text-red-600' : 'text-yellow-600'
                    }>
                      {game.result}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Score: You {game.playerScore} - {game.computerScore} System
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(game.timestamp).toLocaleString()} •
                    {Math.floor(game.duration / 60)}m {game.duration % 60}s •
                    {game.rounds} rounds
                  </p>
                </div>
                {game.endedEarly && (
                  <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                    Ended Early
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GameHistory;
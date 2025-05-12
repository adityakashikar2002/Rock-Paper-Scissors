import ReactConfetti from 'react-confetti';
import { useEffect, useState } from 'react';

const GameResult = ({ playerScore, computerScore, onPlayAgain, onNewGame }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    if (playerScore > computerScore) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [playerScore, computerScore]);

  const getResult = () => {
    if (playerScore > computerScore) return 'player';
    if (computerScore > playerScore) return 'computer';
    return 'draw';
  };

  const getResultColor = () => {
    if (getResult() === 'player') return 'text-green-600';
    if (getResult() === 'computer') return 'text-red-600';
    return 'text-yellow-600';
  };

  const getResultEmoji = () => {
    if (getResult() === 'player') return '🎉';
    if (getResult() === 'computer') return '😢';
    return '🤝';
  };

  return (
    <div className="text-center">
      {showConfetti && (
        <ReactConfetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
        />
      )}

      <div className="mb-6">
        <h2 className={`text-3xl font-bold ${getResultColor()} mb-2`}>
          {getResult() === 'player' && 'You Win!'}
          {getResult() === 'computer' && 'You Lose!'}
          {getResult() === 'draw' && "It's a Draw!"}
          <span className="ml-2">{getResultEmoji()}</span>
        </h2>
        <p className="text-lg">
          Final Score: You {playerScore} - {computerScore} System
        </p>
      </div>

      <div className="flex justify-center space-x-4">
        <button
          onClick={onNewGame}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg transition-all duration-200"
        >
          New Game
        </button>
      </div>
    </div>
  );
};

export default GameResult;
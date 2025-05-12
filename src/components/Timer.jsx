import { useEffect, useState } from 'react';

const Timer = ({ initialTime, onTimeUp, isRunning, onEndGame, key }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  
  // Reset timer when initialTime changes
  useEffect(() => {
    setTimeLeft(initialTime);
  }, [initialTime]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, onTimeUp]);

  const getTimerColor = () => {
    if (timeLeft <= 10) return 'text-red-500';
    if (timeLeft <= 30) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <div className="text-center mb-4">
      {isRunning ? (
        <div className="flex flex-col items-center">
          <div className={`text-3xl font-bold ${getTimerColor()} mb-2`}>
            {formatTime(timeLeft)}
          </div>
          <button
            onClick={onEndGame}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-sm shadow transition-all duration-200"
          >
            End Game
          </button>
        </div>
      ) : (
        <div className="text-xl font-semibold text-gray-700">
          Game Duration: {formatTime(initialTime)}
        </div>
      )}
    </div>
  );
};

export default Timer;
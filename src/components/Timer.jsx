// import { useEffect, useState, useRef } from 'react';

// const Timer = ({ initialTime, onTimeUp, isRunning, onEndGame, resetTrigger }) => {
//   const [timeLeft, setTimeLeft] = useState(initialTime);
//   const timerRef = useRef(null);
//   const prevIsRunningRef = useRef(isRunning);

//   // Reset timer when initialTime or resetTrigger changes
//   useEffect(() => {
//     setTimeLeft(initialTime);
//     // Clear existing interval if resetting
//     if (timerRef.current) {
//       clearInterval(timerRef.current);
//       timerRef.current = null;
//     }
//   }, [initialTime, resetTrigger]);

//   // Format time as MM:SS
//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
//   };

//   useEffect(() => {
//     // Only update timer if isRunning actually changed
//     if (prevIsRunningRef.current === isRunning) return;
//     prevIsRunningRef.current = isRunning;

//     // Clear any existing interval
//     if (timerRef.current) {
//       clearInterval(timerRef.current);
//       timerRef.current = null;
//     }

//     if (isRunning) {
//       timerRef.current = setInterval(() => {
//         setTimeLeft((prev) => {
//           if (prev <= 1) {
//             clearInterval(timerRef.current);
//             onTimeUp();
//             return 0;
//           }
//           return prev - 1;
//         });
//       }, 1000);
//     }
//   }, [isRunning, onTimeUp]);

//   // Cleanup on unmount
//   useEffect(() => {
//     return () => {
//       if (timerRef.current) {
//         clearInterval(timerRef.current);
//       }
//     };
//   }, []);

//   const getTimerColor = () => {
//     if (timeLeft <= 10) return 'text-red-500';
//     if (timeLeft <= 30) return 'text-yellow-500';
//     return 'text-green-500';
//   };

//   return (
//     <div className="text-center mb-4">
//       {isRunning ? (
//         <div className="flex flex-col items-center">
//           <div className={`text-3xl font-bold ${getTimerColor()} mb-2`}>
//             {formatTime(timeLeft)}
//           </div>
//           <button
//             onClick={onEndGame}
//             className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-sm shadow transition-all duration-200"
//           >
//             End Game
//           </button>
//         </div>
//       ) : (
//         <div className="text-xl font-semibold text-gray-700">
//           Game Duration: {formatTime(initialTime)}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Timer;


import { useEffect, useState, useRef } from 'react';

const Timer = ({ initialTime, onTimeUp, isRunning, onEndGame, resetTrigger }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const timerRef = useRef(null);
  const prevIsRunningRef = useRef(isRunning);

  useEffect(() => {
    setTimeLeft(initialTime);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, [initialTime, resetTrigger]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  useEffect(() => {
    if (prevIsRunningRef.current === isRunning) return;
    prevIsRunningRef.current = isRunning;

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            // Use setTimeout to defer the execution of onTimeUp
            setTimeout(() => {
              onTimeUp();
            }, 0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  }, [isRunning, onTimeUp]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

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
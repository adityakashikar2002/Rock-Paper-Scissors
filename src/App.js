import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getRandomChoice, determineWinner, getResultMessage } from './utils/gameLogic';
import { saveGameToLocalStorage, getGamesFromLocalStorage, clearGameHistory } from './utils/storage';
import ChoiceButton from './components/ChoiceButton';
import GameResult from './components/GameResult';
import GameHistory from './components/GameHistory';
import Timer from './components/Timer';
import RulesModal from './components/RulesModal';
import './App.css';

const DEFAULT_GAME_TIME = 30; // 30 seconds

const App = () => {
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [gameHistory, setGameHistory] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [round, setRound] = useState(0);
  const [showRules, setShowRules] = useState(false);
  const [timeLeft, setTimeLeft] = useState(DEFAULT_GAME_TIME);

  useEffect(() => {
    const savedHistory = getGamesFromLocalStorage();
    setGameHistory(savedHistory);
  }, []);

  const startGame = () => {
    setPlayerScore(0);
    setComputerScore(0);
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
    setGameStarted(true);
    setGameEnded(false);
    setRound(0);
    setTimeLeft(DEFAULT_GAME_TIME);
  };

  const handleChoice = (choice) => {
    if (!gameStarted || gameEnded) return;

    const compChoice = getRandomChoice();
    const gameResult = determineWinner(choice, compChoice);

    setPlayerChoice(choice);
    setComputerChoice(compChoice);
    setResult(gameResult);
    setRound(prev => prev + 1);

    if (gameResult === 'player') {
      setPlayerScore(prev => prev + 1);
    } else if (gameResult === 'computer') {
      setComputerScore(prev => prev + 1);
    }
  };

  const handleGameEnd = (endedEarly = false) => {
    const gameResult = playerScore > computerScore ? 'Win' : 
                      computerScore > playerScore ? 'Lose' : 'Draw';
    
    const gameData = {
      result: gameResult,
      playerScore,
      computerScore,
      rounds: round,
      timestamp: new Date().toISOString(),
      duration: DEFAULT_GAME_TIME - timeLeft,
      endedEarly
    };

    saveGameToLocalStorage(gameData);
    setGameHistory(prev => [gameData, ...prev]);
    setGameEnded(true);
    setGameStarted(false);
  };

  const playAgain = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
    setGameStarted(true);
    setGameEnded(false);
    setPlayerScore(0);
    setComputerScore(0);
    setRound(0);
    setTimeLeft(DEFAULT_GAME_TIME);
  };

  const newGame = () => {
    setPlayerScore(0);
    setComputerScore(0);
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
    setGameStarted(false);
    setGameEnded(false);
    setRound(0);
  };

  const clearHistory = () => {
    clearGameHistory();
    setGameHistory([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.h1 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-2"
        >
          Rock Paper Scissors
        </motion.h1>
        
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setShowRules(true)}
            className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            Game Rules
          </button>
        </div>

        <RulesModal isOpen={showRules} onClose={() => setShowRules(false)} />

        <div className="bg-white rounded-xl shadow-2xl p-6 mb-8">
          <div className="flex justify-between items-center mb-8">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-700">You</h3>
              <div className="text-3xl font-bold text-blue-600">{playerScore}</div>
            </div>
            
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-700">Round</h3>
              <div className="text-3xl font-bold text-purple-600">{round}</div>
            </div>
            
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-700">System</h3>
              <div className="text-3xl font-bold text-red-600">{computerScore}</div>
            </div>
          </div>

          <Timer 
            initialTime={DEFAULT_GAME_TIME}
            onTimeUp={() => handleGameEnd(false)} 
            isRunning={gameStarted && !gameEnded}
            onEndGame={() => handleGameEnd(true)}
          />

          <AnimatePresence>
            {!gameEnded && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex justify-center space-x-4 md:space-x-8 mb-8"
              >
                <ChoiceButton 
                  choice="ROCK" 
                  onClick={handleChoice} 
                  disabled={!gameStarted || gameEnded} 
                />
                <ChoiceButton 
                  choice="PAPER" 
                  onClick={handleChoice} 
                  disabled={!gameStarted || gameEnded} 
                />
                <ChoiceButton 
                  choice="SCISSORS" 
                  onClick={handleChoice} 
                  disabled={!gameStarted || gameEnded} 
                />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {playerChoice && computerChoice && !gameEnded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mb-8"
              >
                <div className="flex justify-between items-center mb-6">
                  <div className="text-center">
                    <div className="text-xl font-semibold">You chose</div>
                    <div className="mt-2">
                      <img 
                        src={`/images/${playerChoice.toLowerCase()}.png`} 
                        alt={playerChoice} 
                        className="h-16 w-16 object-contain mx-auto"
                      />
                    </div>
                  </div>
                  
                  <div className="text-3xl font-bold">VS</div>
                  
                  <div className="text-center">
                    <div className="text-xl font-semibold">System chose</div>
                    <div className="mt-2">
                      <img 
                        src={`/images/${computerChoice.toLowerCase()}.png`} 
                        alt={computerChoice} 
                        className="h-16 w-16 object-contain mx-auto"
                      />
                    </div>
                  </div>
                </div>

                <div className={`text-center text-xl font-bold ${
                  result === 'player' ? 'text-green-600' : 
                  result === 'computer' ? 'text-red-600' : 'text-yellow-600'
                }`}>
                  {getResultMessage(playerChoice, computerChoice, result)}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {gameEnded && (
            <GameResult 
              playerScore={playerScore}
              computerScore={computerScore}
              onPlayAgain={playAgain}
              onNewGame={newGame}
            />
          )}

          <div className="flex justify-center space-x-4 mt-6">
            {!gameStarted && !gameEnded && (
              <button
                onClick={startGame}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg transition-all duration-200"
              >
                Start Game
              </button>
            )}
          </div>
        </div>

        <GameHistory history={gameHistory} />

        {gameHistory.length > 0 && (
          <div className="text-center mt-4">
            <button
              onClick={clearHistory}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded text-sm shadow transition-all duration-200"
            >
              Clear History
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
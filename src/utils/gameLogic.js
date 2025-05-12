export const determineWinner = (playerChoice, computerChoice) => {
  if (playerChoice === computerChoice) {
    return 'draw';
  }

  if (
    (playerChoice === 'ROCK' && computerChoice === 'SCISSORS') ||
    (playerChoice === 'PAPER' && computerChoice === 'ROCK') ||
    (playerChoice === 'SCISSORS' && computerChoice === 'PAPER')
  ) {
    return 'player';
  }

  return 'computer';
};

export const getRandomChoice = () => {
  const choices = ['ROCK', 'PAPER', 'SCISSORS'];
  const randomIndex = Math.floor(Math.random() * 3);
  return choices[randomIndex];
};

export const getResultMessage = (playerChoice, computerChoice, result) => {
  if (result === 'draw') return `Both chose ${playerChoice}. It's a draw!`;
  
  if (result === 'player') {
    if (playerChoice === 'ROCK' && computerChoice === 'SCISSORS') return 'Rock crushes scissors! You win!';
    if (playerChoice === 'PAPER' && computerChoice === 'ROCK') return 'Paper covers rock! You win!';
    if (playerChoice === 'SCISSORS' && computerChoice === 'PAPER') return 'Scissors cut paper! You win!';
  } else {
    if (computerChoice === 'ROCK' && playerChoice === 'SCISSORS') return 'Rock crushes scissors! You lose!';
    if (computerChoice === 'PAPER' && playerChoice === 'ROCK') return 'Paper covers rock! You lose!';
    if (computerChoice === 'SCISSORS' && playerChoice === 'PAPER') return 'Scissors cut paper! You lose!';
  }
  
  return '';
};
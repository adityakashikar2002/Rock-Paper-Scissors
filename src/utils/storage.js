export const saveGameToLocalStorage = (gameData) => {
  const games = JSON.parse(localStorage.getItem('rpsGames')) || [];
  games.unshift(gameData);
  localStorage.setItem('rpsGames', JSON.stringify(games));
};

export const getGamesFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('rpsGames')) || [];
};

export const clearGameHistory = () => {
  localStorage.removeItem('rpsGames');
};
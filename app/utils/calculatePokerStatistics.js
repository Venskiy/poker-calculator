export const calculatePokerStatistics = () => {
  return new Promise((resolve, reject) => {
    fetch('https://dreamerrr.me/poker_calculator/count', {
      method: 'post',
      body: JSON.stringify({
        pow: 'pow'
      })
    }).then(response => {
      response.json().then(pokerStatistics => resolve(pokerStatistics));
    });
  });
};

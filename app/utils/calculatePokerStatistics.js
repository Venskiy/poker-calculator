export const calculatePokerStatistics = (playersAmount, pokerTableCards) => {
  let playersCards = [];
  let boardCards = [];

  for(let i = 0; i < playersAmount; ++i) {
    playersCards.push(pokerTableCards[`XF${i + 1}`]);
    playersCards.push(pokerTableCards[`XS${i + 1}`]);
  }

  for(let i = 0; i < 5; ++i) {
    if(!pokerTableCards[`XB${i + 1}`].startsWith('X')) {
      boardCards.push(pokerTableCards[`XB${i + 1}`]);
    }
  }

  return new Promise((resolve, reject) => {
    fetch('https://dreamerrr.me/poker_calculator/count', {
      method: 'post',
      body: JSON.stringify({
        playersCards: playersCards,
        boardCards: boardCards
      })
    }).then(response => {
      response.json().then(pokerStatistics => resolve(pokerStatistics));
    });
  });
};

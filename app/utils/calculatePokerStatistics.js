export const calculatePokerStatistics = (playersAmount, playerCards, boardCards) => {
  let _playerCards = [];
  let _boardCards = [];

  for(let i = 0; i < playersAmount; ++i) {
    _playerCards.push(playerCards[`XF${i + 1}`]);
    _playerCards.push(playerCards[`XS${i + 1}`]);
  }

  for (let key of Object.keys(boardCards)) {
    if(!boardCards[key].startsWith('X')) {
      _boardCards.push(boardCards[key]);
    }
  }

  console.log(_playerCards, _boardCards);

  return new Promise((resolve, reject) => {
    fetch('https://dreamerrr.me/poker_calculator/count', {
      method: 'post',
      body: JSON.stringify({
        playersCards: _playerCards,
        boardCards: _boardCards
      })
    }).then(response => {
      response.json().then(pokerStatistics => resolve(pokerStatistics));
    });
  });
};

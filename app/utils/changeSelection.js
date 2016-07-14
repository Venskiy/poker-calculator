export const changeSelection = (playersAmount, currentSelectedCard, playerCards, boardCards) => {
  if(currentSelectedCard.startsWith('XB')) {
    for (let key of Object.keys(boardCards)) {
      if(boardCards[key].startsWith('X')) {
        return Promise.resolve(key);
      }
    }

    for(let i = 0; i < playersAmount; ++i) {
      if(playerCards[`XF${i + 1}`].startsWith('X')) {
        return Promise.resolve(`XF${i + 1}`)
      }
      if(playerCards[`XS${i + 1}`].startsWith('X')) {
        return Promise.resolve(`XS${i + 1}`)
      }
    }
  }
  else {
    for(let i = 0; i < playersAmount; ++i) {
      if(playerCards[`XF${i + 1}`].startsWith('X')) {
        return Promise.resolve(`XF${i + 1}`)
      }
      if(playerCards[`XS${i + 1}`].startsWith('X')) {
        return Promise.resolve(`XS${i + 1}`)
      }
    }

    for (let key of Object.keys(boardCards)) {
      if(boardCards[key].startsWith('X')) {
        return Promise.resolve(key);
      }
    }
  }
  return Promise.resolve('');
};

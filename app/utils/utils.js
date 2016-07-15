export const isPlayerCardsFilled = (playersAmount, playerCards) => {
  for(let i = 0; i < playersAmount; ++i) {
    if(playerCards[`XF${i + 1}`].startsWith('X') || playerCards[`XS${i + 1}`].startsWith('X')) {
      return false;
    }
  }
  return true;
}

export const getBoardCardsAmount = (boardCards) => {
  let amount = 0;
  for (let key of Object.keys(boardCards)) {
    if(!boardCards[key].startsWith('X')) {
      ++amount;
    }
  }
  return amount;
}

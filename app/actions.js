export const setPlayersAmount = (playersAmount) => ({
  type: 'SET_PLAYERS_AMOUNT',
  playersAmount
});

export const selectCard = (cardName) => ({
  type: 'SELECT_CARD',
  cardName
});

export const addCardToPokerTable = (selectedCard, cardName) => ({
  type: 'ADD_CARD_TO_POKER_TABLE',
  selectedCard,
  cardName
});

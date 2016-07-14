export const selectCard = (cardName) => ({
  type: 'SELECT_CARD',
  cardName
});

export const addCardToPokerTable = (cardName) => ({
  type: 'ADD_CARD_TO_POKER_TABLE',
  cardName
});

export const removeCardFromPokerTable = (cardName) => ({
  type: 'REMOVE_CARD_FROM_POKER_TABLE',
  cardName
});

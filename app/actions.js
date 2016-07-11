export const setPlayersAmount = (playersAmount) => ({
  type: 'SET_PLAYERS_AMOUNT',
  playersAmount
});

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

export const calculateStatistics = (pokerStatistics) => ({
  type: 'ADD_POKER_STATISTICS',
  pokerStatistics
});

export const reset = () => ({
  type: 'RESET'
});

export const changePlayerName = (playerId, playerName) => ({
  type: 'CHANGE_PLAYER_NAME',
  playerId,
  playerName
});

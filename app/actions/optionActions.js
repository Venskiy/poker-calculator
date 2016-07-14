import {calculatePokerStatistics} from 'utils/calculatePokerStatistics';

export const setPlayersAmount = (playersAmount) => ({
  type: 'SET_PLAYERS_AMOUNT',
  playersAmount
});

export const resetOptions = () => ({
  type: 'RESET_OPTIONS'
});

export const changePlayerName = (playerId, playerName) => ({
  type: 'CHANGE_PLAYER_NAME',
  playerId,
  playerName
});

export const addPokerStatistics = () => {
  return (dispatch, getState) => {
    calculatePokerStatistics(getState().options.playersAmount,
                              getState().cards.playerCards,
                              getState().cards.boardCards).then(pokerStatistics => {
      dispatch({type: 'ADD_POKER_STATISTICS', pokerStatistics});
    });
  };
};

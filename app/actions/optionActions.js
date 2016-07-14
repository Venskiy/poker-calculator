import {calculatePokerStatistics} from 'utils/calculatePokerStatistics';

export const setPlayersAmount = (playersAmount) => ({
  type: 'SET_PLAYERS_AMOUNT',
  playersAmount
});

export const reset = () => ({
  type: 'RESET'
});

export const changePlayerName = (playerId, playerName) => ({
  type: 'CHANGE_PLAYER_NAME',
  playerId,
  playerName
});

export const addPokerStatistics = () => {
  return (dispatch, getState) => {
    calculatePokerStatistics(getState().options.playersAmount, getState().cards.pokerTableCards).then(pokerStatistics => {
      dispatch({type: 'ADD_POKER_STATISTICS', pokerStatistics});
    });
  };
};

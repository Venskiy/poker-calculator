import toastr from 'toastr';
import {calculatePokerStatistics} from 'utils/calculatePokerStatistics';
import {isPlayerCardsFilled, getBoardCardsAmount} from 'utils/utils';

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

export const beginCounting = () => ({
  type: 'BEGIN_COUNTING'
});

export const completeCounting = () => ({
  type: 'COMPLETE_COUNTING'
});

export const addPokerStatistics = (isAutomatically) => {
  return (dispatch, getState) => {
    if(isPlayerCardsFilled(getState().options.playersAmount, getState().cards.playerCards)) {
      const amount = getBoardCardsAmount(getState().cards.boardCards);
      if(amount === 1 || amount === 2) {
        if(!isAutomatically) {
          toastr.error('Board must contain 0, 3, 4, or 5 cards.');
        }
      }
      else {
        dispatch(beginCounting());
        calculatePokerStatistics(getState().options.playersAmount,
                                  getState().cards.playerCards,
                                  getState().cards.boardCards).then(pokerStatistics => {
          dispatch({type: 'ADD_POKER_STATISTICS', pokerStatistics});
          dispatch(completeCounting());
        });
      }
    }
    else {
      if(!isAutomatically) {
        toastr.error("All player's positions must be filled.");
      }
    }
  };
};

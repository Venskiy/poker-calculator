import {changeSelection} from 'utils/changeSelection';

export const selectCard = (cardName) => ({
  type: 'SELECT_CARD',
  cardName
});

export const addPokerTableCard = (cardName) => ({
  type: 'ADD_POKER_TABLE_CARD',
  cardName
});

export const removePlayerCard = (cardName) => ({
  type: 'REMOVE_PLAYER_CARD',
  cardName
});

export const removeBoardCard = (cardName) => ({
  type: 'REMOVE_BOARD_CARD',
  cardName
});

export const addChosenCard = (cardName) => ({
  type: 'ADD_CHOSEN_CARD',
  cardName
});

export const removeChosenCard = (cardName) => ({
  type: 'REMOVE_CHOSEN_CARD',
  cardName
});

export const resetCards = () => ({
  type: 'RESET_CARDS'
});

export const changeSelectedCard = () => {
  return (dispatch, getState) => {
    changeSelection(getState().options.playersAmount,
                    getState().cards.selectedCard,
                    getState().cards.playerCards,
                    getState().cards.boardCards).then(cardName => {
      dispatch({type: 'SELECT_CARD', cardName});
    });
  };
};

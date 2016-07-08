import {changeSelection} from 'utils/changeSelection';

const initialState = {
  playersAmount: 2,
  selectedCard: 'XF1',
  pokerTableCards: {
    'XF1': 'XF1', 'XS1': 'XS1',
    'XF2': 'XF2', 'XS2': 'XS2',
    'XF3': 'XF3', 'XS3': 'XS3',
    'XF4': 'XF4', 'XS4': 'XS4',
    'XF5': 'XF5', 'XS5': 'XS5',
    'XF6': 'XF6', 'XS6': 'XS6',
    'XF7': 'XF7', 'XS7': 'XS7',
    'XF8': 'XF8', 'XS8': 'XS8',
    'XF9': 'XF9', 'XS9': 'XS9',
    'XB1': 'XB1', 'XB2': 'XB2', 'XB3': 'XB3', 'XB4': 'XB4', 'XB5': 'XB5'
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'SET_PLAYERS_AMOUNT':
      return Object.assign({}, state, {playersAmount: action.playersAmount});
    case 'SELECT_CARD':
      return Object.assign({}, state, {selectedCard: action.cardName});
    case 'ADD_CARD_TO_POKER_TABLE':
      const pokerTableCards = Object.assign({}, state.pokerTableCards);
      pokerTableCards[action.selectedCard] = action.cardName;
      const selectedCard = changeSelection(pokerTableCards);
      return Object.assign({}, state, {selectedCard:selectedCard, pokerTableCards: pokerTableCards});
    default:
      return state;
  }
}

import initialState from './initialState';
import {changeSelection} from 'utils/changeSelection';

export default function cardReducer(state = initialState.cards, action) {
  let pokerTableCards;
  let chosenCards;
  let selectedCard;
  switch (action.type) {
    case 'SELECT_CARD':
      return Object.assign({}, state, {selectedCard: action.cardName});
    case 'ADD_CARD_TO_POKER_TABLE':
      pokerTableCards = Object.assign({}, state.pokerTableCards);
      pokerTableCards[state.selectedCard] = action.cardName;
      selectedCard = changeSelection(pokerTableCards);
      chosenCards = state.chosenCards;
      chosenCards.push(action.cardName);
      return Object.assign({}, state, {selectedCard: selectedCard, pokerTableCards: pokerTableCards, chosenCards: chosenCards});
    case 'REMOVE_CARD_FROM_POKER_TABLE':
      const cardName = action.cardName;
      pokerTableCards = Object.assign({}, state.pokerTableCards);
      for (var key of Object.keys(pokerTableCards)) {
        if(pokerTableCards[key] === cardName) {
          pokerTableCards[key] = key;
          selectedCard = key;
          break;
        }
      }
      chosenCards = state.chosenCards.filter(card => card !== cardName);
      return Object.assign({}, state, {selectedCard: selectedCard, pokerTableCards: pokerTableCards, chosenCards: chosenCards})
    default:
      return state;
  }
}

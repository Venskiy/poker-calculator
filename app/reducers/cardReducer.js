import initialState from './initialState';
import {changeSelection} from 'utils/changeSelection';

export default function cardReducer(state = initialState.cards, action) {
  let playerCards;
  let boardCards;
  let chosenCards;
  let selectedCard;
  switch (action.type) {
    case 'SELECT_CARD':
      return Object.assign({}, state, {selectedCard: action.cardName});
    case 'ADD_POKER_TABLE_CARD':
      playerCards = Object.assign({}, state.playerCards);
      boardCards = Object.assign({}, state.boardCards);
      if(state.selectedCard.startsWith('XB')) {
        boardCards[state.selectedCard] = action.cardName;
      }
      else {
        playerCards[state.selectedCard] = action.cardName;
      }
      selectedCard = 'XF1';
      chosenCards = state.chosenCards;
      chosenCards.push(action.cardName);
      console.log(playerCards, boardCards);
      return Object.assign({}, state, {selectedCard: selectedCard, playerCards: playerCards, boardCards: boardCards, chosenCards: chosenCards});
    case 'REMOVE_PLAYER_CARD':
      playerCards = Object.assign({}, state.playerCards);
      for (var key of Object.keys(playerCards)) {
        if(playerCards[key] === action.cardName) {
          playerCards[key] = key;
          selectedCard = key;
          break;
        }
      }
      chosenCards = state.chosenCards.filter(card => card !== action.cardName);
      return Object.assign({}, state, {selectedCard: selectedCard, playerCards: playerCards, chosenCards: chosenCards});
    case 'REMOVE_BOARD_CARD':
      boardCards = Object.assign({}, state.boardCards);
      for (var key of Object.keys(boardCards)) {
        if(boardCards[key] === action.cardName) {
          boardCards[key] = key;
          selectedCard = key;
          break;
        }
      }
      chosenCards = state.chosenCards.filter(card => card !== action.cardName);
      return Object.assign({}, state, {selectedCard: selectedCard, boardCards: boardCards, chosenCards: chosenCards});
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

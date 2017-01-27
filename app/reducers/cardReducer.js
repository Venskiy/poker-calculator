import initialState from './initialState';

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
      return Object.assign({}, state, {playerCards: playerCards,
                                       boardCards: boardCards});
    case 'REMOVE_PLAYER_CARD':
      playerCards = Object.assign({}, state.playerCards);
      for (let key of Object.keys(playerCards)) {
        if(playerCards[key] === action.cardName) {
          playerCards[key] = key;
          selectedCard = key;
          break;
        }
      }
      return Object.assign({}, state, {selectedCard: selectedCard,
                                       playerCards: playerCards});
    case 'REMOVE_BOARD_CARD':
      boardCards = Object.assign({}, state.boardCards);
      for (let key of Object.keys(boardCards)) {
        if(boardCards[key] === action.cardName) {
          boardCards[key] = key;
          selectedCard = key;
          break;
        }
      }
      return Object.assign({}, state, {selectedCard: selectedCard,
                                      boardCards: boardCards});
    case 'ADD_CHOSEN_CARD':
      return Object.assign({}, state, {chosenCards: state.chosenCards.concat(action.cardName)});
    case 'REMOVE_CHOSEN_CARD':
      return Object.assign({}, state, {chosenCards: state.chosenCards.filter(card => card !== action.cardName)});
    case 'SET_PLAYER_CARDS':
      playerCards = Object.assign({}, state.playerCards);
      for(let i = parseInt(action.playersAmount); i < 9; ++i) {
        playerCards[`XF${i + 1}`] = `XF${i + 1}`;
        playerCards[`XS${i + 1}`] = `XS${i + 1}`;
      }
      return Object.assign({}, state, {playerCards: playerCards});
    case 'RESET_CARDS':
      return Object.assign({}, initialState.cards);
    default:
      return state;
  }
}

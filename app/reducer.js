import {changeSelection} from 'utils/changeSelection';

const initialState = {
  playersAmount: 1,
  playerNames: ['Player1', 'Player2', 'Player3', 'Player4', 'Player5', 'Player6', 'Player7', 'Player8', 'Player9'],
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
  },
  chosenCards: [],
  winningChances: [],
  histograms: []
};

export default function(state = initialState, action) {
  let pokerTableCards;
  let chosenCards;
  let selectedCard;
  switch (action.type) {
    case 'SET_PLAYERS_AMOUNT':
      return Object.assign({}, state, {playersAmount: action.playersAmount});
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
      return Object.assign({}, state, {selectedCard: selectedCard, pokerTableCards: pokerTableCards, chosenCards: chosenCards});
    case 'RESET':
      return Object.assign({}, initialState, {chosenCards: []});
    case 'CHANGE_PLAYER_NAME':
      const playerNames = Object.assign([], state.playerNames);
      playerNames[action.playerId] = action.playerName;
      return Object.assign({}, state, {playerNames: playerNames});
    case 'ADD_POKER_STATISTICS':
      const winningChances = Object.assign([], action.pokerStatistics.percentages);
      const histograms = Object.assign([], action.pokerStatistics.histograms);
      return Object.assign({}, state, {winningChances:winningChances, histograms: histograms});
    default:
      return state;
  }
}

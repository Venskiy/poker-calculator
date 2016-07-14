import initialState from './initialState';

export default function optionReducer(state = initialState.options, action) {
  let pokerTableCards;
  let chosenCards;
  let selectedCard;
  switch (action.type) {
    case 'SET_PLAYERS_AMOUNT':
      return Object.assign({}, state, {playersAmount: action.playersAmount});
    case 'ADD_POKER_STATISTICS':
      const winningChances = Array.from(action.pokerStatistics.percentages);
      const histograms = Array.from(action.pokerStatistics.histograms);
      return Object.assign({}, state, {winningChances:winningChances, histograms: histograms});
    case 'RESET_OPTIONS':
      return Object.assign({}, initialState.options);
    case 'CHANGE_PLAYER_NAME':
      const playerNames = Array.from(state.playerNames);
      playerNames[action.playerId] = action.playerName;
      return Object.assign({}, state, {playerNames: playerNames});
    default:
      return state;
  }
}

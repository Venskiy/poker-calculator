import initialState from './initialState';

export default function optionReducer(state = initialState.options, action) {
  let pokerTableCards;
  let chosenCards;
  let selectedCard;
  switch (action.type) {
    case 'SET_PLAYERS_AMOUNT':
      return Object.assign({}, state, {playersAmount: parseInt(action.playersAmount)});
    case 'RESET_OPTIONS':
      return Object.assign({}, initialState.options);
    case 'CHANGE_PLAYER_NAME':
      const playerNames = Array.from(state.playerNames);
      playerNames[action.playerId] = action.playerName;
      return Object.assign({}, state, {playerNames: playerNames});
    case 'ADD_POKER_STATISTICS':
      return Object.assign({}, state, {winningChances: Array.from(action.pokerStatistics.percentages),
                                       histograms: Array.from(action.pokerStatistics.histograms)});
    case 'BEGIN_COUNTING':
      return Object.assign({}, state, {isCounting: true});
    case 'COMPLETE_COUNTING':
      return Object.assign({}, state, {isCounting: false});
    default:
      return state;
  }
}

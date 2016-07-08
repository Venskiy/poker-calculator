const initialState = {
  playersAmount: 2,
  selectedCard: 'XF1'
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'SET_PLAYERS_AMOUNT':
      return Object.assign({}, state, {playersAmount: action.playersAmount});
    case 'SELECT_CARD':
      return Object.assign({}, state, {selectedCard: action.cardName})
    default:
      return state;
  }
}

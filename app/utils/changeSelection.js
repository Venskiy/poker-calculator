export const changeSelection = (pokerTableCards) => {
  for (var key of Object.keys(pokerTableCards)) {
    if(pokerTableCards[key].startsWith('X')) {
      return key;
    }
  }
};

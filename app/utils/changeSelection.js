export const changeSelection = (pokerTableCards) => {
  for (let key of Object.keys(pokerTableCards)) {
    if(pokerTableCards[key].startsWith('X')) {
      return key;
    }
  }
};

export const values = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
export const suits = ['D', 'H', 'S', 'C'];

export const getCardSuit = (cardSuit) => {
  switch (cardSuit) {
    case 'D':
      return 'diams';
    case 'H':
      return 'hearts';
    case 'S':
      return 'spades';
    case 'C':
      return 'clubs';
    default:
      break;
  }
}

export const getCardSuitBadge = (cardSuit) => {
  switch (cardSuit) {
    case 'S':
      return '♠';
    case 'C':
      return '♣';
    case 'D':
      return '♦';
    case 'H':
      return '♥';
    default:
      break;
  }
}

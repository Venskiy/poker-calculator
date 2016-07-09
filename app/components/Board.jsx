import React from 'react';

import PokerTableCard from './PokerTableCard';

export default ({pokerTableCards, selectedCard, onSelectCard}) => {
  return <div className="Board">
    {[...Array(5)].map((x, i) =>
      <PokerTableCard cardName={pokerTableCards[`XB${i + 1}`]} selected={selectedCard} onSelect={onSelectCard} />
    )}
  </div>
}

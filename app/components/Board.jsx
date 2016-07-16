import React from 'react';

import PokerTableCard from './PokerTableCard';

export default ({cards, selectedCard, onSelectCard, onRemoveCard}) => {
  return <div className="Board">
    {[...Array(5)].map((x, i) =>
      <PokerTableCard
        cardName={cards[`XB${i + 1}`]}
        selected={selectedCard}
        onSelect={onSelectCard}
        onRemove={onRemoveCard}
        key={cards[`XB${i + 1}`]} />
    )}
  </div>
}

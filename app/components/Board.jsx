import React from 'react';

import Card from './Card';

export default ({pokerTableCards, selectedCard, onSelectCard}) => {
  return <div className="Board">
    {[...Array(5)].map((x, i) =>
      <Card cardName={pokerTableCards[`XB${i + 1}`]} selected={selectedCard} onSelect={onSelectCard} />
    )}
  </div>
}

import React from 'react';

import Card from './Card';

export default ({pokerTableCards, selectedCard, onSelectCard}) => {
  return <div className="Board">
    {[...Array(5)].map((x, i) =>
      <Card cardName={'XB' + i} selected={selectedCard} onSelect={onSelectCard} />
    )}
  </div>
}

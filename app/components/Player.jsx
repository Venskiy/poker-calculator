import React from 'react';

import PokerTableCard from './PokerTableCard';

export default ({number, playerName, cards, selectedCard, winningChances, onSelectCard, onRemoveCard}) => {
  const className = `Player-${number}`;
  const cardNameFirst = cards[`XF${number}`];
  const cardNameSecond = cards[`XS${number}`];

  return <div className={className}>
    <div className="Hand">
      <PokerTableCard
        cardName={cardNameFirst}
        selected={selectedCard}
        onSelect={onSelectCard}
        onRemove={onRemoveCard} />
      <PokerTableCard
        cardName={cardNameSecond}
        selected={selectedCard}
        onSelect={onSelectCard}
        onRemove={onRemoveCard}/>
    </div>
    <div className="PlayerName">{playerName} {winningChances}%</div>
  </div>;
}

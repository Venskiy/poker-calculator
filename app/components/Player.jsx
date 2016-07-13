import React from 'react';

import PokerTableCard from './PokerTableCard';

export default ({number, playerName, pokerTableCards, selectedCard, winningChances, onSelectCard, removeCard}) => {
  const className = `Player-${number}`;
  const cardNameFirst = pokerTableCards[`XF${number}`];
  const cardNameSecond = pokerTableCards[`XS${number}`];

  return <div className={className}>
    <div className="Hand">
      <PokerTableCard cardName={cardNameFirst} selected={selectedCard} onSelect={onSelectCard} removeCard={removeCard} />
      <PokerTableCard cardName={cardNameSecond} selected={selectedCard} onSelect={onSelectCard} removeCard={removeCard}/>
    </div>
    <div className="PlayerName">{playerName} {winningChances}</div>
  </div>;
}

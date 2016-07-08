import React from 'react';

import Card from './Card';

export default ({number, selectedCard, onSelectCard}) => {
  const className = 'Player-' + number;
  const playerName = 'Player' + number;
  const cardNameFirst = 'XF' + number;
  const cardNameSecond = 'XS' + number;

  return <div className={className}>
    <div className="Hand">
      <Card cardName={cardNameFirst} selected={selectedCard} onSelect={onSelectCard} />
      <Card cardName={cardNameSecond} selected={selectedCard} onSelect={onSelectCard} />
    </div>
    <div className="PlayerName">{playerName}</div>
  </div>;
}

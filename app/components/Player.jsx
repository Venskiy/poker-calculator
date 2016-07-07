import React from 'react';

import CardShirt from './CardShirt';

export default ({number}) => {
  const className = 'Player-' + number;
  const playerName = 'Player' + number;

  return <div className={className}>
    <div className="Hand">
      <CardShirt />
      <CardShirt />
    </div>
    <div className="PlayerName">{playerName}</div>
  </div>;
}

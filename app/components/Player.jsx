import React from 'react';

import CardShirt from './CardShirt';

export default () => {
  return <div className="Player">
    <div className="Hand">
      <CardShirt />
      <CardShirt />
    </div>
    <div className="PlayerName">Player</div>
  </div>;
}

import React from 'react';

import CardShirt from './CardShirt';

export default ({number}) => {
  return <div className="Player">
    <div className="Hand">
      <CardShirt />
      <CardShirt />
    </div>
    <div className="PlayerName">{number}</div>
  </div>;
}

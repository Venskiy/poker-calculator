import React from 'react';

import Card from 'components/Card';
import {values, suits} from 'utils/cards';

export default ({selectedCard, onSelectCard}) => {
  return <div className="CardsBlock">
    {suits.map(suit => {
      return <div className="CardsBlock-suit">
        {values.map(value => {
          const cardName = value + suit;
          return <Card cardName={cardName} selected={selectedCard} onSelect={onSelectCard} />;
        })}
      </div>;
    })}
  </div>;
};

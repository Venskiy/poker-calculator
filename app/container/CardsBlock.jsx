import React from 'react';

import Card from 'components/Card';
import {values, suits} from 'utils/cards';

export default ({selected, addCardToPokerTable}) => {
  return <div className="CardsBlock">
    {suits.map(suit => {
      return <div className="CardsBlock-suit">
        {values.map(value => {
          const cardName = value + suit;
          return <Card selected={selected} cardName={cardName} addCard={addCardToPokerTable} />;
        })}
      </div>;
    })}
  </div>;
};

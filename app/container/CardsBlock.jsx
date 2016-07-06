import React from 'react';

import Card from 'components/Card';
import {values, suits} from 'utils/cards';

export default () => {
  return <div className="CardsBlock">
    {suits.map(suit => {
      return <div className="CardsBlock-suit">
        {values.map(value => {
          const path = 'img/cards/' + value + suit + '.png';
          return <Card path={path} />;
        })}
      </div>;
    })}
  </div>;
}

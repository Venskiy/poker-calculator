import React from 'react';
import {connect} from 'react-redux';

import Card from 'components/Card';
import {values, suits} from 'utils/cards';

const CardsBlock = ({selectedCard, chosenCards, addCardToPokerTable}) => {
  return <div className="CardsBlock">
    {suits.map(suit => {
      return <div className="CardsBlock-suit">
        {values.map(value => {
          const cardName = value + suit;
          const isChosen = chosenCards.findIndex(card => card === cardName) > -1;
          return <Card cardName={cardName} isChosen={isChosen} addCard={addCardToPokerTable} />;
        })}
      </div>;
    })}
  </div>;
};

const mapStateToProps = (state) => ({
  chosenCards: state.chosenCards
});

export default connect(mapStateToProps)(CardsBlock);

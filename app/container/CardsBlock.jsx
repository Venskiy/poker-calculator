import React from 'react';
import {connect} from 'react-redux';
import {addPokerTableCard} from 'actions/cardActions';

import Card from 'components/Card';
import {values, suits} from 'utils/cards';

const CardsBlock = ({selectedCard, chosenCards, addPokerTableCard}) => {
  return <div className="CardsBlock">
    {suits.map(suit => {
      return <div className="CardsBlock-suit">
        {values.map(value => {
          const cardName = value + suit;
          const isChosen = chosenCards.findIndex(card => card === cardName) > -1;
          return <Card
                   cardName={cardName}
                   isChosen={isChosen}
                   onClickCard={addPokerTableCard} />;
        })}
      </div>;
    })}
  </div>;
};

const mapStateToProps = (state) => ({
  chosenCards: state.cards.chosenCards
});

const mapDispatchToProps = (dispatch) => ({
  addPokerTableCard(cardName) {
    dispatch(addPokerTableCard(cardName));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CardsBlock);

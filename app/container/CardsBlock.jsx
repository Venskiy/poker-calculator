import React from 'react';
import {connect} from 'react-redux';
import {selectCard} from 'actions';

import Card from 'components/Card';
import {values, suits} from 'utils/cards';

const CardsBlock = ({selectedCard, onSelectCard}) => {
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

const mapStateToProps = (state) => ({
  selectedCard: state.selectedCard
});

const mapDispatchToProps = (dispatch) => ({
  onSelectCard(cardName) {
    dispatch(selectCard(cardName));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CardsBlock);

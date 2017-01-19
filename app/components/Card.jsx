import React from 'react';
import toastr from 'toastr';

import {getCardSuit, getCardSuitBadge} from 'utils/cards';

export default React.createClass({
  propTypes: {
    cardName: React.PropTypes.string.isRequired,
    cardSuit: React.PropTypes.string.isRequired,
    cardValue: React.PropTypes.string.isRequired,
    isChosen: React.PropTypes.bool.isRequired,
    selectedCard: React.PropTypes.string.isRequired,
    onClickCard: React.PropTypes.func.isRequired
  },

  handleClick(cardName) {
    if(this.props.selectedCard.startsWith('X')) {
      if(this.props.isChosen) {
        toastr.error('This card is already chosen.')
      }
      else {
        this.props.onClickCard(cardName);
      }
    }
    else {
      toastr.error('All positions are filled.');
    }
  },

  render() {
    const cardName = this.props.cardName;
    const cardSuit = getCardSuit(this.props.cardSuit);
    const cardSuitBadge = getCardSuitBadge(this.props.cardSuit);
    const className = `card rank-${this.props.cardValue.toLowerCase()} ${cardSuit} ${this.props.isChosen ? 'Card-chosen' : 'Card'}`;

    return <div className={className} onClick={this.handleClick.bind(this, cardName)}>
      <span className="rank">{this.props.cardValue}</span>
      <span className="suit">{cardSuitBadge}</span>
    </div>
  }
});

import React from 'react';

import {getCardSuit, getCardSuitBadge} from 'utils/cards';

export default React.createClass({
  propTypes: {
    cardName: React.PropTypes.string.isRequired,
    selected: React.PropTypes.string,
    onSelect: React.PropTypes.func.isRequired,
    onRemove: React.PropTypes.func.isRequired
  },

  handleSelect(cardName) {
    this.props.onSelect(cardName);
  },

  handleRemove(cardName) {
    this.props.onRemove(cardName);
  },
  
  render() {
    const cardName = this.props.cardName;
    const selectedCard = this.props.selected;
    const isSelected = cardName === selectedCard;

    if(cardName.startsWith('X')) {
      const className = `${isSelected ? 'Card-selected': 'Card'} card back`

      return <div className={className} onClick={this.handleSelect.bind(this, cardName)}></div>
    }
    else {
      const cardSuit = getCardSuit(cardName[1]);
      const cardSuitBadge = getCardSuitBadge(cardName[1]);
      const className = `${isSelected ? 'Card-selected' : 'Card-in'} card rank-${cardName[0].toLowerCase()} ${cardSuit}`

      return <div className={className} onClick={this.handleRemove.bind(this, cardName)}>
        <span className="rank">{cardName[0]}</span>
        <span className="suit">{cardSuitBadge}</span>
      </div>
    }
  }
});

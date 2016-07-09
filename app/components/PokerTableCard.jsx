import React from 'react';

export default React.createClass({
  propTypes: {
    cardName: React.PropTypes.string.isRequired,
    selected: React.PropTypes.string,
    onSelect: React.PropTypes.func.isRequired,
    removeCard: React.PropTypes.func.isRequired
  },

  handleClick(cardName) {
    cardName.startsWith('X') ? this.props.onSelect(cardName) : this.props.removeCard(cardName);
  },

  render() {
    const cardName = this.props.cardName;
    const selectedCard = this.props.selected;
    const isSelected = cardName === selectedCard;
    const className = isSelected ? 'Card-selected' : (cardName.startsWith('X') ? 'Card' : 'Card-in');
    const path = cardName.startsWith('X') ? 'img/cards/X.png' : `img/cards/${cardName}.png`;

    return <div className={className} onClick={this.handleClick.bind(this, cardName)}>
      <img src={path} />
    </div>
  }
});

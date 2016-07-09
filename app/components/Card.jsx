import React from 'react'

export default React.createClass({
  propTypes: {
    cardName: React.PropTypes.string.isRequired,
    selected: React.PropTypes.string.isRequired,
    isChosen: React.PropTypes.boolean,
    onSelect: React.PropTypes.func,
    addCard: React.PropTypes.func
  },

  handleClick(selectedCard, cardName) {
    cardName.startsWith('X') ? this.props.onSelect(cardName) : this.props.addCard(selectedCard, cardName);
  },

  render() {
    const cardName = this.props.cardName;
    const selectedCard = this.props.selected;
    const isChosen = this.props.isChosen;

    const path = cardName.startsWith('X') ? 'img/cards/X.png' : 'img/cards/' + cardName + '.png';
    const isSelected = cardName === selectedCard;
    const className = isChosen ? 'Card-chosen' : (isSelected ? 'Card-selected' : 'Card');

    return <div className={className} onClick={this.handleClick.bind(this, selectedCard, cardName)}>
      <img src={path} />
    </div>
  }
});

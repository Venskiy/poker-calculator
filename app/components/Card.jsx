import React from 'react';
import toastr from 'toastr';

export default React.createClass({
  propTypes: {
    cardName: React.PropTypes.string.isRequired,
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
    const className = this.props.isChosen ? 'Card-chosen' : 'Card';
    const path = `https://dreamerrr.me/media/poker/cards/${cardName}.png`;

    return <div className={className} onClick={this.handleClick.bind(this, cardName)}>
      <img src={path} />
    </div>
  }
});

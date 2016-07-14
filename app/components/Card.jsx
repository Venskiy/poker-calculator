import React from 'react'

export default React.createClass({
  propTypes: {
    cardName: React.PropTypes.string.isRequired,
    isChosen: React.PropTypes.bool.isRequired,
    onClickCard: React.PropTypes.func.isRequired
  },

  handleClick(cardName) {
    this.props.isChosen ? alert('This card is already chosen.') : this.props.onClickCard(cardName);
  },

  render() {
    const cardName = this.props.cardName;
    const className = this.props.isChosen ? 'Card-chosen' : 'Card';
    const path = `img/cards/${cardName}.png`;

    return <div className={className} onClick={this.handleClick.bind(this, cardName)}>
      <img src={path} />
    </div>
  }
});

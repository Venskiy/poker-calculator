import React from 'react'

export default React.createClass({
  propTypes: {
    cardName: React.PropTypes.string.isRequired,
    selected: React.PropTypes.string,
    onSelect: React.PropTypes.func.isRequired
  },

  handleSelect(cardName) {
    this.props.onSelect(cardName);
  },

  render() {
    const cardName = this.props.cardName;
    const path = 'img/cards/' + cardName + '.png';
    const isSelected = cardName === this.props.selected;
    const className = isSelected ? 'Card-selected' : 'Card';

    return <div className={className} onClick={this.handleSelect.bind(this, cardName)}>
      <img src={path} />
    </div>
  }
});

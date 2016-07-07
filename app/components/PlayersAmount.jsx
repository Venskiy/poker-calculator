import React from 'react';

const playersAmount = [2, 3, 4, 5, 6, 7, 8, 9];

export default React.createClass({
  propTypes: {
    onPlayersAmountChange: React.PropTypes.func.isRequired,
    playersAmount: React.PropTypes.number.isRequired
  },

  changePlayersAmount() {
    const value = this.refs.playersAmount.value;
    this.props.onPlayersAmountChange(value);
  },

  render() {
    return <select ref="playersAmount" value={this.props.playersAmount} onChange={this.changePlayersAmount}>
      {playersAmount.map(amount => <option key={amount} value={amount}>{amount}</option>)}
    </select>
  }
});

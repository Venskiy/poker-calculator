import React from 'react';

const playersAmount = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default React.createClass({
  propTypes: {
    playersAmount: React.PropTypes.number.isRequired,
    onChangePlayersAmount: React.PropTypes.func.isRequired
  },

  handleOnChange() {
    const value = this.refs.playersAmount.value;
    this.props.onChangePlayersAmount(value);
  },

  render() {
    return <select
             ref="playersAmount"
             value={this.props.playersAmount}
             onChange={this.handleOnChange}>
      {playersAmount.map(amount =>
        <option key={amount} value={amount}>{amount}</option>
      )}
    </select>
  }
});

import React from 'react';

export default React.createClass({
  propTypes: {
    playerId: React.PropTypes.number.isRequired,
    playerName: React.PropTypes.string.isRequired,
    onChangePlayerName: React.PropTypes.func.isRequired
  },

  handeOnChange(playerName) {
    const name = this.refs.playerName.value;
    this.props.onChangePlayerName(this.props.playerId, name);
  },

  render() {
    return <input ref="playerName" type="text" value={this.props.playerName} onChange={this.handeOnChange} />
  }
});

import React from 'react';
import toastr from 'toastr';

export default React.createClass({
  propTypes: {
    playerId: React.PropTypes.number.isRequired,
    playerName: React.PropTypes.string.isRequired,
    onChangePlayerName: React.PropTypes.func.isRequired
  },

  handeOnChange(playerName) {
    const name = this.refs.playerName.value;
    if(name.length < 12) {
      this.props.onChangePlayerName(this.props.playerId, name);
    }
    else {
      toastr.error("Player's name must be less than 12 characters");
    }
  },

  render() {
    return <div className="ChangeName">
      <p>Player #{this.props.playerId + 1}: </p>
      <input
        ref="playerName"
        type="text"
        value={this.props.playerName}
        onChange={this.handeOnChange} />
   </div>
  }
});

import React from 'react';
import {connect} from 'react-redux';
import {setPlayersAmount, reset, changePlayerName, addPokerStatistics} from 'actions/optionActions';
import toastr from 'toastr';

import PlayersAmount from 'components/PlayersAmount';
import PlayerName from 'components/PlayerName';

const Options = ({pokerStatistics, playersAmount, playerNames, onPlayersAmountChange, reset, onChangePlayerName, addStatistics}) => {
  const amount = parseInt(playersAmount, 10);

  return <div className="Options">
    <div className="PlayersAmount">
      <div className="SelectText">Select the amount of players:</div>
      <div className="CustomSelect">
        <PlayersAmount onPlayersAmountChange={onPlayersAmountChange} playersAmount={playersAmount} />
      </div>
    </div>
    <input className="CustomButton" type="button" value="Count statistcs" onClick={addStatistics} />
    <input className="CustomButton" type="button" value="Reset" onClick={reset} />
    <div className="ChangeNameArea">
      {[...Array(amount)].map((x, i) =>
        <PlayerName playerId={i} playerName={playerNames[i]} onChangePlayerName={onChangePlayerName} />
      )}
    </div>
  </div>;
};

const mapStateToProps = (state) => ({
  playersAmount: state.options.playersAmount,
  playerNames: state.options.playerNames,
  pokerStatistics: state.options.pokerStatistics
});

const mapDispatchToProps = (dispatch) => ({
  onPlayersAmountChange(playersAmount) {
    dispatch(setPlayersAmount(playersAmount));
  },

  reset() {
    dispatch(reset());
  },

  onChangePlayerName(playerId, playerName) {
    dispatch(changePlayerName(playerId, playerName));
  },

  addStatistics() {
    dispatch(addPokerStatistics());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Options);

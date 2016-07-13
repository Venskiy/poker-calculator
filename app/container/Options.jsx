import React from 'react';
import {connect} from 'react-redux';
import {setPlayersAmount, reset, changePlayerName, addPokerStatistics} from 'actions';

import PlayersAmount from 'components/PlayersAmount';
import PlayerName from 'components/PlayerName';

const Options = ({pokerStatistics, playersAmount, playerNames, onPlayersAmountChange, reset, onChangePlayerName, addStatistics}) => {
  const amount = parseInt(playersAmount, 10);

  return <div className="Options">
    <div className="PlayersAmount">
      Select the amount of players:
      <PlayersAmount onPlayersAmountChange={onPlayersAmountChange} playersAmount={playersAmount} />
      <input className="btn btn-primary" type="button" value="Count statistcs" onClick={addStatistics} />
      <input className="btn btn-primary" type="button" value="Reset" onClick={reset} />
      {[...Array(amount)].map((x, i) =>
        <PlayerName playerId={i} playerName={playerNames[i]} onChangePlayerName={onChangePlayerName} />
      )}
    </div>
  </div>;
};

const mapStateToProps = (state) => ({
  playersAmount: state.playersAmount,
  playerNames: state.playerNames,
  pokerStatistics: state.pokerStatistics
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

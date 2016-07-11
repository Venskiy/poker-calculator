import React from 'react';
import {connect} from 'react-redux';
import {setPlayersAmount, calculateStatistics, reset, changePlayerName} from 'actions';

import PlayersAmount from 'components/PlayersAmount';
import PlayerName from 'components/PlayerName';

const Options = ({playersAmount, playerNames, onPlayersAmountChange, calculateStatistics, reset, onChangePlayerName}) => {
  const amount = parseInt(playersAmount, 10);

  return <div className="Options">
    <div className="PlayersAmount">
      Select the amount of players:
      <PlayersAmount onPlayersAmountChange={onPlayersAmountChange} playersAmount={playersAmount} />
      <input className="btn btn-primary" type="button" value="Count statistcs" onClick={calculateStatistics} />
      <input className="btn btn-primary" type="button" value="Reset" onClick={reset} />
      {[...Array(amount)].map((x, i) =>
        <PlayerName playerId={i} playerName={playerNames[i]} onChangePlayerName={onChangePlayerName} />
      )}
    </div>
  </div>;
};

const mapStateToProps = (state) => ({
  playersAmount: state.playersAmount,
  playerNames: state.playerNames
});

const mapDispatchToProps = (dispatch) => ({
  onPlayersAmountChange(playersAmount) {
    dispatch(setPlayersAmount(playersAmount));
  },

  calculateStatistics() {
    fetch('https://dreamerrr.me/poker_calculator/count').then(response => {
      response.json().then(pokerStatistics => dispatch(calculateStatistics(pokerStatistics)));
    });
  },

  reset() {
    dispatch(reset());
  },

  onChangePlayerName(playerId, playerName) {
    dispatch(changePlayerName(playerId, playerName));

  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Options);

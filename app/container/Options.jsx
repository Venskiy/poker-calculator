import React from 'react';
import {connect} from 'react-redux';
import {setPlayersAmount, calculateStatistics, reset} from 'actions';

import PlayersAmount from 'components/PlayersAmount';

const Options = ({playersAmount, onPlayersAmountChange, calculateStatistics, reset}) => {
  return <div className="Options">
    <div className="PlayersAmount">
      Select the amount of players:
      <PlayersAmount onPlayersAmountChange={onPlayersAmountChange} playersAmount={playersAmount} />
      <input className="btn btn-primary" type="button" value="Count statistcs" onClick={calculateStatistics} />
      <input className="btn btn-primary" type="button" value="Reset" onClick={reset} />
    </div>
  </div>;
};

const mapStateToProps = (state) => ({
  playersAmount: state.playersAmount
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
    alert('pow');
    dispatch(reset());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Options);

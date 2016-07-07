import React from 'react';
import {connect} from 'react-redux';
import {setPlayersAmount} from 'actions';

import PlayersAmount from 'components/PlayersAmount';

const Options = ({playersAmount, onPlayersAmountChange}) => {
  return <div className="Options">
    <div className="PlayersAmount">
      <div>Select the amount of players: </div>
      <div>
        <PlayersAmount onPlayersAmountChange={onPlayersAmountChange} playersAmount={playersAmount} />
      </div>
    </div>
  </div>;
};

const mapStateToProps = (state) => ({
  playersAmount: state.playersAmount
});

const mapDispatchToProps = (dispatch) => ({
  onPlayersAmountChange(playersAmount) {
    dispatch(setPlayersAmount(playersAmount));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Options);

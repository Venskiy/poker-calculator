import React from 'react';
import {connect} from 'react-redux';

import Player from 'components/Player';
import Board from 'components/Board';

const PokerTable = ({playersAmount}) => {
  return <div className="PokerTable">
    <Player />
    <Board />
    <div>{playersAmount}</div>
  </div>;
}

const mapStateToProps = (state) => ({
  playersAmount: state.playersAmount
});

export default connect(mapStateToProps)(PokerTable);

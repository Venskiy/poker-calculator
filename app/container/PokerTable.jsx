import React from 'react';

import Player from 'components/Player';
import Board from 'components/Board';

export default () => {
  return <div className="PokerTable">
    <Player />
    <Board />
  </div>;
}

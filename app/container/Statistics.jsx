import React from 'react';
import {connect} from 'react-redux';

import Histogram from 'components/Histogram';
import Combinations from 'components/Combinations';

const Statistics = ({playersAmount, playerNames, histograms}) => {
  const amount = parseInt(playersAmount, 10);

  return <div className="Statistics">
    <Combinations />
    {[...Array(amount)].map((x, i) =>
      <Histogram playerName={playerNames[i]} histogram={histograms[i]} />
    )}
  </div>
};

const mapStateToProps = (state) => ({
  playersAmount: state.options.playersAmount,
  playerNames: state.options.playerNames,
  histograms: state.options.histograms
});

export default connect(mapStateToProps)(Statistics);

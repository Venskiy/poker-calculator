import React from 'react';
import {connect} from 'react-redux';

import Histogram from 'components/Histogram';
import Combinations from 'components/Combinations';

const Statistics = ({playersAmount, histograms}) => {
  const amount = parseInt(playersAmount, 10);

  return <div className="Statistics">
    <Combinations />
    {[...Array(amount)].map((x, i) =>
      <Histogram histogram={histograms[i]} />
    )}
  </div>
};

const mapStateToProps = (state) => ({
  playersAmount: state.playersAmount,
  histograms: state.histograms
});

export default connect(mapStateToProps)(Statistics);

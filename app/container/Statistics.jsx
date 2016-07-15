import React from 'react';
import {connect} from 'react-redux';

import Histogram from 'components/Histogram';
import Combinations from 'components/Combinations';
import Loader from 'components/Loader';

const Statistics = ({playersAmount, playerNames, histograms, isCounting}) => {
  if(isCounting) {
    return <div className="Statistics">
      <Loader />
    </div>
  }
  else {
    return <div className="Statistics">
      <Combinations />
      {[...Array(playersAmount)].map((x, i) =>
        <Histogram
          playerName={playerNames[i]}
          histogram={histograms[i]}
          key={`histogram-${i}`} />
      )}
    </div>
  }
};

const mapStateToProps = (state) => ({
  histograms: state.options.histograms
});

export default connect(mapStateToProps)(Statistics);

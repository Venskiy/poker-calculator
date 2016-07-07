import React from 'react';
import {connect} from 'react-redux';

import CardsBlock from './CardsBlock';
import PokerTable from './PokerTable';
import Options from './Options';

const App = React.createClass({
  render() {
    return (
      <div className="Container">
        <div className="CardsAndTable">
          <CardsBlock />
          <PokerTable />
        </div>
        <div className="OptionsAndStatistics">
          <Options />
        </div>
      </div>
    );
  }
});

const mapStateToProps = (state) => ({
  playersAmount: state.playersAmount
});

export default connect(mapStateToProps)(App);

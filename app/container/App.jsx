import React from 'react';
import {connect} from 'react-redux';

import CardsBlock from './CardsBlock';
import PokerTable from './PokerTable';
import Options from './Options';
import Statistics from './Statistics';

const App = React.createClass({
  render() {
    return (
      <div className="Container">
        <div className="CardsAndTable">
          <CardsBlock />
          <PokerTable playersAmount={this.props.playersAmount} playerNames={this.props.playerNames} />
        </div>
        <div className="OptionsAndStatistics">
          <Options />
          <Statistics playersAmount={this.props.playersAmount} playerNames={this.props.playerNames} />
        </div>
      </div>
    );
  }
});

const mapStateToProps = (state) => ({
  playersAmount: state.options.playersAmount,
  playerNames: state.options.playerNames
});

export default connect(mapStateToProps)(App);

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
          <CardsBlock selectedCard={this.props.selectedCard} />
          <PokerTable
            playersAmount={this.props.playersAmount}
            playerNames={this.props.playerNames}
            selectedCard={this.props.selectedCard} />
        </div>
        <div className="OptionsAndStatistics">
          <Options />
          <Statistics
            playersAmount={this.props.playersAmount}
            playerNames={this.props.playerNames} />
        </div>
      </div>
    );
  }
});

const mapStateToProps = (state) => ({
  playersAmount: state.options.playersAmount,
  playerNames: state.options.playerNames,
  selectedCard: state.cards.selectedCard
});

export default connect(mapStateToProps)(App);

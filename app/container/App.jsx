import React from 'react';
import {connect} from 'react-redux';
import {selectCard, addPokerTableCard, removeCardFromPokerTable} from 'actions/cardActions';

import CardsBlock from './CardsBlock';
import PokerTable from './PokerTable';
import Options from './Options';
import Statistics from './Statistics';

const App = React.createClass({
  render() {
    return (
      <div className="Container">
        <div className="CardsAndTable">
          <CardsBlock selectedCard={this.props.selectedCard} addPokerTableCard={this.props.addPokerTableCard} />
          <PokerTable selectedCard={this.props.selectedCard} onSelectCard={this.props.onSelectCard} removeCardFromPokerTable={this.props.removeCardFromPokerTable} />
        </div>
        <div className="OptionsAndStatistics">
          <Options />
          <Statistics />
        </div>
      </div>
    );
  }
});

const mapStateToProps = (state) => ({
  selectedCard: state.cards.selectedCard
});

const mapDispatchToProps = (dispatch) => ({
  onSelectCard(cardName) {
    dispatch(selectCard(cardName));
  },

  addPokerTableCard(cardName) {
    dispatch(addPokerTableCard(cardName));
  },

  removeCardFromPokerTable(cardName) {
    dispatch(removeCardFromPokerTable(cardName));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

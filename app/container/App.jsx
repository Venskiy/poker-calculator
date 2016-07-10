import React from 'react';
import {connect} from 'react-redux';
import {selectCard, addCardToPokerTable, removeCardFromPokerTable, calculateStatistics} from 'actions';

import CardsBlock from './CardsBlock';
import PokerTable from './PokerTable';
import Options from './Options';

const App = React.createClass({
  render() {
    console.log(this.props.pokerStatistics);

    return (
      <div className="Container">
        <div className="CardsAndTable">
          <CardsBlock selectedCard={this.props.selectedCard} addCardToPokerTable={this.props.addCardToPokerTable} />
          <PokerTable selectedCard={this.props.selectedCard} onSelectCard={this.props.onSelectCard} removeCardFromPokerTable={this.props.removeCardFromPokerTable} />
        </div>
        <div className="OptionsAndStatistics">
          <Options />
          <button onClick={this.props.calculateStatistics} />
        </div>
      </div>
    );
  }
});

const mapStateToProps = (state) => ({
  selectedCard: state.selectedCard,
  pokerStatistics: state.pokerStatistics
});

const mapDispatchToProps = (dispatch) => ({
  onSelectCard(cardName) {
    dispatch(selectCard(cardName));
  },

  addCardToPokerTable(cardName, selectedCard) {
    dispatch(addCardToPokerTable(cardName));
  },

  removeCardFromPokerTable(cardName) {
    dispatch(removeCardFromPokerTable(cardName));
  },

  calculateStatistics() {
    fetch('https://dreamerrr.me/poker_calculator/count').then(response => {
      response.json().then(pokerStatistics => dispatch(calculateStatistics(pokerStatistics)));
    });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

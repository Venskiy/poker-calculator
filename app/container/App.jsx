import React from 'react';
import {connect} from 'react-redux';
import {selectCard, addCardToPokerTable} from 'actions';

import CardsBlock from './CardsBlock';
import PokerTable from './PokerTable';
import Options from './Options';

const App = React.createClass({
  render() {
    return (
      <div className="Container">
        <div className="CardsAndTable">
          <CardsBlock selected={this.props.selectedCard} addCardToPokerTable={this.props.addCardToPokerTable} />
          <PokerTable selectedCard={this.props.selectedCard} onSelectCard={this.props.onSelectCard} />
        </div>
        <div className="OptionsAndStatistics">
          <Options />
        </div>
      </div>
    );
  }
});

const mapStateToProps = (state) => ({
  selectedCard: state.selectedCard,
});

const mapDispatchToProps = (dispatch) => ({
  addCardToPokerTable(selectedCard, cardName) {
    dispatch(addCardToPokerTable(selectedCard, cardName));
  },

  onSelectCard(cardName) {
    dispatch(selectCard(cardName));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

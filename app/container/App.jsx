import React from 'react';
import {connect} from 'react-redux';
import {selectCard} from 'actions';

import CardsBlock from './CardsBlock';
import PokerTable from './PokerTable';
import Options from './Options';

const App = React.createClass({
  render() {
    return (
      <div className="Container">
        <div className="CardsAndTable">
          <CardsBlock selectedCard={this.props.selectedCard} onSelectCard={this.props.onSelectCard} />
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
  selectedCard: state.selectedCard
});

const mapDispatchToProps = (dispatch) => ({
  onSelectCard(cardName) {
    dispatch(selectCard(cardName));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

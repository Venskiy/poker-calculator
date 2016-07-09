import React from 'react';
import {connect} from 'react-redux';

import Player from 'components/Player';
import Board from 'components/Board';

const PokerTable = ({playersAmount, pokerTableCards, selectedCard, onSelectCard, removeCardFromPokerTable}) => {
  const amount = parseInt(playersAmount, 10);

  return <div className="PokerTable">
    {[...Array(amount)].map((x, i) =>
      <Player number={i + 1} pokerTableCards={pokerTableCards} selectedCard={selectedCard} onSelectCard={onSelectCard} removeCard={removeCardFromPokerTable} />
    )}
    <Board pokerTableCards={pokerTableCards} selectedCard={selectedCard} onSelectCard={onSelectCard} removeCard={removeCardFromPokerTable} />
  </div>;
};

const mapStateToProps = (state) => ({
  playersAmount: state.playersAmount,
  pokerTableCards: state.pokerTableCards
});

export default connect(mapStateToProps)(PokerTable);

import React from 'react';
import {connect} from 'react-redux';

import Player from 'components/Player';
import Board from 'components/Board';

const PokerTable = ({playersAmount, playerNames, pokerTableCards, selectedCard, winningChances, onSelectCard, removeCardFromPokerTable}) => {
  const amount = parseInt(playersAmount, 10);

  return <div className="PokerTable">
    {[...Array(amount)].map((x, i) =>
      <Player number={i + 1} playerName={playerNames[i]} pokerTableCards={pokerTableCards} selectedCard={selectedCard} winningChances={winningChances[i + 1]} onSelectCard={onSelectCard} removeCard={removeCardFromPokerTable} />
    )}
    <Board pokerTableCards={pokerTableCards} selectedCard={selectedCard} onSelectCard={onSelectCard} removeCard={removeCardFromPokerTable} />
  </div>;
};

const mapStateToProps = (state) => ({
  playersAmount: state.options.playersAmount,
  playerNames: state.options.playerNames,
  pokerTableCards: state.cards.pokerTableCards,
  winningChances: state.options.winningChances
});

export default connect(mapStateToProps)(PokerTable);

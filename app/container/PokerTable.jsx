import React from 'react';
import {connect} from 'react-redux';

import Player from 'components/Player';
import Board from 'components/Board';

const PokerTable = ({playersAmount, playerNames, playerCards, boardCards, selectedCard, winningChances, onSelectCard, removePlayerCard, removeBoardCard}) => {
  const amount = parseInt(playersAmount, 10);

  return <div className="PokerTable">
    {[...Array(amount)].map((x, i) =>
      <Player number={i + 1} playerName={playerNames[i]} cards={playerCards} selectedCard={selectedCard} winningChances={winningChances[i + 1]} onSelectCard={onSelectCard} removeCard={removePlayerCard} />
    )}
    <Board cards={boardCards} selectedCard={selectedCard} onSelectCard={onSelectCard} removeCard={removeBoardCard} />
  </div>;
};

const mapStateToProps = (state) => ({
  playersAmount: state.options.playersAmount,
  playerNames: state.options.playerNames,
  playerCards: state.cards.playerCards,
  boardCards: state.cards.boardCards,
  winningChances: state.options.winningChances
});

export default connect(mapStateToProps)(PokerTable);

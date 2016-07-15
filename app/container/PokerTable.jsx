import React from 'react';
import {connect} from 'react-redux';
import {selectCard, removePlayerCard, removeBoardCard, removeChosenCard} from 'actions/cardActions';

import Player from 'components/Player';
import Board from 'components/Board';

const PokerTable = ({playersAmount, playerNames, playerCards, boardCards,
                    selectedCard, winningChances, onSelectCard, removePlayerCard,
                    removeBoardCard}) => {
  const amount = parseInt(playersAmount, 10);

  return <div className="PokerTable">
    {[...Array(amount)].map((x, i) =>
      <Player
        number={i + 1}
        playerName={playerNames[i]}
        cards={playerCards}
        selectedCard={selectedCard}
        winningChances={winningChances[i + 1]}
        onSelectCard={onSelectCard}
        onRemoveCard={removePlayerCard} />
    )}
    <Board
      cards={boardCards}
      selectedCard={selectedCard}
      onSelectCard={onSelectCard}
      onRemoveCard={removeBoardCard} />
  </div>;
};

const mapStateToProps = (state) => ({
  playerCards: state.cards.playerCards,
  boardCards: state.cards.boardCards,
  winningChances: state.options.winningChances
});

const mapDispatchToProps = (dispatch) => ({
  onSelectCard(cardName) {
    dispatch(selectCard(cardName));
  },

  removePlayerCard(cardName) {
    dispatch(removePlayerCard(cardName));
    dispatch(removeChosenCard(cardName));
  },

  removeBoardCard(cardName) {
    dispatch(removeBoardCard(cardName));
    dispatch(removeChosenCard(cardName));
  },

  removeCardFromPokerTable(cardName) {
    dispatch(removeCardFromPokerTable(cardName));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PokerTable);

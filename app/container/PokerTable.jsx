import React from 'react';
import {connect} from 'react-redux';
import {selectCard, removePlayerCard, removeBoardCard, removeChosenCard} from 'actions/cardActions';
import {addPokerStatistics} from 'actions/optionActions';

import Player from 'components/Player';
import Board from 'components/Board';
import SplitPotBox from 'components/SplitPotBox';

const PokerTable = ({playersAmount, playerNames, playerCards, boardCards,
                    selectedCard, winningChances, onSelectCard, removePlayerCard,
                    removeBoardCard}) => {
  return <div className="PokerTable playingCards fourColours inText">
    <SplitPotBox splitPotChance={winningChances[0]} />
    <Board
      cards={boardCards}
      selectedCard={selectedCard}
      onSelectCard={onSelectCard}
      onRemoveCard={removeBoardCard} />
    {[...Array(playersAmount)].map((x, i) =>
      <Player
        number={i + 1}
        playerName={playerNames[i]}
        cards={playerCards}
        selectedCard={selectedCard}
        winningChances={winningChances[i + 1]}
        onSelectCard={onSelectCard}
        onRemoveCard={removePlayerCard}
        key={i} />
    )}
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
    dispatch(addPokerStatistics(true));
  },

  removeBoardCard(cardName) {
    dispatch(removeBoardCard(cardName));
    dispatch(removeChosenCard(cardName));
    dispatch(addPokerStatistics(true));
  },

  removeCardFromPokerTable(cardName) {
    dispatch(removeCardFromPokerTable(cardName));
    dispatch(addPokerStatistics(true));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PokerTable);

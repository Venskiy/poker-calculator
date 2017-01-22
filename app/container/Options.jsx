import React from 'react';
import {connect} from 'react-redux';
import {setPlayersAmount, addPokerStatistics, resetOptions, changePlayerName} from 'actions/optionActions';
import {changeSelectedCard, setPlayerCards, resetCards} from 'actions/cardActions';

import PlayersAmount from 'components/PlayersAmount';
import PlayerName from 'components/PlayerName';

const Options = ({playersAmount, playersNames, changePlayersAmount, addPokerStatistics, reset, changePlayerName}) => {
  return <div className="Options">
    <div className="PlayersAmount">
      <div className="SelectText">Amount of players:</div>
      <div className="CustomSelect">
        <PlayersAmount
          playersAmount={playersAmount}
          onChangePlayersAmount={changePlayersAmount} />
      </div>
    </div>
    <input
      className="CustomButton"
      type="button"
      value="Count statistcs"
      onClick={addPokerStatistics} />
    <input
      className="CustomButton"
      type="button"
      value="Reset"
      onClick={reset} />
    <div className="ChangeNameArea">
      {[...Array(playersAmount)].map((x, i) =>
          <PlayerName
            playerId={i}
            playerName={playersNames[i]}
            onChangePlayerName={changePlayerName}
            key={i} />
      )}
    </div>
  </div>;
};

const mapStateToProps = (state) => ({
  playersAmount: state.options.playersAmount,
  playersNames: state.options.playerNames
});

const mapDispatchToProps = (dispatch) => ({
  changePlayersAmount(playersAmount) {
    dispatch(setPlayersAmount(playersAmount));
    dispatch(setPlayerCards(playersAmount));
    dispatch(changeSelectedCard());
    dispatch(addPokerStatistics(true));
  },

  addPokerStatistics() {
    dispatch(addPokerStatistics(false));
  },

  reset() {
    dispatch(resetOptions());
    dispatch(resetCards());
  },

  changePlayerName(playerId, playerName) {
    dispatch(changePlayerName(playerId, playerName));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Options);

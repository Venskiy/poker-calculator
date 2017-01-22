(function() {
  'use strict';

  var globals = typeof window === 'undefined' ? global : window;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = ({}).hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = null;
    hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var process;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("actions/actionTypes.js", function(exports, require, module) {
"use strict";

});

require.register("actions/cardActions.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changeSelectedCard = exports.resetCards = exports.setPlayerCards = exports.removeChosenCard = exports.addChosenCard = exports.removeBoardCard = exports.removePlayerCard = exports.addPokerTableCard = exports.selectCard = undefined;

var _changeSelection = require('utils/changeSelection');

var selectCard = exports.selectCard = function selectCard(cardName) {
  return {
    type: 'SELECT_CARD',
    cardName: cardName
  };
};

var addPokerTableCard = exports.addPokerTableCard = function addPokerTableCard(cardName) {
  return {
    type: 'ADD_POKER_TABLE_CARD',
    cardName: cardName
  };
};

var removePlayerCard = exports.removePlayerCard = function removePlayerCard(cardName) {
  return {
    type: 'REMOVE_PLAYER_CARD',
    cardName: cardName
  };
};

var removeBoardCard = exports.removeBoardCard = function removeBoardCard(cardName) {
  return {
    type: 'REMOVE_BOARD_CARD',
    cardName: cardName
  };
};

var addChosenCard = exports.addChosenCard = function addChosenCard(cardName) {
  return {
    type: 'ADD_CHOSEN_CARD',
    cardName: cardName
  };
};

var removeChosenCard = exports.removeChosenCard = function removeChosenCard(cardName) {
  return {
    type: 'REMOVE_CHOSEN_CARD',
    cardName: cardName
  };
};

var setPlayerCards = exports.setPlayerCards = function setPlayerCards(playersAmount) {
  return {
    type: 'SET_PLAYER_CARDS',
    playersAmount: playersAmount
  };
};

var resetCards = exports.resetCards = function resetCards() {
  return {
    type: 'RESET_CARDS'
  };
};

var changeSelectedCard = exports.changeSelectedCard = function changeSelectedCard() {
  return function (dispatch, getState) {
    (0, _changeSelection.changeSelection)(getState().options.playersAmount, getState().cards.selectedCard, getState().cards.playerCards, getState().cards.boardCards).then(function (cardName) {
      dispatch({ type: 'SELECT_CARD', cardName: cardName });
    });
  };
};

});

require.register("actions/optionActions.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addPokerStatistics = exports.completeCounting = exports.beginCounting = exports.changePlayerName = exports.resetOptions = exports.setPlayersAmount = undefined;

var _toastr = require('toastr');

var _toastr2 = _interopRequireDefault(_toastr);

var _calculatePokerStatistics = require('utils/calculatePokerStatistics');

var _utils = require('utils/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var setPlayersAmount = exports.setPlayersAmount = function setPlayersAmount(playersAmount) {
  return {
    type: 'SET_PLAYERS_AMOUNT',
    playersAmount: playersAmount
  };
};

var resetOptions = exports.resetOptions = function resetOptions() {
  return {
    type: 'RESET_OPTIONS'
  };
};

var changePlayerName = exports.changePlayerName = function changePlayerName(playerId, playerName) {
  return {
    type: 'CHANGE_PLAYER_NAME',
    playerId: playerId,
    playerName: playerName
  };
};

var beginCounting = exports.beginCounting = function beginCounting() {
  return {
    type: 'BEGIN_COUNTING'
  };
};

var completeCounting = exports.completeCounting = function completeCounting() {
  return {
    type: 'COMPLETE_COUNTING'
  };
};

var addPokerStatistics = exports.addPokerStatistics = function addPokerStatistics(isAutomatically) {
  return function (dispatch, getState) {
    if ((0, _utils.isPlayerCardsFilled)(getState().options.playersAmount, getState().cards.playerCards)) {
      var amount = (0, _utils.getBoardCardsAmount)(getState().cards.boardCards);
      if (amount === 1 || amount === 2) {
        if (!isAutomatically) {
          _toastr2.default.error('Board must contain 0, 3, 4, or 5 cards.');
        }
      } else {
        dispatch(beginCounting());
        (0, _calculatePokerStatistics.calculatePokerStatistics)(getState().options.playersAmount, getState().cards.playerCards, getState().cards.boardCards).then(function (pokerStatistics) {
          dispatch({ type: 'ADD_POKER_STATISTICS', pokerStatistics: pokerStatistics });
          dispatch(completeCounting());
        });
      }
    } else {
      if (!isAutomatically) {
        _toastr2.default.error("All player's positions must be filled.");
      }
    }
  };
};

});

require.register("components/Board.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PokerTableCard = require('./PokerTableCard');

var _PokerTableCard2 = _interopRequireDefault(_PokerTableCard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.default = function (_ref) {
  var cards = _ref.cards,
      selectedCard = _ref.selectedCard,
      onSelectCard = _ref.onSelectCard,
      onRemoveCard = _ref.onRemoveCard;

  return _react2.default.createElement(
    'div',
    { className: 'Board' },
    [].concat(_toConsumableArray(Array(5))).map(function (x, i) {
      return _react2.default.createElement(_PokerTableCard2.default, {
        cardName: cards['XB' + (i + 1)],
        selected: selectedCard,
        onSelect: onSelectCard,
        onRemove: onRemoveCard,
        key: cards['XB' + (i + 1)] });
    })
  );
};

});

require.register("components/Card.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _toastr = require('toastr');

var _toastr2 = _interopRequireDefault(_toastr);

var _cards = require('utils/cards');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createClass({
  displayName: 'Card',

  propTypes: {
    cardName: _react2.default.PropTypes.string.isRequired,
    cardSuit: _react2.default.PropTypes.string.isRequired,
    cardValue: _react2.default.PropTypes.string.isRequired,
    isChosen: _react2.default.PropTypes.bool.isRequired,
    selectedCard: _react2.default.PropTypes.string.isRequired,
    onClickCard: _react2.default.PropTypes.func.isRequired
  },

  handleClick: function handleClick(cardName) {
    if (this.props.selectedCard.startsWith('X')) {
      if (this.props.isChosen) {
        _toastr2.default.error('This card is already chosen.');
      } else {
        this.props.onClickCard(cardName);
      }
    } else {
      _toastr2.default.error('All positions are filled.');
    }
  },
  render: function render() {
    var cardName = this.props.cardName;
    var cardSuit = (0, _cards.getCardSuit)(this.props.cardSuit);
    var cardSuitBadge = (0, _cards.getCardSuitBadge)(this.props.cardSuit);
    var className = 'card rank-' + this.props.cardValue.toLowerCase() + ' ' + cardSuit + ' ' + (this.props.isChosen ? 'Card-chosen' : 'Card');

    return _react2.default.createElement(
      'div',
      { className: className, onClick: this.handleClick.bind(this, cardName) },
      _react2.default.createElement(
        'span',
        { className: 'rank' },
        this.props.cardValue
      ),
      _react2.default.createElement(
        'span',
        { className: 'suit' },
        cardSuitBadge
      )
    );
  }
});

});

require.register("components/Footer.jsx", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  return _react2.default.createElement(
    "div",
    { className: "Footer" },
    _react2.default.createElement(
      "div",
      null,
      "Made by ",
      _react2.default.createElement(
        "a",
        { href: "https://github.com/Venskiy", target: "_blank" },
        "Venskiy Ilya"
      )
    )
  );
};

});

require.register("components/Loader.jsx", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  return _react2.default.createElement("div", { className: "Loader" });
};

});

require.register("components/Player.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PokerTableCard = require('./PokerTableCard');

var _PokerTableCard2 = _interopRequireDefault(_PokerTableCard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var number = _ref.number,
      playerName = _ref.playerName,
      cards = _ref.cards,
      selectedCard = _ref.selectedCard,
      winningChances = _ref.winningChances,
      onSelectCard = _ref.onSelectCard,
      onRemoveCard = _ref.onRemoveCard;

  var className = 'Player-' + number;
  var cardNameFirst = cards['XF' + number];
  var cardNameSecond = cards['XS' + number];

  return _react2.default.createElement(
    'div',
    { className: className },
    _react2.default.createElement(
      'div',
      { className: 'Hand' },
      _react2.default.createElement(_PokerTableCard2.default, {
        cardName: cardNameFirst,
        selected: selectedCard,
        onSelect: onSelectCard,
        onRemove: onRemoveCard }),
      _react2.default.createElement(_PokerTableCard2.default, {
        cardName: cardNameSecond,
        selected: selectedCard,
        onSelect: onSelectCard,
        onRemove: onRemoveCard })
    ),
    _react2.default.createElement(
      'div',
      { className: 'PlayerName' },
      playerName
    ),
    _react2.default.createElement(
      'div',
      { className: 'WinningChances' },
      winningChances === undefined ? '' : winningChances + '%'
    )
  );
};

});

require.register("components/PlayerName.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _toastr = require('toastr');

var _toastr2 = _interopRequireDefault(_toastr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createClass({
  displayName: 'PlayerName',

  propTypes: {
    playerId: _react2.default.PropTypes.number.isRequired,
    playerName: _react2.default.PropTypes.string.isRequired,
    onChangePlayerName: _react2.default.PropTypes.func.isRequired
  },

  handeOnChange: function handeOnChange(playerName) {
    var name = this.refs.playerName.value;
    if (name.length < 10) {
      this.props.onChangePlayerName(this.props.playerId, name);
    } else {
      _toastr2.default.error("Player's name must be less than 10 characters");
    }
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'ChangeName' },
      _react2.default.createElement(
        'p',
        null,
        'Player #',
        this.props.playerId + 1,
        ': '
      ),
      _react2.default.createElement('input', {
        ref: 'playerName',
        type: 'text',
        value: this.props.playerName,
        onChange: this.handeOnChange })
    );
  }
});

});

require.register("components/PlayersAmount.jsx", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var playersAmount = [1, 2, 3, 4, 5, 6, 7, 8, 9];

exports.default = _react2.default.createClass({
  displayName: "PlayersAmount",

  propTypes: {
    playersAmount: _react2.default.PropTypes.number.isRequired,
    onChangePlayersAmount: _react2.default.PropTypes.func.isRequired
  },

  handleOnChange: function handleOnChange() {
    var value = this.refs.playersAmount.value;
    this.props.onChangePlayersAmount(value);
  },
  render: function render() {
    return _react2.default.createElement(
      "select",
      {
        ref: "playersAmount",
        value: this.props.playersAmount,
        onChange: this.handleOnChange },
      playersAmount.map(function (amount) {
        return _react2.default.createElement(
          "option",
          { key: amount, value: amount },
          amount
        );
      })
    );
  }
});

});

require.register("components/PokerTableCard.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _cards = require('utils/cards');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createClass({
  displayName: 'PokerTableCard',

  propTypes: {
    cardName: _react2.default.PropTypes.string.isRequired,
    selected: _react2.default.PropTypes.string,
    onSelect: _react2.default.PropTypes.func.isRequired,
    onRemove: _react2.default.PropTypes.func.isRequired
  },

  handleSelect: function handleSelect(cardName) {
    this.props.onSelect(cardName);
  },
  handleRemove: function handleRemove(cardName) {
    this.props.onRemove(cardName);
  },
  render: function render() {
    var cardName = this.props.cardName;
    var selectedCard = this.props.selected;
    var isSelected = cardName === selectedCard;

    if (cardName.startsWith('X')) {
      var className = (isSelected ? 'Card-selected' : 'Card') + ' card back';

      return _react2.default.createElement('div', { className: className, onClick: this.handleSelect.bind(this, cardName) });
    } else {
      var cardSuit = (0, _cards.getCardSuit)(cardName[1]);
      var cardSuitBadge = (0, _cards.getCardSuitBadge)(cardName[1]);
      var _className = (isSelected ? 'Card-selected' : 'Card-in') + ' card rank-' + cardName[0].toLowerCase() + ' ' + cardSuit;

      return _react2.default.createElement(
        'div',
        { className: _className, onClick: this.handleRemove.bind(this, cardName) },
        _react2.default.createElement(
          'span',
          { className: 'rank' },
          cardName[0]
        ),
        _react2.default.createElement(
          'span',
          { className: 'suit' },
          cardSuitBadge
        )
      );
    }
  }
});

});

require.register("components/SplitPotBox.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var splitPotChance = _ref.splitPotChance;

  return _react2.default.createElement(
    'div',
    { className: 'SplitPotBox' },
    'Split decision: ',
    splitPotChance ? splitPotChance + '%' : '-'
  );
};

});

require.register("container/App.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _CardsBlock = require('./CardsBlock');

var _CardsBlock2 = _interopRequireDefault(_CardsBlock);

var _PokerTable = require('./PokerTable');

var _PokerTable2 = _interopRequireDefault(_PokerTable);

var _Options = require('./Options');

var _Options2 = _interopRequireDefault(_Options);

var _Statistics = require('./Statistics');

var _Statistics2 = _interopRequireDefault(_Statistics);

var _Footer = require('components/Footer');

var _Footer2 = _interopRequireDefault(_Footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = _react2.default.createClass({
  displayName: 'App',
  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'Container' },
      _react2.default.createElement(
        'div',
        { className: 'CardsAndTable' },
        _react2.default.createElement(_CardsBlock2.default, { selectedCard: this.props.selectedCard }),
        _react2.default.createElement(_PokerTable2.default, {
          playersAmount: this.props.playersAmount,
          playerNames: this.props.playerNames,
          selectedCard: this.props.selectedCard })
      ),
      _react2.default.createElement(
        'div',
        { className: 'OptionsAndStatistics' },
        _react2.default.createElement(_Statistics2.default, {
          playersAmount: this.props.playersAmount,
          playerNames: this.props.playerNames,
          isCounting: this.props.isCounting }),
        _react2.default.createElement(_Options2.default, null)
      ),
      _react2.default.createElement(_Footer2.default, null)
    );
  }
});

var mapStateToProps = function mapStateToProps(state) {
  return {
    playersAmount: state.options.playersAmount,
    playerNames: state.options.playerNames,
    selectedCard: state.cards.selectedCard,
    isCounting: state.options.isCounting
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(App);

});

require.register("container/CardsBlock.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _cardActions = require('actions/cardActions');

var _optionActions = require('actions/optionActions');

var _Card = require('components/Card');

var _Card2 = _interopRequireDefault(_Card);

var _cards = require('utils/cards');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CardsBlock = function CardsBlock(_ref) {
  var chosenCards = _ref.chosenCards,
      selectedCard = _ref.selectedCard,
      addPokerTableCard = _ref.addPokerTableCard;

  return _react2.default.createElement(
    'div',
    { className: 'CardsBlock playingCards fourColours inText' },
    _cards.suits.map(function (suit) {
      return _react2.default.createElement(
        'div',
        { className: 'CardsBlock-suit', key: suit },
        _cards.values.map(function (value) {
          var cardName = value + suit;
          var isChosen = chosenCards.findIndex(function (card) {
            return card === cardName;
          }) > -1;
          return _react2.default.createElement(_Card2.default, {
            cardName: cardName,
            cardSuit: suit,
            cardValue: value,
            isChosen: isChosen,
            selectedCard: selectedCard,
            onClickCard: addPokerTableCard,
            key: cardName });
        })
      );
    })
  );
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    chosenCards: state.cards.chosenCards
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    addPokerTableCard: function addPokerTableCard(cardName) {
      dispatch((0, _cardActions.addPokerTableCard)(cardName));
      dispatch((0, _cardActions.addChosenCard)(cardName));
      dispatch((0, _cardActions.changeSelectedCard)());
      dispatch((0, _optionActions.addPokerStatistics)(true));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(CardsBlock);

});

require.register("container/Options.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _optionActions = require('actions/optionActions');

var _cardActions = require('actions/cardActions');

var _PlayersAmount = require('components/PlayersAmount');

var _PlayersAmount2 = _interopRequireDefault(_PlayersAmount);

var _PlayerName = require('components/PlayerName');

var _PlayerName2 = _interopRequireDefault(_PlayerName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var Options = function Options(_ref) {
  var playersAmount = _ref.playersAmount,
      playersNames = _ref.playersNames,
      changePlayersAmount = _ref.changePlayersAmount,
      addPokerStatistics = _ref.addPokerStatistics,
      reset = _ref.reset,
      changePlayerName = _ref.changePlayerName;

  return _react2.default.createElement(
    'div',
    { className: 'Options' },
    _react2.default.createElement(
      'div',
      { className: 'PlayersAmount' },
      _react2.default.createElement(
        'div',
        { className: 'SelectText' },
        'Select the amount of players:'
      ),
      _react2.default.createElement(
        'div',
        { className: 'CustomSelect' },
        _react2.default.createElement(_PlayersAmount2.default, {
          playersAmount: playersAmount,
          onChangePlayersAmount: changePlayersAmount })
      )
    ),
    _react2.default.createElement('input', {
      className: 'CustomButton',
      type: 'button',
      value: 'Count statistcs',
      onClick: addPokerStatistics }),
    _react2.default.createElement('input', {
      className: 'CustomButton',
      type: 'button',
      value: 'Reset',
      onClick: reset }),
    _react2.default.createElement(
      'div',
      { className: 'ChangeNameArea' },
      [].concat(_toConsumableArray(Array(playersAmount))).map(function (x, i) {
        return _react2.default.createElement(_PlayerName2.default, {
          playerId: i,
          playerName: playersNames[i],
          onChangePlayerName: changePlayerName,
          key: i });
      })
    )
  );
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    playersAmount: state.options.playersAmount,
    playersNames: state.options.playerNames
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    changePlayersAmount: function changePlayersAmount(playersAmount) {
      dispatch((0, _optionActions.setPlayersAmount)(playersAmount));
      dispatch((0, _cardActions.setPlayerCards)(playersAmount));
      dispatch((0, _cardActions.changeSelectedCard)());
      dispatch((0, _optionActions.addPokerStatistics)(true));
    },
    addPokerStatistics: function addPokerStatistics() {
      dispatch((0, _optionActions.addPokerStatistics)(false));
    },
    reset: function reset() {
      dispatch((0, _optionActions.resetOptions)());
      dispatch((0, _cardActions.resetCards)());
    },
    changePlayerName: function changePlayerName(playerId, playerName) {
      dispatch((0, _optionActions.changePlayerName)(playerId, playerName));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Options);

});

require.register("container/PokerTable.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _cardActions = require('actions/cardActions');

var _optionActions = require('actions/optionActions');

var _Player = require('components/Player');

var _Player2 = _interopRequireDefault(_Player);

var _Board = require('components/Board');

var _Board2 = _interopRequireDefault(_Board);

var _SplitPotBox = require('components/SplitPotBox');

var _SplitPotBox2 = _interopRequireDefault(_SplitPotBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var PokerTable = function PokerTable(_ref) {
  var playersAmount = _ref.playersAmount,
      playerNames = _ref.playerNames,
      playerCards = _ref.playerCards,
      boardCards = _ref.boardCards,
      selectedCard = _ref.selectedCard,
      winningChances = _ref.winningChances,
      onSelectCard = _ref.onSelectCard,
      removePlayerCard = _ref.removePlayerCard,
      removeBoardCard = _ref.removeBoardCard;

  return _react2.default.createElement(
    'div',
    { className: 'PokerTable playingCards fourColours inText' },
    _react2.default.createElement(_SplitPotBox2.default, { splitPotChance: winningChances[0] }),
    _react2.default.createElement(_Board2.default, {
      cards: boardCards,
      selectedCard: selectedCard,
      onSelectCard: onSelectCard,
      onRemoveCard: removeBoardCard }),
    [].concat(_toConsumableArray(Array(playersAmount))).map(function (x, i) {
      return _react2.default.createElement(_Player2.default, {
        number: i + 1,
        playerName: playerNames[i],
        cards: playerCards,
        selectedCard: selectedCard,
        winningChances: winningChances[i + 1],
        onSelectCard: onSelectCard,
        onRemoveCard: removePlayerCard,
        key: i });
    })
  );
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    playerCards: state.cards.playerCards,
    boardCards: state.cards.boardCards,
    winningChances: state.options.winningChances
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onSelectCard: function onSelectCard(cardName) {
      dispatch((0, _cardActions.selectCard)(cardName));
    },
    removePlayerCard: function removePlayerCard(cardName) {
      dispatch((0, _cardActions.removePlayerCard)(cardName));
      dispatch((0, _cardActions.removeChosenCard)(cardName));
      dispatch((0, _optionActions.addPokerStatistics)(true));
    },
    removeBoardCard: function removeBoardCard(cardName) {
      dispatch((0, _cardActions.removeBoardCard)(cardName));
      dispatch((0, _cardActions.removeChosenCard)(cardName));
      dispatch((0, _optionActions.addPokerStatistics)(true));
    },
    removeCardFromPokerTable: function (_removeCardFromPokerTable) {
      function removeCardFromPokerTable(_x) {
        return _removeCardFromPokerTable.apply(this, arguments);
      }

      removeCardFromPokerTable.toString = function () {
        return _removeCardFromPokerTable.toString();
      };

      return removeCardFromPokerTable;
    }(function (cardName) {
      dispatch(removeCardFromPokerTable(cardName));
      dispatch((0, _optionActions.addPokerStatistics)(true));
    })
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(PokerTable);

});

require.register("container/Statistics.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactabular = require('reactabular');

var _Loader = require('components/Loader');

var _Loader2 = _interopRequireDefault(_Loader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Statistics = function Statistics(_ref) {
  var playersAmount = _ref.playersAmount,
      playerNames = _ref.playerNames,
      histograms = _ref.histograms,
      isCounting = _ref.isCounting;

  var rows = [];
  for (var i = 0; i < playersAmount; ++i) {
    if (histograms[i]) {
      rows.push({
        id: 'histogram-' + (i + 1),
        username: playerNames[i],
        highCard: histograms[i][0] + '%',
        pair: histograms[i][1] + '%',
        twoPairs: histograms[i][2] + '%',
        threeOfAKind: histograms[i][3] + '%',
        straight: histograms[i][4] + '%',
        flush: histograms[i][5] + '%',
        fullHouse: histograms[i][6] + '%',
        fourOfAKind: histograms[i][7] + '%',
        straightFlush: histograms[i][8] + '%',
        royalFlush: histograms[i][9] + '%'
      });
    } else {
      rows.push({
        id: 'histogram-' + (i + 1),
        username: playerNames[i],
        highCard: '-',
        pair: '-',
        twoPairs: '-',
        threeOfAKind: '-',
        straight: '-',
        flush: '-',
        fullHouse: '-',
        fourOfAKind: '-',
        straightFlush: '-',
        royalFlush: '-'
      });
    }
  }

  var columns = [{
    property: 'username',
    header: {
      label: 'Username'
    }
  }, {
    property: 'highCard',
    header: {
      label: 'High Card'
    }
  }, {
    property: 'pair',
    header: {
      label: 'Pair'
    }
  }, {
    property: 'twoPairs',
    header: {
      label: 'Two Pairs'
    }
  }, {
    property: 'threeOfAKind',
    header: {
      label: 'Three of a Kind'
    }
  }, {
    property: 'straight',
    header: {
      label: 'Straight'
    }
  }, {
    property: 'flush',
    header: {
      label: 'Flush'
    }
  }, {
    property: 'fullHouse',
    header: {
      label: 'Full House'
    }
  }, {
    property: 'fourOfAKind',
    header: {
      label: 'Four of a Kind'
    }
  }, {
    property: 'straightFlush',
    header: {
      label: 'Straight Flush'
    }
  }, {
    property: 'royalFlush',
    header: {
      label: 'Royal Flush'
    }
  }];

  if (isCounting) {
    return _react2.default.createElement(
      'div',
      { className: 'Statistics' },
      _react2.default.createElement(_Loader2.default, null)
    );
  } else {
    return _react2.default.createElement(
      'div',
      { className: 'Statistics' },
      _react2.default.createElement(
        _reactabular.Table.Provider,
        { className: 'pure-table pure-table-striped', columns: columns },
        _react2.default.createElement(_reactabular.Table.Header, null),
        _react2.default.createElement(_reactabular.Table.Body, { rows: rows, rowKey: 'id' })
      )
    );
  }
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    histograms: state.options.histograms
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Statistics);

});

require.register("initialize.js", function(exports, require, module) {
'use strict';

require('style/app.scss');

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reactRedux = require('react-redux');

require('whatwg-fetch');

require('jquery');

var _toastr = require('toastr');

var _toastr2 = _interopRequireDefault(_toastr);

var _rootReducer = require('reducers/rootReducer');

var _rootReducer2 = _interopRequireDefault(_rootReducer);

var _initialState = require('reducers/initialState');

var _initialState2 = _interopRequireDefault(_initialState);

var _App = require('container/App');

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('es6-promise').polyfill();
require('whatwg-fetch');

_toastr2.default.options.closeButton = true;
_toastr2.default.options.preventDuplicates = true;
_toastr2.default.options.timeOut = 1300;

var store = (0, _redux.createStore)(_rootReducer2.default, _initialState2.default, (0, _redux.applyMiddleware)(_reduxThunk2.default));

document.addEventListener('DOMContentLoaded', function () {
  var el = document.createElement('div');
  el.id = 'app';
  document.body.appendChild(el);
  _reactDom2.default.render(_react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    _react2.default.createElement(_App2.default, null)
  ), el);
});

});

require.register("reducers/cardReducer.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cardReducer;

var _initialState = require('./initialState');

var _initialState2 = _interopRequireDefault(_initialState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function cardReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _initialState2.default.cards;
  var action = arguments[1];

  var playerCards = void 0;
  var boardCards = void 0;
  var chosenCards = void 0;
  var selectedCard = void 0;
  switch (action.type) {
    case 'SELECT_CARD':
      return Object.assign({}, state, { selectedCard: action.cardName });
    case 'ADD_POKER_TABLE_CARD':
      playerCards = Object.assign({}, state.playerCards);
      boardCards = Object.assign({}, state.boardCards);
      if (state.selectedCard.startsWith('XB')) {
        boardCards[state.selectedCard] = action.cardName;
      } else {
        playerCards[state.selectedCard] = action.cardName;
      }
      return Object.assign({}, state, { playerCards: playerCards,
        boardCards: boardCards });
    case 'REMOVE_PLAYER_CARD':
      playerCards = Object.assign({}, state.playerCards);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Object.keys(playerCards)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var key = _step.value;

          if (playerCards[key] === action.cardName) {
            playerCards[key] = key;
            selectedCard = key;
            break;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return Object.assign({}, state, { selectedCard: selectedCard,
        playerCards: playerCards });
    case 'REMOVE_BOARD_CARD':
      boardCards = Object.assign({}, state.boardCards);
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = Object.keys(boardCards)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var key = _step2.value;

          if (boardCards[key] === action.cardName) {
            boardCards[key] = key;
            selectedCard = key;
            break;
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return Object.assign({}, state, { selectedCard: selectedCard,
        boardCards: boardCards });
    case 'ADD_CHOSEN_CARD':
      chosenCards = Array.from(state.chosenCards);
      chosenCards.push(action.cardName);
      return Object.assign({}, state, { chosenCards: chosenCards });
    case 'REMOVE_CHOSEN_CARD':
      chosenCards = state.chosenCards.filter(function (card) {
        return card !== action.cardName;
      });
      return Object.assign({}, state, { chosenCards: chosenCards });
    case 'SET_PLAYER_CARDS':
      playerCards = Object.assign({}, state.playerCards);
      for (var i = parseInt(action.playersAmount); i < 9; ++i) {
        playerCards['XF' + (i + 1)] = 'XF' + (i + 1);
        playerCards['XS' + (i + 1)] = 'XS' + (i + 1);
      }
      return Object.assign({}, state, { playerCards: playerCards });
    case 'RESET_CARDS':
      return Object.assign({}, _initialState2.default.cards);
    default:
      return state;
  }
}

});

;require.register("reducers/initialState.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  cards: {
    playerCards: {
      'XF1': 'XF1', 'XS1': 'XS1',
      'XF2': 'XF2', 'XS2': 'XS2',
      'XF3': 'XF3', 'XS3': 'XS3',
      'XF4': 'XF4', 'XS4': 'XS4',
      'XF5': 'XF5', 'XS5': 'XS5',
      'XF6': 'XF6', 'XS6': 'XS6',
      'XF7': 'XF7', 'XS7': 'XS7',
      'XF8': 'XF8', 'XS8': 'XS8',
      'XF9': 'XF9', 'XS9': 'XS9'
    },
    boardCards: {
      'XB1': 'XB1', 'XB2': 'XB2', 'XB3': 'XB3', 'XB4': 'XB4', 'XB5': 'XB5'
    },
    selectedCard: 'XF1',
    chosenCards: []
  },

  options: {
    playersAmount: 1,
    playerNames: ['Player1', 'Player2', 'Player3', 'Player4', 'Player5', 'Player6', 'Player7', 'Player8', 'Player9'],
    winningChances: [],
    histograms: [],
    isCounting: false
  }
};

});

require.register("reducers/optionReducer.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = optionReducer;

var _initialState = require('./initialState');

var _initialState2 = _interopRequireDefault(_initialState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function optionReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _initialState2.default.options;
  var action = arguments[1];

  var pokerTableCards = void 0;
  var chosenCards = void 0;
  var selectedCard = void 0;
  switch (action.type) {
    case 'SET_PLAYERS_AMOUNT':
      return Object.assign({}, state, { playersAmount: parseInt(action.playersAmount) });
    case 'RESET_OPTIONS':
      return Object.assign({}, _initialState2.default.options);
    case 'CHANGE_PLAYER_NAME':
      var playerNames = Array.from(state.playerNames);
      playerNames[action.playerId] = action.playerName;
      return Object.assign({}, state, { playerNames: playerNames });
    case 'ADD_POKER_STATISTICS':
      var winningChances = Array.from(action.pokerStatistics.percentages);
      var histograms = Array.from(action.pokerStatistics.histograms);
      return Object.assign({}, state, { winningChances: winningChances, histograms: histograms });
    case 'BEGIN_COUNTING':
      return Object.assign({}, state, { isCounting: true });
    case 'COMPLETE_COUNTING':
      return Object.assign({}, state, { isCounting: false });
    default:
      return state;
  }
}

});

;require.register("reducers/rootReducer.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _cardReducer = require('./cardReducer');

var _cardReducer2 = _interopRequireDefault(_cardReducer);

var _optionReducer = require('./optionReducer');

var _optionReducer2 = _interopRequireDefault(_optionReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootReducer = (0, _redux.combineReducers)({
  cards: _cardReducer2.default,
  options: _optionReducer2.default
});

exports.default = rootReducer;

});

require.register("style/app.scss.js", function(exports, require, module) {
"use strict";

});

require.register("utils/calculatePokerStatistics.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var calculatePokerStatistics = exports.calculatePokerStatistics = function calculatePokerStatistics(playersAmount, playerCards, boardCards) {
  var _playerCards = [];
  var _boardCards = [];

  for (var i = 0; i < playersAmount; ++i) {
    _playerCards.push(playerCards['XF' + (i + 1)]);
    _playerCards.push(playerCards['XS' + (i + 1)]);
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Object.keys(boardCards)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var key = _step.value;

      if (!boardCards[key].startsWith('X')) {
        _boardCards.push(boardCards[key]);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return new Promise(function (resolve, reject) {
    fetch('http://dreamerrr.me/poker_calculator/count', {
      method: 'post',
      body: JSON.stringify({
        playersCards: _playerCards,
        boardCards: _boardCards
      })
    }).then(function (response) {
      response.json().then(function (pokerStatistics) {
        return resolve(pokerStatistics);
      });
    });
  });
};

});

require.register("utils/cards.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var values = exports.values = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
var suits = exports.suits = ['D', 'H', 'S', 'C'];

var getCardSuit = exports.getCardSuit = function getCardSuit(cardSuit) {
  switch (cardSuit) {
    case 'D':
      return 'diams';
    case 'H':
      return 'hearts';
    case 'S':
      return 'spades';
    case 'C':
      return 'clubs';
    default:
      break;
  }
};

var getCardSuitBadge = exports.getCardSuitBadge = function getCardSuitBadge(cardSuit) {
  switch (cardSuit) {
    case 'S':
      return '♠';
    case 'C':
      return '♣';
    case 'D':
      return '♦';
    case 'H':
      return '♥';
    default:
      break;
  }
};

});

require.register("utils/changeSelection.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var changeSelection = exports.changeSelection = function changeSelection(playersAmount, currentSelectedCard, playerCards, boardCards) {
  if (currentSelectedCard.startsWith('XB')) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = Object.keys(boardCards)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var key = _step.value;

        if (boardCards[key].startsWith('X')) {
          return Promise.resolve(key);
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    for (var i = 0; i < playersAmount; ++i) {
      if (playerCards['XF' + (i + 1)].startsWith('X')) {
        return Promise.resolve('XF' + (i + 1));
      }
      if (playerCards['XS' + (i + 1)].startsWith('X')) {
        return Promise.resolve('XS' + (i + 1));
      }
    }
  } else {
    for (var _i = 0; _i < playersAmount; ++_i) {
      if (playerCards['XF' + (_i + 1)].startsWith('X')) {
        return Promise.resolve('XF' + (_i + 1));
      }
      if (playerCards['XS' + (_i + 1)].startsWith('X')) {
        return Promise.resolve('XS' + (_i + 1));
      }
    }

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = Object.keys(boardCards)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var _key = _step2.value;

        if (boardCards[_key].startsWith('X')) {
          return Promise.resolve(_key);
        }
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  }
  return Promise.resolve('');
};

});

require.register("utils/utils.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var isPlayerCardsFilled = exports.isPlayerCardsFilled = function isPlayerCardsFilled(playersAmount, playerCards) {
  for (var i = 0; i < playersAmount; ++i) {
    if (playerCards['XF' + (i + 1)].startsWith('X') || playerCards['XS' + (i + 1)].startsWith('X')) {
      return false;
    }
  }
  return true;
};

var getBoardCardsAmount = exports.getBoardCardsAmount = function getBoardCardsAmount(boardCards) {
  var amount = 0;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Object.keys(boardCards)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var key = _step.value;

      if (!boardCards[key].startsWith('X')) {
        ++amount;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return amount;
};

});

require.alias("buffer/index.js", "buffer");
require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map
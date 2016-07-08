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
var global = window;
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
require.register("actions.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var setPlayersAmount = exports.setPlayersAmount = function setPlayersAmount(playersAmount) {
  return {
    type: 'SET_PLAYERS_AMOUNT',
    playersAmount: playersAmount
  };
};

var selectCard = exports.selectCard = function selectCard(cardName) {
  return {
    type: 'SELECT_CARD',
    cardName: cardName
  };
};

var addCardToPokerTable = exports.addCardToPokerTable = function addCardToPokerTable(selectedCard, cardName) {
  return {
    type: 'ADD_CARD_TO_POKER_TABLE',
    selectedCard: selectedCard,
    cardName: cardName
  };
};
});

;require.register("components/Board.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Card = require('./Card');

var _Card2 = _interopRequireDefault(_Card);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.default = function (_ref) {
  var pokerTableCards = _ref.pokerTableCards;
  var selectedCard = _ref.selectedCard;
  var onSelectCard = _ref.onSelectCard;

  return _react2.default.createElement(
    'div',
    { className: 'Board' },
    [].concat(_toConsumableArray(Array(5))).map(function (x, i) {
      return _react2.default.createElement(_Card2.default, { cardName: 'XB' + i, selected: selectedCard, onSelect: onSelectCard });
    })
  );
};
});

;require.register("components/Card.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createClass({
  displayName: 'Card',

  propTypes: {
    cardName: _react2.default.PropTypes.string.isRequired,
    selected: _react2.default.PropTypes.string.isRequired,
    onSelect: _react2.default.PropTypes.func,
    addCard: _react2.default.PropTypes.func
  },

  handleClick: function handleClick(selectedCard, cardName) {
    cardName.startsWith('X') ? this.props.onSelect(cardName) : this.props.addCard(selectedCard, cardName);
  },
  render: function render() {
    var cardName = this.props.cardName;
    var selectedCard = this.props.selected;
    var path = cardName.startsWith('X') ? 'img/cards/X.png' : 'img/cards/' + cardName + '.png';
    var isSelected = cardName === selectedCard;
    var className = isSelected ? 'Card-selected' : 'Card';

    return _react2.default.createElement(
      'div',
      { className: className, onClick: this.handleClick.bind(this, selectedCard, cardName) },
      _react2.default.createElement('img', { src: path })
    );
  }
});
});

require.register("components/Player.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Card = require('./Card');

var _Card2 = _interopRequireDefault(_Card);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var number = _ref.number;
  var pokerTableCards = _ref.pokerTableCards;
  var selectedCard = _ref.selectedCard;
  var onSelectCard = _ref.onSelectCard;

  var className = 'Player-' + number;
  var playerName = 'Player' + number;
  var cardNameFirst = pokerTableCards['XF' + number];
  var cardNameSecond = pokerTableCards['XS' + number];

  return _react2.default.createElement(
    'div',
    { className: className },
    _react2.default.createElement(
      'div',
      { className: 'Hand' },
      _react2.default.createElement(_Card2.default, { cardName: cardNameFirst, selected: selectedCard, onSelect: onSelectCard }),
      _react2.default.createElement(_Card2.default, { cardName: cardNameSecond, selected: selectedCard, onSelect: onSelectCard })
    ),
    _react2.default.createElement(
      'div',
      { className: 'PlayerName' },
      playerName
    )
  );
};
});

;require.register("components/PlayersAmount.jsx", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var playersAmount = [2, 3, 4, 5, 6, 7, 8, 9];

exports.default = _react2.default.createClass({
  displayName: "PlayersAmount",

  propTypes: {
    onPlayersAmountChange: _react2.default.PropTypes.func.isRequired,
    playersAmount: _react2.default.PropTypes.number.isRequired
  },

  changePlayersAmount: function changePlayersAmount() {
    var value = this.refs.playersAmount.value;
    this.props.onPlayersAmountChange(value);
  },
  render: function render() {
    return _react2.default.createElement(
      "select",
      { ref: "playersAmount", value: this.props.playersAmount, onChange: this.changePlayersAmount },
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

require.register("container/App.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _actions = require('actions');

var _CardsBlock = require('./CardsBlock');

var _CardsBlock2 = _interopRequireDefault(_CardsBlock);

var _PokerTable = require('./PokerTable');

var _PokerTable2 = _interopRequireDefault(_PokerTable);

var _Options = require('./Options');

var _Options2 = _interopRequireDefault(_Options);

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
        _react2.default.createElement(_CardsBlock2.default, { selected: this.props.selectedCard, addCardToPokerTable: this.props.addCardToPokerTable }),
        _react2.default.createElement(_PokerTable2.default, { selectedCard: this.props.selectedCard, onSelectCard: this.props.onSelectCard })
      ),
      _react2.default.createElement(
        'div',
        { className: 'OptionsAndStatistics' },
        _react2.default.createElement(_Options2.default, null)
      )
    );
  }
});

var mapStateToProps = function mapStateToProps(state) {
  return {
    selectedCard: state.selectedCard
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    addCardToPokerTable: function addCardToPokerTable(selectedCard, cardName) {
      dispatch((0, _actions.addCardToPokerTable)(selectedCard, cardName));
    },
    onSelectCard: function onSelectCard(cardName) {
      dispatch((0, _actions.selectCard)(cardName));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(App);
});

require.register("container/CardsBlock.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Card = require('components/Card');

var _Card2 = _interopRequireDefault(_Card);

var _cards = require('utils/cards');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var selected = _ref.selected;
  var addCardToPokerTable = _ref.addCardToPokerTable;

  return _react2.default.createElement(
    'div',
    { className: 'CardsBlock' },
    _cards.suits.map(function (suit) {
      return _react2.default.createElement(
        'div',
        { className: 'CardsBlock-suit' },
        _cards.values.map(function (value) {
          var cardName = value + suit;
          return _react2.default.createElement(_Card2.default, { selected: selected, cardName: cardName, addCard: addCardToPokerTable });
        })
      );
    })
  );
};
});

require.register("container/Options.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _actions = require('actions');

var _PlayersAmount = require('components/PlayersAmount');

var _PlayersAmount2 = _interopRequireDefault(_PlayersAmount);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Options = function Options(_ref) {
  var playersAmount = _ref.playersAmount;
  var onPlayersAmountChange = _ref.onPlayersAmountChange;

  return _react2.default.createElement(
    'div',
    { className: 'Options' },
    _react2.default.createElement(
      'div',
      { className: 'PlayersAmount' },
      _react2.default.createElement(
        'div',
        null,
        'Select the amount of players: '
      ),
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_PlayersAmount2.default, { onPlayersAmountChange: onPlayersAmountChange, playersAmount: playersAmount })
      )
    )
  );
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    playersAmount: state.playersAmount
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onPlayersAmountChange: function onPlayersAmountChange(playersAmount) {
      dispatch((0, _actions.setPlayersAmount)(playersAmount));
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

var _Player = require('components/Player');

var _Player2 = _interopRequireDefault(_Player);

var _Board = require('components/Board');

var _Board2 = _interopRequireDefault(_Board);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var PokerTable = function PokerTable(_ref) {
  var playersAmount = _ref.playersAmount;
  var pokerTableCards = _ref.pokerTableCards;
  var selectedCard = _ref.selectedCard;
  var onSelectCard = _ref.onSelectCard;

  var amount = parseInt(playersAmount, 10);

  return _react2.default.createElement(
    'div',
    { className: 'PokerTable' },
    [].concat(_toConsumableArray(Array(amount))).map(function (x, i) {
      return _react2.default.createElement(_Player2.default, { number: i + 1, pokerTableCards: pokerTableCards, selectedCard: selectedCard, onSelectCard: onSelectCard });
    }),
    _react2.default.createElement(_Board2.default, { pokerTableCards: pokerTableCards, selectedCard: selectedCard, onSelectCard: onSelectCard })
  );
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    playersAmount: state.playersAmount,
    pokerTableCards: state.pokerTableCards
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(PokerTable);
});

require.register("initialize.js", function(exports, require, module) {
'use strict';

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reducer = require('reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _App = require('container/App');

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = (0, _redux.createStore)(_reducer2.default);

document.addEventListener('DOMContentLoaded', function () {
  _reactDom2.default.render(_react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    _react2.default.createElement(_App2.default, null)
  ), document.querySelector('#app'));
});
});

require.register("reducer.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case 'SET_PLAYERS_AMOUNT':
      return Object.assign({}, state, { playersAmount: action.playersAmount });
    case 'SELECT_CARD':
      return Object.assign({}, state, { selectedCard: action.cardName });
    case 'ADD_CARD_TO_POKER_TABLE':
      var pokerTableCards = Object.assign({}, state.pokerTableCards);
      pokerTableCards[action.selectedCard] = action.cardName;
      return Object.assign({}, state, { pokerTableCards: pokerTableCards });
    default:
      return state;
  }
};

var initialState = {
  playersAmount: 2,
  selectedCard: 'XF1',
  pokerTableCards: {
    'XF1': 'XF1', 'XS1': 'XS1',
    'XF2': 'XF2', 'XS2': 'XS2',
    'XF3': 'XF3', 'XS3': 'XS3',
    'XF4': 'XF4', 'XS4': 'XS4',
    'XF5': 'XF5', 'XS5': 'XS5',
    'XF6': 'XF6', 'XS6': 'XS6',
    'XF7': 'XF7', 'XS7': 'XS7',
    'XF8': 'XF8', 'XS8': 'XS8',
    'XF9': 'XF9', 'XS9': 'XS9',
    'XB1': 'XB1', 'XB2': 'XB2', 'XB3': 'XB3', 'XB4': 'XB4', 'XB5': 'XB5'
  }
};
});

;require.register("utils/cards.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var values = exports.values = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
var suits = exports.suits = ['S', 'C', 'D', 'H'];
});

require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map
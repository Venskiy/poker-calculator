import {combineReducers} from 'redux';

import cards from './cardReducer';
import options from './optionReducer';

const rootReducer = combineReducers({
  cards,
  options
});

export default rootReducer;

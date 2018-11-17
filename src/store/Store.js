import { createStore, combineReducers } from 'redux';

import { Houses } from './Houses';

const reducers = combineReducers({
  Houses,
});

export default createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

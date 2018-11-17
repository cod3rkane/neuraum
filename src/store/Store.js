import { createStore, combineReducers } from 'redux';

const reducers = combineReducers({});

export default createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

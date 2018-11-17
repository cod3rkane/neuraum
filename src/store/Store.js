import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'

import { Houses } from './Houses';
import houseMiddleware from './saga/House';

const sagaMiddleware = createSagaMiddleware()

const reducers = combineReducers({
  Houses,
});

const store = createStore(
  reducers,
  compose(
    applyMiddleware(sagaMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ),
);

sagaMiddleware.run(houseMiddleware);

export default store;

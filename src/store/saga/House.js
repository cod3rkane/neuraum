import { call, put, takeLatest } from 'redux-saga/effects';

import HousesService from '../../services/Houses';
import { fetchHousesSuccess, fetchHousesFailure, FETCH_HOUSES_BEGIN } from '../Houses';

const API = new HousesService();

function* fetchHouses() {
  try {
    const houses = yield call(API.fetch);
    if (houses.success) {
      yield put(fetchHousesSuccess(houses.results));
    } else {
      yield put(fetchHousesFailure('Something went wrong!'));  
    }
  } catch (err) {
    yield put(fetchHousesFailure(err.message));
  }
}

function* houseMiddleware() {
  yield takeLatest(FETCH_HOUSES_BEGIN, fetchHouses);
}

export default houseMiddleware;

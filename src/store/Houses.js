import * as R from 'ramda';

export const FETCH_HOUSES_BEGIN = 'FETCH_HOUSES_BEGIN';
export const FETCH_HOUSES_SUCCESS = 'FETCH_HOUSES_SUCCESS';
export const FETCH_HOUSES_FAILURE = 'FETCH_HOUSES_FAILURE';

// Actions

export const fetchHousesBegin = () => ({
  type: FETCH_HOUSES_BEGIN
});

export const fetchHousesSuccess = houses => ({
  type: FETCH_HOUSES_SUCCESS,
  payload: houses,
});

export const fetchHousesFailure = error => ({
  type: FETCH_HOUSES_FAILURE,
  payload: error,
});

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export const Houses = (state = initialState, action) => {
  const onBegin = () => ({
    ...state,
    loading: true,
    error: null,
  });

  const onSuccess = ({ payload }) => ({
    ...state,
    items: payload,
    loading: false,
    error: null,
  });

  const onFailure = ({ payload }) => ({
    ...state,
    items: [],
    loading: false,
    error: payload,
  });

  const typeEq = R.propEq('type');

  return R.cond([
    [typeEq(FETCH_HOUSES_BEGIN), onBegin],
    [typeEq(FETCH_HOUSES_SUCCESS), onSuccess],
    [typeEq(FETCH_HOUSES_FAILURE), onFailure],
    [R.T, R.always(state)]
  ])(action);
};

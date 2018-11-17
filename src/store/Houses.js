import * as R from 'ramda';

export const FETCH_HOUSES_BEGIN = 'FETCH_HOUSES_BEGIN';
export const FETCH_HOUSES_SUCCESS = 'FETCH_HOUSES_SUCCESS';
export const FETCH_HOUSES_FAILURE = 'FETCH_HOUSES_BEGIN';

// Actions

export const fetchHousesBegin = () => ({
  type: FETCH_HOUSES_BEGIN
});

export const fetchHousesSuccess = houses => ({
  type: FETCH_HOUSES_SUCCESS,
  payload: { houses }
});

export const fetchHousesFailure = error => ({
  type: FETCH_HOUSES_FAILURE,
  payload: { error }
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

  return R.cond([
    [R.equals(FETCH_HOUSES_BEGIN), onBegin],
    [R.T, R.always(state)]
  ])(action);
};

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
  vendors: [],
  loading: false,
  error: null,
};

// House utils
export const groupByVendor = R.groupBy(R.path(['vendor_verbose', 'id']));
export const formatVendor = R.map(
  R.applySpec({
    name: R.compose(R.path(['vendor_verbose', 'display_name']), R.head),
    logo: R.compose(R.path(['vendor_verbose', 'logo']), R.head),
    items: a => a,
  }),
);

export const Houses = (state = initialState, action) => {
  const onBegin = () => ({
    ...state,
    loading: true,
    error: null,
  });

  const onSuccess = ({ payload }) => ({
    ...state,
    items: payload,
    vendors: R.compose(formatVendor, groupByVendor)(payload),
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

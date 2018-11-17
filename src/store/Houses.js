import * as R from 'ramda';

export const FETCH_HOUSES_BEGIN = 'FETCH_HOUSES_BEGIN';
export const FETCH_HOUSES_SUCCESS = 'FETCH_HOUSES_SUCCESS';
export const FETCH_HOUSES_FAILURE = 'FETCH_HOUSES_FAILURE';
export const UPDATE_SORTBY = 'UPDATE_SORTBY';

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

export const updateSortBy = ({ selected,  oldest }) => ({
  type: UPDATE_SORTBY,
  payload: { selected, remove: oldest },
});

const initialState = {
  items: {},
  vendors: {},
  loading: false,
  error: null,
  sortBy: ['name', 'price', 'internal_id'],
};

// House utils
export const groupByVendor = R.groupBy(R.path(['vendor_verbose', 'id']));
export const formatVendor = R.map(
  R.applySpec({
    name: R.compose(R.path(['vendor_verbose', 'display_name']), R.head),
    logo: R.compose(R.path(['vendor_verbose', 'logo']), R.head),
    id: R.compose(R.path(['vendor_verbose', 'id']), R.head),
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
    items: {},
    vendors: {},
    loading: false,
    error: payload,
  });

  const typeEq = R.propEq('type');

  const getIndex = R.compose(R.findIndex, R.equals);

  const onUpdateSort = ({ payload }) => ({
    ...state,
    sortBy: R.update(getIndex(payload.remove)(state.sortBy), payload.selected, state.sortBy),
  });

  return R.cond([
    [typeEq(FETCH_HOUSES_BEGIN), onBegin],
    [typeEq(FETCH_HOUSES_SUCCESS), onSuccess],
    [typeEq(FETCH_HOUSES_FAILURE), onFailure],
    [typeEq(UPDATE_SORTBY), onUpdateSort],
    [R.T, R.always(state)]
  ])(action);
};

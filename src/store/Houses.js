import * as R from 'ramda';

export const FETCH_HOUSES_BEGIN = 'FETCH_HOUSES_BEGIN';
export const FETCH_HOUSES_SUCCESS = 'FETCH_HOUSES_SUCCESS';
export const FETCH_HOUSES_FAILURE = 'FETCH_HOUSES_FAILURE';
export const UPDATE_SORTBY = 'UPDATE_SORTBY';
export const UPDATE_HOUSE_PRICE = 'UPDATE_HOUSE_PRICE';

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

export const updateHousePrice = ({ price, house }) => ({
  type: UPDATE_HOUSE_PRICE,
  payload: { price, house },
});

const initialState = {
  items: {},
  vendors: {},
  edited: {},
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

  const onUpdateSort = ({ payload }) => {
    const sortBy = R.update(getIndex(payload.remove)(state.sortBy), payload.selected, state.sortBy);
    const byAsc = R.sort(R.ascend(R.prop(payload.selected)));
    const vendors = R.map(vendor => ({ ...vendor, items: byAsc(vendor.items) }), state.vendors);
    
    return {
      ...state,
      sortBy,
      vendors,
    };
  };

  const onPriceUpdate = ({ payload }) => {
    const findItemByInternalId = R.find(R.propEq('internal_id', payload.house.internal_id));
    const updatePrice = R.assoc('price', parseFloat(payload.price))
    const itemIndex = R.findIndex(R.propEq('internal_id', payload.house.internal_id), state.items)
    const newHouse = updatePrice(findItemByInternalId(state.items));
    const newVendors = R.update(itemIndex, newHouse, state.items)
    const edited = { price: payload.price,  id: payload.house.internal_id, vendor: payload.house.vendor_verbose.id };

    return {
      ...state,
      vendors: R.compose(formatVendor, groupByVendor)(newVendors),
      edited: { ...state.edited, [payload.house.internal_id]:edited  },
    };
  };


  return R.cond([
    [typeEq(FETCH_HOUSES_BEGIN), onBegin],
    [typeEq(FETCH_HOUSES_SUCCESS), onSuccess],
    [typeEq(FETCH_HOUSES_FAILURE), onFailure],
    [typeEq(UPDATE_SORTBY), onUpdateSort],
    [typeEq(UPDATE_HOUSE_PRICE), onPriceUpdate],
    [R.T, R.always(state)]
  ])(action);
};

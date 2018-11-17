import React from 'react';
import { connect } from 'react-redux';

import { fetchHousesBegin, updateSortBy, updateHousePrice } from '../store/Houses';
import { VendorList } from '../components/Vendor/VendorList';
import { Panel } from '../components/Panel';

class HouseContainer extends React.Component {
  componentDidMount() {
    this.props.fetchHouses();
  }

  render() {
    const { Houses, onPriceChange, onChangePanel } = this.props;

    if (Houses.loading) {
      return (
        <span>Loading...</span>
      );
    }

    return (
      <main>
        <Panel sortBy={Houses.sortBy} onChange={onChangePanel}/>
        <VendorList items={Houses.vendors || {}} onPriceChange={onPriceChange}/>
      </main>
    );
  }
};

const mapStateToProps = ({ Houses }) => ({ Houses });

const mapDispatchToProps = dispatch => ({
  fetchHouses() {
    dispatch(fetchHousesBegin());
  },
  onChangePanel({ selected, oldest }) {
    dispatch(
      updateSortBy({
        selected,
        oldest
      })
    );
  },
  onPriceChange({ newPrice, record }) {
    dispatch(updateHousePrice({ price: newPrice, house: record }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HouseContainer);

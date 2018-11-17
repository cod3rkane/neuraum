import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';

import { fetchHousesBegin, updateSortBy, updateHousePrice } from '../store/Houses';
import { VendorList } from '../components/Vendor/VendorList';
import { Panel } from '../components/Panel';

import './House.scss';

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
      <main className="house-main">
        <Panel sortBy={Houses.sortBy} onChange={onChangePanel}/>
        <VendorList items={Houses.vendors || {}} onPriceChange={onPriceChange}/>
        <div className="buttons">
          <Button type="primary" onClick={() => console.log(JSON.stringify(Houses.edited))}>Save</Button>
        </div>
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

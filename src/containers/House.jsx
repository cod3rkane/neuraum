import React from 'react';
import { connect } from 'react-redux';

import { fetchHousesBegin, updateSortBy } from '../store/Houses';
import { VendorList } from '../components/Vendor/VendorList';
import { Panel } from '../components/Panel';

class HouseContainer extends React.Component {
  componentDidMount() {
    this.props.fetchHouses();
  }

  render() {
    const { Houses } = this.props;

    if (Houses.loading) {
      return (
        <span>Loading...</span>
      );
    }

    return (
      <main>
        <Panel sortBy={Houses.sortBy} onChange={this.props.onChangePanel}/>
        <VendorList items={Houses.vendors || {}} />
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
});

export default connect(mapStateToProps, mapDispatchToProps)(HouseContainer);

import React from 'react';
import { connect } from 'react-redux';

import { fetchHousesBegin } from '../store/Houses';
import { VendorList } from '../components/Vendor/VendorList';

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
});

export default connect(mapStateToProps, mapDispatchToProps)(HouseContainer);

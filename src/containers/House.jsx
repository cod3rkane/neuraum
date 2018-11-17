import React from 'react';
import { connect } from 'react-redux';

import { fetchHousesBegin } from '../store/Houses';

class HouseContainer extends React.Component {
  componentDidMount() {
    this.props.fetchHouses();
  }

  render() {
    return (
      <main>
        Olá
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

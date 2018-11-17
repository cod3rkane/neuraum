import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';

import { Vendor } from './index';
import { HouseList } from '../House/HouseList';

export const VendorList = ({ items }) => {
  const mapVendors = R.compose(
    R.values,
    R.map(({ id, logo, name, items: houses }) => (
      <Vendor key={id} title={name} id={id} avatar={logo.original}>
        <HouseList items={houses} />
      </Vendor>
    ))
  );

  return <Fragment>{mapVendors(items)}</Fragment>;
};

VendorList.propTypes = {
  items: PropTypes.object.isRequired
};

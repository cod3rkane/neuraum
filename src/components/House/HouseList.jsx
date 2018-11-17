import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Table, Avatar } from 'antd';

export const HouseList = ({ items }) => {
  const columns = [
    {
      title: 'House ID',
      dataIndex: 'internal_id'
    },
    {
      title: 'Image',
      dataIndex: 'exterior_images',
      render: ([ image ]) => (<Avatar src={image['fill-320x240']} />),
    },
    {
      title: 'Name',
      dataIndex: 'name'
    },
    {
      title: 'Price',
      dataIndex: 'price',
      render: price => price.toLocaleString('US', { style: 'currency', currency: 'EUR' }),
    },
    {
      title: 'Size',
      dataIndex: 'living_area_total'
    },
  ];

  return (
    <Fragment>
      <Table columns={columns} dataSource={items} rowKey="id"/>
    </Fragment>
  );
};

HouseList.propTypes = {
  items: PropTypes.array.isRequired
};

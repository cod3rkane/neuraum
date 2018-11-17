import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Table, Avatar } from 'antd';
import * as R from 'ramda';

const withSorter = WrappedComponent => {
  return class extends React.Component {
    state = {
      items: []
    };

    static getDerivedStateFromProps(props, state) {
      if (state.items.length === 0) {
        return {
          items: props.dataSource
        };
      }

      return null;
    }

    render() {
      return (
        <WrappedComponent
          onChange={this.onChange}
          {...this.props}
          dataSource={this.state.items}
        />
      );
    }

    onChange = (pagination, filters, { field, order = ''} ) => {
      const byAsc = R.sort(R.ascend(R.prop(field)));
      const byDesc = R.sort(R.descend(R.prop(field)));
      const orderBy = R.cond([
        [
          R.equals('descend'),
          R.compose(
            byDesc,
            R.nthArg(1)
          )
        ],
        [
          R.equals('ascend'),
          R.compose(
            byAsc,
            R.nthArg(1)
          )
        ],
        [R.T, R.always(this.props.dataSource)]
      ]);
      this.setState({ items: orderBy(order, this.state.items) });
    };
  };
};

export const HouseList = ({ items }) => {
  const columns = [
    {
      title: 'House ID',
      dataIndex: 'internal_id',
      sorter: true,
    },
    {
      title: 'Image',
      dataIndex: 'exterior_images',
      render: ([image]) => <Avatar src={image['fill-320x240']} />,
      sorter: true,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: true,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      render: price =>
        price.toLocaleString('US', { style: 'currency', currency: 'EUR' }),
      sorter: true,
    },
    {
      title: 'Size',
      dataIndex: 'living_area_total',
      render: area => (
        <span>
          {area} <sup>sqm</sup>
        </span>
      ),
      sorter: true,
    }
  ];

  const TableWithSorter = withSorter(Table);

  return (
    <Fragment>
      <TableWithSorter columns={columns} dataSource={items} rowKey="id" />
    </Fragment>
  );
};

HouseList.propTypes = {
  items: PropTypes.array.isRequired
};
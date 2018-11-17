import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import * as R from 'ramda';

import './Panel.scss';

const Option = Select.Option;

export const SortByItem = ({ selected, onChange, omit }) => {
  const onSelect = e => onChange({ selected: e, oldest: selected });
  return (
    <Select defaultValue={selected} onChange={onSelect}>
      <Option value="internal_id" disabled={R.contains('internal_id', omit)}>
        House ID
      </Option>
      <Option
        value="exterior_images"
        disabled={R.contains('exterior_images', omit)}
      >
        Image
      </Option>
      <Option value="name" disabled={R.contains('name', omit)}>
        Name
      </Option>
      <Option value="price" disabled={R.contains('price', omit)}>
        Price
      </Option>
      <Option
        value="living_area_total"
        disabled={R.contains('living_area_total', omit)}
      >
        Size
      </Option>
    </Select>
  );
};

SortByItem.propTypes = {
  selected: PropTypes.string.isRequired,
  omit: PropTypes.array.isRequired,
  onChange: PropTypes.func
};

export const Panel = ({ sortBy, onChange }) => {
  const sorts = R.map(
    sort => (
      <SortByItem
        key={sort}
        selected={sort}
        onChange={onChange}
        omit={R.without([sort], sortBy)}
      />
    ),
    sortBy
  );

  return (
    <section className="panel">
      <h4>sort all by</h4>
      {sorts}
    </section>
  );
};

Panel.propTypes = {
  sortBy: PropTypes.array.isRequired,
  onChange: PropTypes.func
};

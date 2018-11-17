import React from 'react';
import PropTypes from 'prop-types';
import { Card, Avatar } from 'antd';
const { Meta } = Card;

export const Vendor = ({ title, avatar, id }) => {
  return (
    <div className="vendor">
      <Card>
        <Meta avatar={<Avatar src={avatar} />} title={title} description={`Vendor ID: ${id}`}/>
      </Card>
    </div>
  );
};

Vendor.propTypes = {
  title: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

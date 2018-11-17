import React, { Component } from 'react';

import HousesService from '../../services/Houses';
import './Home.scss';

export class Home extends Component {
  componentDidMount() {
    const service = new HousesService();
    service.fetch().then(
      result => console.log('cod3r: ', result),
    );
  }

  render() {
    return (
      <div id="home">
        <header>header</header>
        <div className="product-content">
          Hi!
        </div>
      </div>
    );
  }
}

export default Home;

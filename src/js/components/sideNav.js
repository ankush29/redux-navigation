import React, { Component } from 'react';

import '../../css/sideNav.css';

export default class SideNav extends Component {
  render() {
    return(
      <div className="sidenav">
        <div className="navHeader">
          <img src="map-marker.png" alt="marker"/>
        </div>
        <div className="navContent">
          <img src="ice-crystal.png" alt="crystal"/>
        </div>
      </div>
    )
  }
}

import React, { Component } from 'react';
import './map.css';

export default class Marker extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  showPopUp = (ev) => {
    this.props.showPopUp(this.props.text)
  }

  render() {
    return (
      <div className={'pin popup'} onClick={this.showPopUp}>
        <span className={"popuptext "+this.props.activePop}>{`Longitude: ${this.props.lng} and Latitude: ${this.props.lat}`}</span>
        <span style={{'color':'#A9A9A9'}}>{this.props.text}</span>
      </div>
    )
  }
}

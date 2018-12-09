import React, { Component } from 'react';
import '../../css/map.css';

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
      <div className={'popup'} onClick={this.showPopUp}>
        <img src='map-marker.svg' style={{'width':'35px'}}/>
        <span className={"popuptext "+this.props.activePop}>{`${this.props.text} - Longitude: ${this.props.lng} and Latitude: ${this.props.lat}`}</span>
        {/*<span style={{'color':'#A9A9A9'}}>{this.props.text}</span>*/}
      </div>
    )
  }
}

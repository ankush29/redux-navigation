import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../../css/App.css';
import '../../css/map.css';

import { simpleAction } from '../actions/mapActions'
import GoogleMapReact from 'google-map-react';
import { data } from '../../data/location'

import Marker from './marker'
import List from './list'
import SideNav from './sideNav'

const mapStateToProps = state => ({
 ...state
})

const mapDispatchToProps = dispatch => ({
  simpleAction: () => dispatch(simpleAction())
})

class App extends Component {
  constructor(props) {
    super(props);
    this.showPopUp = this.showPopUp.bind(this)

    this.state = {
      center: {
        lat: 28.631451,
        lng: 77.216667
      },
      zoom: 11,
      markerName: '',
    }
  }
  simpleAction = (ev) => {
    this.props.simpleAction();
  }

  showPopUp = (text) => {
    this.setState({
      'markerName': text
    })
  }
  _onClick = ({x, y, lat, lng, event}) => {
    this.setState({
      'markerName': ''
    })
    //console.log(x, y, lat, lng, event.target)
  }

  handleCard = (name) => {
    this.setState({
      'markerName': name
    })
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <SideNav/>
          <div style={{ height: '100vh', width: '100%', background: '#ffffff', position: 'relative', marginLeft: '100px' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: 'AIzaSyB-DGYa7gRunXB9B63g5eYy_Fhep0uUh_k' }}
              defaultCenter={this.state.center}
              defaultZoom={this.state.zoom}
              onClick={this._onClick}
              style={{ height: '85%', position: 'absolute', width: '100%' }}
              >
              {data.location.map((item, index) => {
                return(
                  <Marker
                    key={index}
                    lat={item.lat}
                    lng={item.lng}
                    text={item.name}
                    activePop={item.name === this.state['markerName'] ? 'show' : 'hide'}
                    showPopUp={this.showPopUp}
                  />
                )
              })}
            </GoogleMapReact>
            <List handleCard={this.handleCard}/>
          </div>
        </header>
     </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

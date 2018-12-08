import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.css';
import './list.css';
import './map.css';
import './sideNav.css';

import { simpleAction } from './actions/mapActions'
import GoogleMapReact from 'google-map-react';
import { data } from './data/location'

import Marker from './marker'

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
    this.updateDimensions = this.updateDimensions.bind(this)
    this.handleRightArrow = this.handleRightArrow.bind(this)
    this.handleLeftArrow = this.handleLeftArrow.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
    //this.handleCard = this.handleCard.bind(this)
    this.state = {
      center: {
        lat: 28.652781,
        lng: 77.192146
      },
      zoom: 11,
      markerName: '',
      liWidth: '',
      menuWrapperWidth: '',
      menuSize: '',
      menuPosition: '',
      paddleMargin: 20,
      scrollDuration: 300,
      leftPaddle: 'hidden',
      rightPaddle: ''
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

  componentWillMount () {
    //this.updateDimensions();
  }

  componentDidMount() {
    let menuSize = this.element.offsetWidth * 6;
    let menuInvisibleSize = menuSize - this.menuWrapper.offsetWidth;
    this.setState({
      'liWidth': this.element.offsetWidth,
      'menuWrapperWidth': this.menuWrapper.offsetWidth,
      'menuSize': menuSize,
      'menuPosition': this.menu.scrollLeft,
      'menuInvisibleSize': menuInvisibleSize
    })
    window.addEventListener("resize", this.updateDimensions);
    //window.addEventListener('scroll', this.handleScroll);
  }

  updateDimensions = () => {
    this.setState({
      'menuWrapperWidth': this.menuWrapper.offsetWidth
    });
  }

  handleScroll = () => {
    let menuInvisibleSize = this.state.menuSize - this.state.menuWrapperWidth;
    let menuPosition = this.menu.scrollLeft;
    let paddleMargin = this.state.paddleMargin;
    let menuEndOffset = menuInvisibleSize - paddleMargin;
    if (menuPosition <= paddleMargin) {
      this.setState({
        leftPaddle: 'hidden',
        rightPaddle: '',
      })
	  } else if (menuPosition < menuEndOffset) {
		  // show both paddles in the middle
      this.setState({
        leftPaddle: '',
        rightPaddle: ''
      })
	  } else if (menuPosition >= menuEndOffset) {
      this.setState({
        leftPaddle: '',
        rightPaddle: 'hidden'
      })
    }
  }

  handleRightArrow = () => {
    debugger
    this.menu.scrollLeft = this.menu.scrollLeft ? this.menu.scrollLeft * 2 : this.state.menuInvisibleSize - 650
  }

  handleLeftArrow = () => {
    this.menu.scrollLeft = this.menu.scrollLeft - 78;
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
          <div className="sidenav">
            <div className="navHeader">
              <img src="map-marker.png" alt="marker"/>
            </div>
            <div className="navContent">
              <img src="ice-crystal.png" alt="crystal"/>
            </div>
          </div>
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
            <div className="menu-wrapper" ref={(menuWrapper) => {this.menuWrapper = menuWrapper}}>
              <ul className="menu" ref={(menu) => {this.menu = menu}} onScroll={this.handleScroll}>
                {data.location.map((item, index) => {
                  return(
                    <li ref={(element) => {this.element = element}} className="item" key={index} onClick={() => {this.handleCard(item.name)}}>
                    <div>
                      <p>{item.name}</p>
                      <p><span className="innerText">Lat: {item.lat}</span>, <span className="innerText">Long: {item.lng}</span></p>
                    </div>
                  </li>
                  )
                })}
            	</ul>
              <div className="paddles">
		            <button className={"left-paddle paddle "+this.state.leftPaddle} onClick={this.handleLeftArrow}>
                  <img src="back.png" alt="left-arrow"/>
		            </button>
		            <button className={"right-paddle paddle "+this.state.rightPaddle} onClick={this.handleRightArrow}>
			             <img src="right-arrow.png" alt="right-arrow"/>
		            </button>
	            </div>
            </div>
          </div>
        </header>
        {/*<button onClick={this.simpleAction}>Test redux action</button>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload
        </p>
        <pre>
          {
            JSON.stringify(this.props)
          }
        </pre>*/}
     </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

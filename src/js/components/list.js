import React, { Component } from 'react';
import { data } from '../../data/location'

import '../../css/list.css';

export default class List extends Component {
  constructor(props) {
    super(props);

    this.handleScroll = this.handleScroll.bind(this)
    this.handleRightArrow = this.handleRightArrow.bind(this)
    this.handleLeftArrow = this.handleLeftArrow.bind(this)
    this.updateDimensions = this.updateDimensions.bind(this)

    this.state = {
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
    this.menu.scrollLeft = this.menu.scrollLeft ? this.menu.scrollLeft * 2 : this.state.menuInvisibleSize - 650
  }

  handleLeftArrow = () => {
    this.menu.scrollLeft = this.menu.scrollLeft - 78;
  }

  render() {
    return(
      <div className="menu-wrapper" ref={(menuWrapper) => {this.menuWrapper = menuWrapper}}>
        <ul className="menu" ref={(menu) => {this.menu = menu}} onScroll={this.handleScroll}>
          {data.location.map((item, index) => {
            return(
              <li ref={(element) => {this.element = element}} className="item" key={index} onClick={() => {this.props.handleCard(item.name)}}>
              <div>
                <div><span>{item.name}</span></div>
                <div><p><span className="innerText">Lat: {item.lat}</span>, <span className="innerText">Long: {item.lng}</span></p></div>
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
    )
  }
}

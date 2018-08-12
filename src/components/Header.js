import React, { Component } from 'react';
import logo from '../logo.svg';

class Header extends Component {
    /*constructor(props) {
        super(props);
    }*/


    render() {
        if(this.props.isSubmitted) {
            return (
                <header className="Submitted-app-header">
                <div className="siteInfo">
                <img src={logo} className="App-logo" alt="logo" />
                <h1>Reputation Calculator</h1>
                </div>
                <div className="characterInfo">
                <img src={['https://render-us.worldofwarcraft.com/character/',this.props.thumbnail].join('')} alt="character portrait"/>
                <h2>{this.props.name}</h2>
                </div>
                </header>
            )
        } else {
            return (
                <header className="App-header">
                  <img src={logo} className="App-logo" alt="logo" />
                  <h1 className="App-title">World of Warcraft Reputation Calculator</h1>
                </header>
            );
        }
    }
}

export default Header;

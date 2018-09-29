import React, { Component } from 'react';
import logo from '../logo.svg';
import { Link } from 'react-router-dom';

class Header extends Component {
    /*constructor(props) {
        super(props);
    }*/


    render() {
        return (
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">RepCalc</h1>
                <nav>
                <button><Link to='/'>Reputation Calculator</Link></button>
                <button><Link to='/blog'>Blog</Link></button>
                </nav>
            </header>
        );
    }
}

export default Header;

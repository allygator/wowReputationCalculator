import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import logo from '../logo.svg';
import '../header.css';

class Header extends Component {
    /*constructor(props) {
        super(props);
    }*/


    render() {
        return (
            <header className="App-header">
                <div className="siteInfo">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">RepCalc</h1>
                </div>
                <nav>
                    <Link to='/'><button>Reputation Calculator</button></Link>
                    <Link to='/blog'><button>Blog</button></Link>
                </nav>
            </header>
        );
    }
}

export default Header;

import React, { Component } from 'react';
import logo from '../logo.svg';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
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
                <Button><Link to='/'>Reputation Calculator</Link></Button>
                <Button><Link to='/blog'>Blog</Link></Button>
                </nav>
            </header>
        );
    }
}

export default Header;

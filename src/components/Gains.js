import React, { Component } from 'react';
//import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {getGains} from '../gainsobj.js';

class Gains extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    };

    render() {
        const rep = this.props.rep;
        if(getGains(rep)) {
            return getGains(rep);
        } else {
            return <p>I have no idea how to earn this rep, if you know let me know!</p>
        }
    }
}

export default Gains;

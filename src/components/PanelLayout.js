import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Rewards from './Rewards';
import {getGains} from '../gainsobj.js';

class PanelLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    };

    render() {
        const rep = this.props.rep;
        return (
            <Tabs>
                <TabList>
                    <Tab>Rewards</Tab>
                    <Tab>How to Earn</Tab>
                </TabList>
                <TabPanel>
                <Rewards rep={rep} />
                </TabPanel>
                <TabPanel>
                {getGains(rep)}
                </TabPanel>
            </Tabs>
        );
    }
}

export default PanelLayout;

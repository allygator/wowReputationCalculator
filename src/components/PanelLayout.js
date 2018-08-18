import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Rewards from './Rewards';
import Gains from './Gains';

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
                <Gains rep={rep} />
                </TabPanel>
            </Tabs>
        );
    }
}

export default PanelLayout;

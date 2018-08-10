import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import rewardsCont from '../rewardsobj';

class Rewards extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    };

    render() {
        const rep = this.props.rep;
        let tabTitles = [];
        let tabPanelComplete = [];
        if(rewardsCont[rep]) {
            let levels = Object.keys(rewardsCont[rep]); //Number of Rep levels that have rewards in them
            let items; // Number of items in a level
            for(var i = 0; i<levels.length;i++){
                let rewardsCompleted = [];
                tabTitles.push(<Tab key={levels[i]}>{levels[i]}</Tab>);
                items = Object.keys(rewardsCont[rep][levels[i]]);
                for(var j = 0;j<items.length;j++) {
                    var name = rewardsCont[rep][levels[i]][j].name;
                    if(rewardsCont[rep][levels[i]][j].id) {
                        rewardsCompleted.push(<a href={["//www.wowhead.com/item=",rewardsCont[rep][levels[i]][j].id].join('')} key={rewardsCont[rep][levels[i]][j].id}>{name}</a>);
                    } else {
                        let nameKey = name.replace(/ +/g, "");
                        rewardsCompleted.push(<p key={nameKey}>{name}</p>)
                    }
                    rewardsCompleted.push(<br key={i+j}/>);
                }
                tabPanelComplete.push(<TabPanel key={levels[i]}>{rewardsCompleted}</TabPanel>);
            }
            return (
                <Tabs>
                    <TabList>
                        <Tab>Rewards</Tab>
                    </TabList>
                    <TabPanel>
                        <Tabs>
                            <TabList>
                                {tabTitles}
                            </TabList>
                            {tabPanelComplete}
                        </Tabs>
                    </TabPanel>
                </Tabs>
            );
        } else {
            return (
                <Tabs>
                    <TabList>
                        <Tab>Rewards</Tab>
                    </TabList>
                    <TabPanel>
                        <p>No Rewards Exist! If this is an error, let me know!</p>
                    </TabPanel>
                </Tabs>
            )
        }
    }
}

export default Rewards;

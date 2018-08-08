import React, { Component } from 'react';
import rewardsCont from '../rewardsobj';

class Rewards extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        const rep = this.props.rep;
        let rewardsCompleted = [];
        if(rewardsCont[rep]) {
            let levels = Object.keys(rewardsCont[rep]); //Number of Rep levels that have rewards in them
            let items; // Number of items in a level
            //console.log("First level: ",rewardsCont[rep][levels[0]]);
            //console.log("Number of item: ",Object.keys(rewardsCont[rep][levels[0]]));
            for(var i = 0; i<levels.length;i++){
                //console.log("In the loop");
                rewardsCompleted.push(<h4 key={levels[i]}>{levels[i]}</h4>);
                //console.log(levels[i]);
                items = Object.keys(rewardsCont[rep][levels[i]]);
                //console.log(items);
                for(var j = 0;j<items.length;j++) {
                    var name = rewardsCont[rep][levels[i]][j].name;
                    if(rewardsCont[rep][levels[i]][j].id) {
                        rewardsCompleted.push(<a href={["//www.wowhead.com/item=",rewardsCont[rep][levels[i]][j].id].join('')} key={rewardsCont[rep][levels[i]][j].id}>{name}</a>," ");
                    } else {
                        let nameKey = name.replace(/ +/g, "");
                        rewardsCompleted.push(<p key={nameKey}>{name}</p>)
                    }
                }
                //console.log(rewardsCompleted)
            }
            return (<div className="rewards"><h3>Rewards</h3>{rewardsCompleted}</div>);
        } else {
            return (
            null
            )
        }
    }
}

export default Rewards;

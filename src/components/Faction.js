import React, { Component } from 'react';
//import rewardsCont from '../rewardsobj';
import RepData from './RepData';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import '../faction.css';
const bestFriends = [1273, 1275, 1276, 1277, 1278, 1279, 1280, 1281, 1282, 1283, 1975, 1358]; //IDs for NPCs that have "Friend" levels rather than reputations
const friendLevels = ["Stranger","Acquantaince", "Buddy", "Friend", "Good Friend", "Best Friend"];
const repTitles = ["Hated", "Hostile", "Unfriendly", "Neutral", "Friendly", "Honored", "Revered", "Exalted"]; // Reputation levels
//Rep 1204 should be in cata not mists


class Faction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHidden: true
        }
        this.repLevel = this.repLevel.bind(this);
        this.showHidden = this.showHidden.bind(this);
        this.showProgress = this.showProgress.bind(this);
    }

    repLevel(rep) {
        if(bestFriends.includes(rep.id)) {
            return friendLevels[rep.standing];
        } else {
            return repTitles[rep.standing];
        }
    }

    showHidden(e) {
        this.setState((prevState => ({
            isHidden: !prevState.isHidden
        })))
    }

    showProgress() {
        if(this.props.rep.max!==0) {
            return this.props.rep.value+'/'+this.props.rep.max;
        }
    }

    render() {
        let rep = this.props.rep;
        let isHidden = this.state.isHidden;
        return (
                <ExpansionPanel className=" repPanel" onChange={this.showHidden}>
                    <ExpansionPanelSummary className=" repName">
                        <h3>{rep.name}</h3>
                        <span className="status-carat"><p>{this.repLevel(rep)}</p>
                        <i className={`fas fa-caret-${isHidden ? "down" : "up"}`}></i></span>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className="repDetails">
                        {this.showProgress()}
                        <RepData rep={rep.id} />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            )
    }
}

export default Faction;

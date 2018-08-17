import React, { Component } from 'react';
//import rewardsCont from '../rewardsobj';
import Faction from './Faction';
const bestFriends = [1273, 1275, 1276, 1277, 1278, 1279, 1280, 1281, 1282, 1283, 1975, 1358]; //IDs for NPCs that have "Friend" levels rather than reputations
const friendLevels = ["Stranger","Acquantaince", "Buddy", "Friend", "Good Friend", "Best Friend"];
const repTitles = ["Hated", "Hostile", "Unfriendly", "Neutral", "Friendly", "Honored", "Revered", "Exalted"]; // Reputation levels
//Rep 1204 should be in cata not mists


class Expac extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHidden: true
        }
        this.repLevel = this.repLevel.bind(this);
        this.showHidden = this.showHidden.bind(this);
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

    render() {
        const reps = this.props.reps;
        const name = this.props.name;
        const cName = this.props.cName;
        const isHidden = this.state.isHidden;
        const totalMaxReps = reps.reduce(countMaxReps,0);
        const hideProgress = this.props.hideProgress;
        const progress=<progress value={totalMaxReps} max={reps.length}></progress>;
        if(reps.length === 0) {
            return (
                <div className={[cName,"expac "].join(' ')}>
                <h2 onClick={this.showHidden}>{name[0].toUpperCase() + name.slice(1)} <span className="progress-carat">{hideProgress ? null : progress}
                    <i className={`fas fa-caret-${isHidden ? "down" : "up"}`}></i></span>
                </h2>
                <div className={`child ${isHidden ? "hidden" : ""}`}>
                    <p> You are Exalted with every faction in {(name==="Alliance")||(name==="Horde") ? ["The ",name].join(' ') : name}! </p>
                </div>
                </div>
            )
        } else {
            return (
            <div className={[cName,"expac "].join(' ')}>
            <h2 onClick={this.showHidden}>{name[0].toUpperCase() + name.slice(1)} <span className="progress-carat">{hideProgress ? null : progress}
                <i className={`fas fa-caret-${isHidden ? "down" : "up"}`}></i></span>
            </h2>
            <div className={`child ${isHidden ? "hidden" : ""}`}>
            {reps.map((rep) => (
                <Faction rep={rep} key={rep.name} />
            ))}
            </div>
            </div>
            )
        }
    }
}

function countMaxReps(accumulator,currentValue) {
    if(currentValue.max === 0 && (currentValue.standing === 7 || currentValue.standing === 5))
        return accumulator + 1;
    else
        return accumulator;
};


export default Expac;

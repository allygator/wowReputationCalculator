import React, { Component } from 'react';
import {blizzardKey} from '../API_Keys';
import RepLayout from './Reputations';
const bestFriends = [1273, 1275, 1276, 1277, 1278, 1279, 1280, 1281, 1282, 1283, 1975, 1358]; //IDs for NPCs that have "Friend" levels rather than reputations
const friendLevels = ["Stranger","Acquantaince", "Buddy", "Friend", "Good Friend", "Best Friend"];
const repTitles = ["Hated", "Hostile", "Unfriendly", "Neutral", "Friendly", "Honored", "Revered", "Exalted"]; // Reputation levels
const alli = [47,54,69,72,930,1134];
const horde = [];

class Reputation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            reps: [],
            max: false,
        }
        this.isMaxRep = this.isMaxRep.bind(this);
        this.isCompletedRep = this.isCompletedRep.bind(this);
        this.repLevel = this.repLevel.bind(this);
        //this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
    }

    componentDidMount = () => {
        this.getReputations();
    }

    componentDidUpdate(prevProps) {
        if(prevProps.name !== this.props.name || prevProps.realm !== this.props.realm || prevProps.isChecked !== this.props.isChecked) {
            this.getReputations();
        }
    }

    getReputations = () => {
        if(this.props.realm && this.props.name) {
            fetch('https://us.api.battle.net/wow/character/' + this.props.realm + '/' + this.props.name + '?fields=reputation&locale=en_US' + blizzardKey)
            .then(response => response.json())
            .then((repList) => {
                this.setState({
                    isLoaded: true,
                });
                if(this.props.isChecked) {
                    //console.log("Is Checked!")
                    repList.reputation.sort((a,b) => a.id-b.id);
                    console.log(repList);
                    this.setState({reps:repList.reputation.filter(this.isCompletedRep)});
                } else {
                    console.log(repList)
                    repList.reputation.sort((a,b) => a.id-b.id);
                    console.log(repList);
                    this.setState({
                        reps: repList.reputation
                    })
                }
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error: error.message
                });
            }
            )
        } else {
            this.setState({error: "Please input a realm and character name"});
        }
    }

    isMaxRep(rep) {
        if (bestFriends.includes(rep.id) && rep.standing === 5)
            this.setState({max: true});
        if (rep.standing === 7)
            this.setState({max: true});
    }

    isCompletedRep(rep) {
        if(bestFriends.includes(rep.id) && rep.standing === 5) {
          return false;
        } else if (rep.standing === 7) {
          return false;
        } else {
          return true;
        }
    }

    repLevel(rep) {
        if(bestFriends.includes(rep.id)) {
            return friendLevels[rep.standing];
        } else {
            return repTitles[rep.standing];
        }
    }

    render() {
        const { error, isLoaded, reps } = this.state;
        if (error) {
          return <div>Error: {error}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
            return (
                reps.map((rep) => (
                        <div key={rep.name} className="rep">
                        <h3>{rep.name}</h3>
                        <p>{this.repLevel(rep)}</p>
                        <p>{rep.value}/{rep.max}</p>
                        </div>
                )
            )
            );
        }
    }
}

export default Reputation;

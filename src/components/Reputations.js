import React, { Component } from 'react';
import {blizzardKey} from '../API_Keys';
var bestFriends = [1273, 1275, 1276, 1277, 1278, 1279, 1280, 1281, 1282, 1283, 1975, 1358]; //IDs for NPCs that have "Friend" levels rather than reputations
var friendLevels = ["Stranger","Acquantaince", "Buddy", "Friend", "Good Friend", "Best Friend"];
var repTitles = ["Hated", "Hostile", "Unfriendly", "Neutral", "Friendly", "Honored", "Revered", "Exalted"]; // Reputation levels

class Reputation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            reps: [],
            max: false,
            //selectedRealm: "",
            //selectedOption: null
        };
        //this.realmSelection = this.realmSelection.bind(this);
        this.isMaxRep = this.isMaxRep.bind(this);
        this.resetRep = this.resetRep.bind(this);
        this.isCompletedRep = this.isCompletedRep.bind(this);
    }

    componentDidMount() {
        fetch('https://us.api.battle.net/wow/character/' + this.props.realm + '/' + this.props.name + '?fields=reputation&locale=en_US' + blizzardKey)
            .then(response => response.json())
            .then((repList) => {
                this.setState({
                    isLoaded: true,
                    reps: repList.reputation
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
            )
    }

    isMaxRep(rep) {
        if (bestFriends.includes(rep.id) && rep.standing === 5)
            this.setState({max: true});
        if (rep.standing === 7)
            this.setState({max: true});
    }

    resetRep() {
        this.setState({max: false});
    }

    isCompletedRep(rep) {
        return false;
      if(bestFriends.includes(rep.id) && rep.standing === 5) {
          console.log("Completed Reps");
        return true; // I dont think false is a valid return for filter?
      } else if (rep.standing === 7) {
        return false;
      } else {
        return true;
    }
    }

    render() {
        const { error, isLoaded, reps } = this.state;
        //console.log(this.props.name);
        {reps = reps.filter(rep => bestFriends.includes(rep.id) && rep.standing === 5)}
        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
            return (
                reps.map((rep) => (
                        //console.log(rep);
                        //{this.isMaxRep(rep)}
                        <div key={rep.name}>
                        <h3>{rep.name}</h3>
                        <p>{repTitles[rep.standing]}</p>
                        <p>{rep.value}/{rep.max}</p>
                        </div>
                        //{this.resetRep()}
                )
            )
            );
            // realms.map(
            //     function(realm) {
            //       return {
            //         value: realm.name,
            //         label: realm.name
            //       };
            //     }
            //   )
        }
    }
}

export default Reputation;

import React, { Component } from 'react';
import {blizzardKey} from '../API_Keys';
import RepLayout from './RepLayout';
const bestFriends = [1273, 1275, 1276, 1277, 1278, 1279, 1280, 1281, 1282, 1283, 1975, 1358]; //IDs for NPCs that have "Friend" levels rather than reputations

class Reputation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            reps: [],
            max: false,
        }
        this.isCompletedRep = this.isCompletedRep.bind(this);
        //this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
    }

    componentDidMount() {
        this.getReputations();
    }

    componentDidUpdate(prevProps) {
        if(prevProps.name !== this.props.name || prevProps.realm !== this.props.realm || prevProps.isChecked !== this.props.isChecked) {
            this.getReputations();
        }
    }

    getReputations = () => {
        this.setState({reps:[], error:null});
        //console.log(this.props.name + ":Get Reputations");
        if(this.props.realm && this.props.name) {
            fetch('https://us.api.battle.net/wow/character/' + this.props.realm + '/' + this.props.name + '?fields=reputation&locale=en_US' + blizzardKey)
            .then(function(response) {
                if(response.ok) {
                    return response.json()
                } else
                    throw new Error(response.statusText)
            })
            .then((repList) => {
                this.setState({
                    isLoaded: true,
                });
                this.setState({faction:repList.faction});
                if(this.props.isChecked) {
                    repList.reputation.sort((a,b) => a.id-b.id);
                    this.setState({reps:repList.reputation.filter(this.isCompletedRep)});
                } else {
                    repList.reputation.sort((a,b) => a.id-b.id);
                    this.setState({reps: repList.reputation})
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

    isCompletedRep(rep) {
        if(bestFriends.includes(rep.id) && rep.standing === 5) {
          return false;
        } else if (rep.standing === 7) {
          return false;
        } else {
          return true;
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
                <div className="reputations" key="reputationPanel">
                {reps.length > 1 && <RepLayout reps={reps} isHorde={Boolean(this.state.faction)} hideProgress={this.props.isChecked}/>}
                </div>
                /*reps.map((rep) => (
                        <div key={rep.name} className="rep">
                        <h3>{rep.name}</h3>
                        <p>{this.repLevel(rep)}</p>
                        <p>{rep.value}/{rep.max}</p>
                        </div>
                )
            )*/
            )
        }
    }
}

export default Reputation;

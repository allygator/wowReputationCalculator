import React, { Component } from 'react';
import {blizzardKey} from '../API_Keys';

class Reputation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            reps: []
            //selectedRealm: "",
            //selectedOption: null
        };
        //this.realmSelection = this.realmSelection.bind(this);
    }

    componentDidMount() {
        fetch('https://us.api.battle.net/wow/character/' + this.realm + '/' + this.name + '?fields=reputation&locale=en_US' + blizzardKey)
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

    render() {
        const { error, isLoaded, reps } = this.state;
        console.log();
        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
            return (
                reps.map((rep) => (
                  <h3>{rep.name}</h3>
                ))
            );
        }
    }
}

export default Reputation;

import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import RealmsList from './Realms';
import Reputation from './Reputations';

import {blizzardKey} from '../API_Keys';

class App extends Component {
    constructor(props) {
        super(props);
        this.setRealmState = this.setRealmState.bind(this);
        this.showReputations = this.showReputations.bind(this);
        this.state = {
            isChecked: false,
            submit: false,
            error: null,
            isLoaded: false,
            reps: [],
            max: false
        }
    }

    setRealmState(a) {
        console.log(a);
        this.setState({realm: a})
    }

    getReputations() {
        fetch('https://us.api.battle.net/wow/character/' + this.state.realm + '/' + this.state.name + '?fields=reputation&locale=en_US' + blizzardKey)
            .then(response => response.json())
            .then((repList) => {
                this.setState({
                    isLoaded: true,
                });
                if(this.state.isChecked) {
                    console.log("Is Checked!")
                    this.setState({reps:repList.reputation.filter(this.isCompletedRep)});
                } else {
                    console.log("Not Checked!")
                    this.setState({
                        reps: repList.reputation
                    })
                }
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
            )
    }

    showReputations(e) {
        this.setState({submittedName:this.state.name, submittedRealm: this.state.realm, submittedisChecked: this.state.isChecked});
    }

  render() {
      const reputationsHidden = this.state.reputationsHidden;
      let repPanel;
      if(this.state.submittedName && this.state.submittedRealm ) {
          repPanel = <Reputation name={this.state.submittedName} realm={this.state.submittedRealm} isChecked={this.state.submittedisChecked}/>;
      }
      return (
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Welcome to RepCalc</h1>
            </header>
            <p className="App-intro">
              Select your realm from the dropdown and type your character name, then submit.
            </p>
            <div className="user-input-box">
            <RealmsList realmSelection={this.setRealmState} /*specificRealm="Quel'Dorei"*//>
            <div id="name">
                Character Name:
                <input type="text" id="characterName" name="Character Name" onChange={e=>this.setState({name:e.target.value})}/>
            </div>
            Hide Completed Reputations <input type="checkbox" id="showCompleted" name="Hide Completed Reputations" label="Hide Completed Reputations" onChange={e=>this.setState({isChecked:e.target.checked}, console.log(e.target.checked)) } />
            <input type="button" value="Submit" onClick={this.showReputations}/*<Reputations name:this.name, realm:this.realm />*/ id="submitButton" />
          </div>
          {repPanel}
          </div>
      );
  }


}

export default App;

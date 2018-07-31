import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import RealmsList from './Realms';
//import Reputation from './Reputations';

//import {blizzardKey} from '../API_Keys';

class App extends Component {
    constructor(props) {
        super(props);
        this.setRealmState = this.setRealmState.bind(this);
        this.makeReputationRequest = this.makeReputationRequest.bind(this);
    }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <RealmsList realmSelection={this.setRealmState} /*specificRealm="Quel'Dorei"*//>
        <div id="name">
            Character Name:
            <input type="text" id="characterName" name="Character Name" onChange={e=>this.setState({name:e.target.value})}/>
        </div>
        <input type="button" value="Submit" onClick={() => this.makeReputationRequest(this.state.realm, this.state.name)}/*<Reputations name:this.name, realm:this.realm />*/ id="submitButton" />
      </div>
    );
  }

  setRealmState(a) {
      console.log(a);
      this.setState({realm: a})
  }


  makeReputationRequest(realmName,characterName) {
      console.log(realmName + " " + characterName);
      //<Reputation realm="realmName" name="characterName" />
  }
}

export default App;

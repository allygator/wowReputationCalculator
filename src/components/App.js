import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import RealmsList from './Realms';
import Reputation from './Reputations';

//import {blizzardKey} from '../API_Keys';

class App extends Component {
    constructor(props) {
        super(props);
        this.setRealmState = this.setRealmState.bind(this);
        this.showReputations = this.showReputations.bind(this);
        this.state = {
            reputationsHidden: false
        }
    }

    setRealmState(a) {
        console.log(a);
        this.setState({realm: a})
    }


    showReputations(e) {
        this.setState({reputationsHidden: true});
        //return <Reputation realm="realmName" name="characterName" />;
    }

  render() {
      const reputationsHidden = this.state.reputationsHidden;
      let repPanel;
      if(reputationsHidden) {
          repPanel = <Reputation name={this.state.name} realm={this.state.realm} />;
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
            <input type="button" value="Submit" onClick={this.showReputations}/*<Reputations name:this.name, realm:this.realm />*/ id="submitButton" />
          </div>
          {repPanel}
          </div>
      );
  }


}

export default App;

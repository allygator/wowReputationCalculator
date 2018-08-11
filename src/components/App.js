import React, { Component } from 'react';
import logo from '../logo.svg';
//import Select from 'react-select';
import '../App.css';
import RealmsList from './Realms';
import Reputation from './Reputations';
//Multi Select Code: Reputation Types to Hide: <Select options={this.state.options} isMulti onChange={e=>console.log(e)}/>

class App extends Component {
    constructor(props) {
        super(props);
        this.setRealmState = this.setRealmState.bind(this);
        this.showReputations = this.showReputations.bind(this);
        this.state = {
            isSubmitted: false,
            isChecked: false
        }
    }

    setRealmState(a) {
        this.setState({realm: a})
    }

    showReputations(e) {
        //console.log("Submitted");
        this.setState({submittedName:this.state.name, submittedRealm: this.state.realm, submittedisChecked: this.state.isChecked, isSubmitted:true});
    }

    render() {
        return (
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Welcome to RepCalc</h1>
            </header>
            <div className={`user-input-wrapper ${this.state.isSubmitted ? "" : "popout"}`}>
            <p className="App-intro">
              Select your realm from the dropdown and type your character name, then submit.
            </p>
            <div className="user-input-box">
                <div id="selectionBoxes">
                    <RealmsList realmSelection={this.setRealmState} /*specificRealm="Quel'Dorei"*//>
                    <div id="name">
                        Character Name:
                        <input type="text" id="characterName" name="Character Name" onChange={e=>this.setState({name:e.target.value})}/>
                    </div>
                </div>
                <div id="hiddenTypes">
                    Hide Completed Reputations:
                    <input type="checkbox" id="showCompleted" name="Hide Completed Reputations" label="Hide Completed Reputations" onChange={e=>this.setState({isChecked:e.target.checked})} />
                </div>
                <input type="button" value="Submit" onClick={this.showReputations}/*<Reputations name:this.name, realm:this.realm />*/ id="submitButton" />
          </div>
          </div>
          {this.state.submittedName && this.state.submittedRealm && <Reputation name={this.state.submittedName} realm={this.state.submittedRealm} isChecked={this.state.submittedisChecked}/>}
          </div>
    );}


}

export default App;

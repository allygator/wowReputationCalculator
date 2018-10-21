import React, { Component } from 'react';
//import Select from 'react-select';
import '../App.css';
import RealmsList from './Realms';
import Reputation from './Reputations';
//Multi Select Code: Reputation Types to Hide: <Select options={this.state.options} isMulti onChange={e=>console.log(e)}/>

class Calc extends Component {
    constructor(props) {
        super(props);
        this.setRealmState = this.setRealmState.bind(this);
        this.setHistory = this.setHistory.bind(this);
        this.setRegionState = this.setRegionState.bind(this);
        this.showReputations = this.showReputations.bind(this);
        this.setThumbnail = this.setThumbnail.bind(this);
        this.setName = this.setName.bind(this);
        this.state = {
            isSubmitted: false,
            isChecked: false,
            thumbnail: "",
            formattedName: "",
            submittedRegion: "",
            submittedRealm: "",
            submittedName: ""
        }
    }

    componentDidMount() {
        if(this.props.match.params.name) {
            this.setState({submittedName:this.props.match.params.name, submittedRealm:this.props.match.params.realm, submittedRegion:this.props.match.params.region, submittedisChecked:this.state.isChecked, isSubmitted:true});
        }
    }

    setHistory(a) {
        this.props.history.push(a);
    }

    setRealmState(a) {
        this.setState({realm: a});
    }

    setRegionState(b) {
        this.setState({region: b});
    }

    setThumbnail(url) {
        this.setState({thumbnail:url});
    }

    setName(name) {
        this.setState({formattedName:name});
    }

    showReputations(e) {
        //console.log("Submitted");
        this.setState({submittedName:this.state.name, submittedRealm:this.state.realm, submittedRegion:this.state.region, submittedisChecked:this.state.isChecked, isSubmitted:true});
        this.setHistory('/'+this.state.region+'/'+this.state.realm+'/'+this.state.name);
    }

    render() {
        return (
          <div className="calc">
            <div className={`user-input-wrapper ${this.state.isSubmitted ? "" : "popout"}`}>
                <p className="App-intro">
                  Select your realm from the dropdown and type your character name, then submit.
                </p>
                <div className="user-input-box">
                    <div id="selectionBoxes">
                        <RealmsList realmSelection={this.setRealmState} regionSelection={this.setRegionState} history={this.setHistory} /*specificRealm="Quel'Dorei"*//>
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
          {this.state.submittedName && this.state.submittedRealm && <Reputation name={this.state.submittedName} realm={this.state.submittedRealm} region={this.state.submittedRegion} isChecked={this.state.submittedisChecked} setThumbnail={this.setThumbnail} setName={this.setName}/>}
          </div>
    );}


}

export default Calc;

import React, { Component } from 'react';
import Expac from './Expac';
const bestFriends = [1273, 1275, 1276, 1277, 1278, 1279, 1280, 1281, 1282, 1283, 1975, 1358]; //IDs for NPCs that have "Friend" levels rather than reputations
const friendLevels = ["Stranger","Acquantaince", "Buddy", "Friend", "Good Friend", "Best Friend"];
const repTitles = ["Hated", "Hostile", "Unfriendly", "Neutral", "Friendly", "Honored", "Revered", "Exalted"]; // Reputation levels
const alli = [47, 54, 69, 72, 930, 1134];
const horde = [68, 76, 81, 530, 911, 1133];

class RepLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            max: false,
            vanilla: [],
            bc: [],
            wrath: [],
            cata: [],
            mop: [],
            wod: [],
            legion: [],
            bfa: [],
            alliance: [],
            horde: [],
            guild: []
        };
        //this.isMaxRep = this.isMaxRep.bind(this);
        this.isCompletedRep = this.isCompletedRep.bind(this);
        this.repLevel = this.repLevel.bind(this);
        this.findExpac = this.findExpac.bind(this);
    }

    componentDidMount() {
        this.findExpac(this.props.reps);
    }

    componentDidUpdate(prevProps) {
        if(prevProps.reps !== this.props.reps || prevProps.hideProgress !== this.props.hideProgress) {
            this.findExpac(this.props.reps);
        }
    }

    /*isMaxRep(rep) {
        if (bestFriends.includes(rep.id) && rep.standing === 5)
            this.setState({max: true});
        if (rep.standing === 7)
            this.setState({max: true});
    }*/

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

    findExpac(reps) {
        /*  Vanilla: 21-910
            BC: 930-1038 except 1037
            Wrath: 1050-1126
            Cata: 1134-1204 except 1168 (guild)
            Mop: 1269-1435
            Wod: 1445-1731 except 1691 (Brawlers Guild Season 2)
            Legion: 1828-2045,2165,2170 except 2011 (Brawlers Guild)
            Bfa: 2103-2159 except 2135
        */
        for(let rep of reps) {
            var tempRep;
            if(rep.id === 469 || rep.id === 1733 || rep.id === 67 || rep.id === 1691 || rep.id === 2011) {
                //This filters out faction "containers" like Alliance and Horde which
                // seem to only serve the purpose of holding the other factions
                // Also a follower, and the Brawlers Guild
            } else if(alli.includes(rep.id)) { // Alliance reps
                tempRep = this.state.alliance;
                tempRep.push(rep);
                this.setState({alliance: tempRep});
            } else if (horde.includes(rep.id)) { // Horde Reps
                tempRep = this.state.horde;
                tempRep.push(rep);
                this.setState({horde: tempRep});
            } else if (rep.id === 1168) { // Guild Rep
                this.setState({guild: rep})
            } else if (rep.id < 929) { // Vanilla Reps
                tempRep = this.state.vanilla;
                tempRep.push(rep);
                this.setState({vanilla: tempRep});
            } else if (rep.id < 1036 || rep.id === 1038) { // BC Reps
                tempRep = this.state.bc;
                tempRep.push(rep);
                this.setState({bc: tempRep});
            } else if (rep.id <= 1126) { // Wrath Reps
                tempRep = this.state.wrath;
                tempRep.push(rep);
                this.setState({wrath: tempRep});
            } else if (rep.id <= 1204) { // Cata Reps
                tempRep = this.state.cata;
                tempRep.push(rep);
                this.setState({cata: tempRep});
            } else if (rep.id <= 1435) { // Mop Reps
                tempRep = this.state.mop;
                tempRep.push(rep);
                this.setState({mop: tempRep});
            } else if ((rep.id < 1731 && rep.id !== 1691) || rep.id ===  1848) { // Wod Reps
                tempRep = this.state.wod;
                tempRep.push(rep);
                this.setState({wod: tempRep});
            } else if (rep.id < 2045 || rep.id === 2165 || rep.id === 2170) { // Legion Reps
                tempRep = this.state.legion;
                tempRep.push(rep);
                this.setState({legion: tempRep});
            } else if (rep.id > 2103 && rep.id !== 2135) { // Bfa Reps
                tempRep = this.state.bfa;
                tempRep.push(rep);
                this.setState({bfa: tempRep});
            }
        }
    }

    render() {
        const {vanilla,bc,wrath,cata,mop,wod,legion,alliance,horde} = this.state;
        return [
            (!this.props.isHorde && <Expac name="Alliance" cName="alliance" reps={alliance} key={"one"} hideProgress={this.props.hideProgress} />),
            (this.props.isHorde && <Expac name="Horde" cName="horde" reps={horde} key={"two"} hideProgress={this.props.hideProgress} />),
            <Expac name="Vanilla" cName="vanilla" reps={vanilla} key={"three"} hideProgress={this.props.hideProgress} />,
            <Expac name="Burning Crusade" cName="bc" reps={bc} key={"four"} hideProgress={this.props.hideProgress} />,
            <Expac name="Wrath of the Lich King" cName="wrath" reps={wrath} key={"five"} hideProgress={this.props.hideProgress} />,
            <Expac name="Cataclysm" cName="cata" reps={cata} key={"six"} hideProgress={this.props.hideProgress} />,
            <Expac name="Mists of Pandaria" cName="mop" reps={mop} key={"seven"} hideProgress={this.props.hideProgress} />,
            <Expac name="Warlords of Draenor" cName="wod" reps={wod} key={"eight"} hideProgress={this.props.hideProgress} />,
            <Expac name="Legion" cName="legion" reps={legion}  key={"nine"} hideProgress={this.props.hideProgress} />
        ]
    }
};

export default RepLayout;

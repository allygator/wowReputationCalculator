import React, { Component } from 'react';
import Expac from './Expac';
const bestFriends = [1273, 1275, 1276, 1277, 1278, 1279, 1280, 1281, 1282, 1283, 1975, 1358]; //IDs for NPCs that have "Friend" levels rather than reputations
const friendLevels = ["Stranger","Acquantaince", "Buddy", "Friend", "Good Friend", "Best Friend"];
const repTitles = ["Hated", "Hostile", "Unfriendly", "Neutral", "Friendly", "Honored", "Revered", "Exalted"]; // Reputation levels
const alli = [47, 54, 69, 72, 930, 1134];
const noAlli = [510, 947, 1052, 1067, 1172, 1375, 1388, 1445, 1681, 1708, 1848];
const horde = [68, 76, 81, 530, 911, 1133];
const noHorde = [509, 946, 1126, 1376, 1387, 1682, 1710, 1731, 1847];
const nobody = [67, 469, 1374, 1690, 1691, 1733, 2010, 2011];

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
            if(nobody.includes(rep.id)) {
                //This filters out faction "containers" like Alliance and Horde which
                // seem to only serve the purpose of holding the other factions
                // Also a follower, and the Brawlers Guild
            } else if((!this.props.isHorde && noAlli.includes(rep.id)) || (this.props.isHorde && noHorde.includes(rep.id))) {
                //This filters out reputations only available to the other faction
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
            } else if ((rep.id <= 1850 && rep.id !== 1691 && rep.id !== 1828) || rep.id ===  1848 || rep.id === 1847) { // Wod Reps
                tempRep = this.state.wod;
                tempRep.push(rep);
                this.setState({wod: tempRep});
            } else if (rep.id < 2045 || rep.id === 2165 || rep.id === 2170) { // Legion Reps
                tempRep = this.state.legion;
                tempRep.push(rep);
                this.setState({legion: tempRep});
            } else if (rep.id >= 2103 && rep.id !== 2135) { // Bfa Reps
                tempRep = this.state.bfa;
                tempRep.push(rep);
                this.setState({bfa: tempRep});
            }
        }
    }

    render() {
        const {vanilla,bc,wrath,cata,mop,wod,legion,bfa,alliance,horde} = this.state;
        return [
            (!this.props.isHorde && <Expac name="Alliance" cName="alliance" reps={alliance} key={"Alliance"} hideProgress={this.props.hideProgress} />),
            (this.props.isHorde && <Expac name="Horde" cName="horde" reps={horde} key={"Horde"} hideProgress={this.props.hideProgress} />),
            <Expac name="Vanilla" cName="vanilla" reps={vanilla} key={"vanilla"} hideProgress={this.props.hideProgress} />,
            <Expac name="Burning Crusade" cName="bc" reps={bc} key={"bc"} hideProgress={this.props.hideProgress} />,
            <Expac name="Wrath of the Lich King" cName="wrath" reps={wrath} key={"wrath"} hideProgress={this.props.hideProgress} />,
            <Expac name="Cataclysm" cName="cata" reps={cata} key={"cata"} hideProgress={this.props.hideProgress} />,
            <Expac name="Mists of Pandaria" cName="mop" reps={mop} key={"mop"} hideProgress={this.props.hideProgress} />,
            <Expac name="Warlords of Draenor" cName="wod" reps={wod} key={"wod"} hideProgress={this.props.hideProgress} />,
            <Expac name="Legion" cName="legion" reps={legion}  key={"legion"} hideProgress={this.props.hideProgress} />,
            <Expac name="Battle for Azeroth" cName="bfa" reps={bfa}  key={"bfa"} hideProgress={this.props.hideProgress} />
        ]
    }
};

export default RepLayout;

import React, { useState } from "react";
import Faction from "./Faction";
import LinearProgress from "@material-ui/core/LinearProgress";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

function Expac(props) {
  const [hidden, setHidden] = useState(true);
  let { name, cName, hideProgress } = props;
  const totalMaxReps = props.reps.reduce(countMaxReps, 0);
  function showHidden() {
    setHidden(!hidden);
  }

  function countMaxReps(accumulator, currentValue) {
    if (
      currentValue.standing.max === 0 &&
      (currentValue.standing.tier === 7 || currentValue.standing.tier === 5)
    )
      return accumulator + 1;
    else return accumulator;
  }

  function normalise(val, max) {
    return (val / max) * 100;
  }
  return (
    <ExpansionPanel
      className={[cName, "expacPanel"].join(" ")}
      onChange={showHidden}
    >
      <ExpansionPanelSummary
        className="expacName"
        expandIcon={<ExpandMoreIcon />}
      >
        <h2>{name[0].toUpperCase() + name.slice(1)}</h2>
        <span className={hideProgress ? "carat" : "progress-carat"}>
          <LinearProgress
            variant="determinate"
            value={normalise(totalMaxReps, props.reps.length)}
            className="expacProgress"
          />
        </span>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className="expacDetails">
        {props.reps.map((rep) => (
          <Faction rep={rep} key={rep.faction.name} />
        ))}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

// class Expac extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isHidden: true,
//     };
//     this.repLevel = this.repLevel.bind(this);
//     this.showHidden = this.showHidden.bind(this);
//     this.normalise = this.normalise.bind(this);
//   }

//   repLevel(rep) {
//     if (bestFriends.includes(rep.faction.id)) {
//       return friendLevels[rep.standing];
//     } else {
//       return repTitles[rep.standing];
//     }
//   }

//   showHidden(e) {
//     this.setState((prevState) => ({
//       isHidden: !prevState.isHidden,
//     }));
//   }

//   normalise(val, max) {
//     return (val / max) * 100;
//   }

//   render() {
//     const reps = this.props.reps;
//     const name = this.props.name;
//     const cName = this.props.cName;
//     const isHidden = this.state.isHidden;
//     const totalMaxReps = reps.reduce(countMaxReps, 0);
//     if (reps.length === 0) {
//       return (
//         <ExpansionPanel
//           className={[cName, "expacPanel completed"].join(" ")}
//           onChange={this.showHidden}
//         >
//           <ExpansionPanelSummary
//             className="expacName"
//             expandIcon={<ExpandMoreIcon />}
//           >
//             <h2>{name[0].toUpperCase() + name.slice(1)}</h2>
//             <span className="carat">
//               <i className={`fas fa-caret-${isHidden ? "down" : "up"}`}></i>
//             </span>
//           </ExpansionPanelSummary>
//           <ExpansionPanelDetails className="expacDetails">
//             <p>
//               {" "}
//               You are Exalted with every faction in{" "}
//               {name === "Alliance" || name === "Horde"
//                 ? ["The ", name].join(" ")
//                 : name}
//               !{" "}
//             </p>
//           </ExpansionPanelDetails>
//         </ExpansionPanel>
//       );
//     } else {
//       return (
//         <ExpansionPanel
//           className={[cName, "expacPanel "].join(" ")}
//           onChange={this.showHidden}
//         >
//           <ExpansionPanelSummary
//             className="expacName"
//             expandIcon={<ExpandMoreIcon />}
//           >
//             <h2>{name[0].toUpperCase() + name.slice(1)}</h2>
//             <span
//               className={this.props.hideProgress ? "carat" : "progress-carat"}
//             >
//               <LinearProgress
//                 variant="determinate"
//                 value={this.normalise(totalMaxReps, reps.length)}
//                 className="expacProgress"
//               />
//             </span>
//           </ExpansionPanelSummary>
//           <ExpansionPanelDetails className="expacDetails">
//             {reps.map((rep) => (
//               <Faction rep={rep} key={rep.faction.name} />
//             ))}
//           </ExpansionPanelDetails>
//         </ExpansionPanel>
//       );
//     }
//   }
// }

// function countMaxReps(accumulator, currentValue) {
//   if (
//     currentValue.standing.max === 0 &&
//     (currentValue.standing.tier === 7 || currentValue.standing.tier === 5)
//   )
//     return accumulator + 1;
//   else return accumulator;
// }

export default Expac;

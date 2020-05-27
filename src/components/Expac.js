import React, { useState, useContext } from "react";
import Faction from "./Faction";
import LinearProgress from "@material-ui/core/LinearProgress";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";

import UserContext from "../context/UserContext";

function Expac(props) {
  let user = useContext(UserContext);
  const [hidden, setHidden] = useState(true);
  let { name, cName } = props;
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
    <ExpansionPanel className={clsx("expacPanel", cName)} onChange={showHidden}>
      <ExpansionPanelSummary
        className="expacName"
        expandIcon={<ExpandMoreIcon />}
      >
        <h2>{name[0].toUpperCase() + name.slice(1)}</h2>
        <span className={user.hideCompleted ? "carat" : "progress-carat"}>
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

export default Expac;

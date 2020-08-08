import React, { useState, useContext } from "react";
import Faction from "./Faction";
import LinearProgress from "@material-ui/core/LinearProgress";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";

import UserContext from "../../context/UserContext";

function Expac(props) {
  let user = useContext(UserContext);
  let reps = props.reps;
  if (user.hideCompleted) {
    reps = reps.filter(function (rep) {
      return rep.standing.max !== 0 || rep.paragon;
    });
  }
  const [hidden, setHidden] = useState(true);
  let { name, cName } = props;
  const totalMaxReps = reps.reduce(countMaxReps, 0);
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
    <Accordion className={clsx("expacPanel", cName)} onChange={showHidden}>
      <AccordionSummary className="expacName" expandIcon={<ExpandMoreIcon />}>
        <h2>{name[0].toUpperCase() + name.slice(1)}</h2>
        <span className={user.hideCompleted ? "carat" : "progress-carat"}>
          <LinearProgress
            variant="determinate"
            value={normalise(totalMaxReps, reps.length)}
            className="expacProgress"
          />
        </span>
        {user.hideCompleted && <p>{reps.length - totalMaxReps} Remaining</p>}
      </AccordionSummary>
      <AccordionDetails className="expacDetails">
        {reps.length === 0 ? (
          <p>
            You have all factions at max in this expansion. Congratulations!
          </p>
        ) : (
          ""
        )}
        {reps.map((rep, index, arr) => {
          return <Faction rep={rep} key={rep.faction.name} />;
        })}
      </AccordionDetails>
    </Accordion>
  );
}

export default Expac;

import React, { useState } from "react";
import RepData from "./RepData";
import RepProgress from "./RepProgress";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

function Faction(props) {
  let rep = props.rep;
  const [hidden, setHidden] = useState(true);
  function showHidden() {
    setHidden(!hidden);
  }
  return (
    <ExpansionPanel className="repPanel" onChange={showHidden}>
      <ExpansionPanelSummary
        className="repName"
        expandIcon={<ExpandMoreIcon />}
      >
        <h3>{rep.faction.name}</h3>

        <span className="status-carat">
          <RepProgress rep={rep} />
          {rep.paragon ? (
            <p>
              Paragon {rep.paragon.value}/{rep.paragon.max}
            </p>
          ) : (
            <p>{rep.standing.name}</p>
          )}
        </span>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className="repDetails">
        {rep.standing.max > 0
          ? rep.standing.value + "/" + rep.standing.max
          : ""}
        <RepData rep={rep.faction.id} />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}
export default Faction;

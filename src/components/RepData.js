import React, { useState } from "react";
import rewardsCont from "../rewardsobj";
import Rewards from "./Rewards";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

function RepData(props) {
  const rep = props.rep;
  const [value, setVal] = useState(0);
  function handleChange(event, value) {
    setVal(value);
  }
  return (
    <div id="detailsPanel">
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
      >
        {rewardsCont[rep] && <Tab label="Rewards" />}
      </Tabs>
      {value === 0 && rewardsCont[rep] && <Rewards rep={rep}></Rewards>}
    </div>
  );
}

export default RepData;

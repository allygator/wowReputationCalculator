import React, { useState } from "react";
import rewardsContainer from "../../rewardsobj";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

function Rewards(props) {
  const [value, setValue] = useState(0);

  let rep = props.rep;
  let levels = Object.keys(rewardsContainer[rep]);
  levels = levels.map(function (level, index) {
    return <Tab label={level} key={index} />;
  });
  let rewardsCompleted = [];
  let tabPanelComplete = [];
  let items;
  for (var i = 0; i < levels.length; i++) {
    let level = levels[i].props.label;
    items = rewardsContainer[rep][level];
    for (var j = 0; j < items.length; j++) {
      let item = items[j];
      if (item.id) {
        rewardsCompleted.push(
          <p key={item.id}>
            <a href={["//www.wowhead.com/item=", item.id].join("")}>
              {item.name}
            </a>
          </p>
        );
      } else {
        let nameKey = item.name.replace(/ +/g, "");
        rewardsCompleted.push(<p key={nameKey}>{item.name}</p>);
      }
    }
    tabPanelComplete.push(
      <div key={level}>
        {value === i && <TabContainer>{rewardsCompleted}</TabContainer>}
      </div>
    );
    rewardsCompleted = [];
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        centered
        variant="fullWidth"
      >
        {levels}
      </Tabs>
      {tabPanelComplete}
    </div>
  );
}

function TabContainer(props) {
  return props.children;
}

export default Rewards;

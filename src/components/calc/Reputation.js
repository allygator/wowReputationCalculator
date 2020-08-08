import React, { useEffect, useContext } from "react";

import RepLayout from "./RepLayout";
import UserContext from "../../context/UserContext";

function Repuation(props) {
  let user = useContext(UserContext);
  let localreps = user.reps;
  let setCompletedCount = props.setCompletedCount;
  useEffect(() => {
    let complete = 0;
    if (localreps.length > 0) {
      for (var faction in localreps) {
        if (localreps[faction].standing.tier === 7) {
          complete += 1;
        }
      }
    }
    setCompletedCount(complete);
    // eslint-disable-next-line
  }, [localreps]);

  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://wow.zamimg.com/widgets/power.js";
    script.async = true;

    document.body.appendChild(script);
    window.whTooltips = {
      colorLinks: false,
      iconizeLinks: true,
      renameLinks: true,
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="reputations" key="reputationPanel">
      {user.reps.length > 1 && <RepLayout />}
    </div>
  );
}

export default Repuation;

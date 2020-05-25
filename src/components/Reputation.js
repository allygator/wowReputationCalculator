import React, { useEffect } from "react";

import RepLayout from "./RepLayout";

function Repuation(props) {
  let localreps = props.reps;
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

  return (
    <div className="reputations" key="reputationPanel">
      {props.reps.length > 1 && (
        <RepLayout
          reps={localreps}
          isHorde={!props.faction}
          hideProgress={props.completed}
        />
      )}
    </div>
  );
}

export default Repuation;

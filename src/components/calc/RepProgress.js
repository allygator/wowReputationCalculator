import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";

function RepProgress(props) {
	let rep = props.rep;
	function normalise(value, max) {
		return (value / max) * 100;
	}
	let levels = [
		"hated",
		"hostile",
		"unfriendly",
		"neutral",
		"friendly",
		"honored",
		"revered",
		"exalted",
	];
	return (
		<div className="rep-progress">
			{levels.map(function (val, index) {
				let key = rep.faction.name.toLowerCase() + val;
				key = key.replace(/\s/g, "");
				if (rep.paragon && index === 0) {
					return (
						<LinearProgress
							variant="determinate"
							value={normalise(rep.paragon.value, rep.paragon.max)}
							key={key}
							className="paragon"
						/>
					);
				} else if (rep.paragon) {
					return "";
				} else if (index === rep.standing.tier) {
					return (
						<LinearProgress
							variant="determinate"
							value={normalise(rep.standing.value, rep.standing.max)}
							className={val}
							key={key}
						/>
					);
				} else if (index < rep.standing.tier) {
					return (
						<LinearProgress
							variant="determinate"
							value={100}
							className={val}
							key={key}
						/>
					);
				} else {
					return (
						<LinearProgress
							variant="determinate"
							value={-4}
							className={val}
							key={key}
						/>
					);
				}
			})}
		</div>
	);
}
export default RepProgress;

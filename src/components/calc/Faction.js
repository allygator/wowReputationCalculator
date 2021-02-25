import React, { useState, useEffect } from "react";
import RepData from "./RepData";
import RepProgress from "./RepProgress";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

function Faction(props) {
	let rep = props.rep;
	useEffect(() => {
		if (rep.faction.id === 2464) {
			//Blizzard for SOME REASON has the Court of Night rep at tier-3 what it should be. This fixes that.
			rep.standing.tier = rep.standing.tier + 3;
		}
		// eslint-disable-next-line
	}, []);
	const [hidden, setHidden] = useState(true);
	function showHidden() {
		setHidden(!hidden);
	}
	return (
		<Accordion className="repPanel" onChange={showHidden}>
			<AccordionSummary className="repName" expandIcon={<ExpandMoreIcon />}>
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
			</AccordionSummary>
			<AccordionDetails className="repDetails">
				{rep.standing.max > 0
					? rep.standing.value + "/" + rep.standing.max
					: ""}
				<RepData rep={rep.faction.id} />
			</AccordionDetails>
		</Accordion>
	);
}
export default Faction;

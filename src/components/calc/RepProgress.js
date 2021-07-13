import React, {useContext, useEffect, useState} from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import UserContext from "../../context/UserContext";
import BnetContext from "../../context/BnetContext";

const levels = [
	"hated",
	"hostile",
	"unfriendly",
	"neutral",
	"friendly",
	"honored",
	"revered",
	"exalted",
];

const default_levels = [
    {
      "name": "Hated",
      "min_value": -42000,
      "max_value": -6000,
      "id": 0
    },
    {
      "name": "Hostile",
      "min_value": -6000,
      "max_value": -3000,
      "id": 1
    },
    {
      "name": "Unfriendly",
      "min_value": -3000,
      "max_value": 0,
      "id": 2
    },
    {
      "name": "Neutral",
      "min_value": 0,
      "max_value": 3000,
      "id": 3
    },
    {
      "name": "Friendly",
      "min_value": 3000,
      "max_value": 9000,
      "id": 4
    },
    {
      "name": "Honored",
      "min_value": 9000,
      "max_value": 21000,
      "id": 5
    },
    {
      "name": "Revered",
      "min_value": 21000,
      "max_value": 42000,
      "id": 6
    },
    {
      "name": "Exalted",
      "min_value": 42000,
      "max_value": 42000,
      "id": 7
    }
  ];

function RepProgress(props) {
	let rep = props.rep;
	// if(rep.faction.id > 2400) {
	// 	console.log(rep);
	// }
	let token = useContext(BnetContext);
	let user = useContext(UserContext);
	const [final_levels, set_levels] = useState(default_levels);
	function normalise(value, max) {
		return (value / max) * 100;
	}

	function widthLen(min, max, total, hated) {
		if(min === max) {
			return "3%";
		} else if(hated) {
			if (min === -42000) {
				return Math.floor((max-min)/84000*100-6).toString()+"%";
			} else 
				return Math.floor((max-min)/84000*100+1).toString()+"%";
		} else 
			return Math.floor((max-min)/total*100).toString()+"%";
	}
	

	useEffect(() => {
		if(!levels.includes(rep.standing.name.toLowerCase())) {
			let lang = user.region === "us" ? "en_US" : "en_GB";

			fetch(
				`https://${user.region}.api.blizzard.com/data/wow/reputation-tiers/index?namespace=static-${user.region}&locale=${lang}&access_token=${token}`
			)
				.then((response) => response.json())
				.then((data) => {
					const tier_index = data.reputation_tiers.findIndex(element => element.name === rep.faction.name);
					return fetch(`https://${user.region}.api.blizzard.com/data/wow/reputation-tiers/${data.reputation_tiers[tier_index].id}?namespace=static-${user.region}&locale=${lang}&access_token=${token}`)
				})
				.then((response) => response.json())
				.then((data) => {
					set_levels(data.tiers)
				})
		}
	}, [rep, token, user]);
	
	return (
			<div className="rep-progress">
				{final_levels.map(function (val, index) {
					let key = rep.faction.name.toLowerCase() + val.name;
					key = key.replace(/\s+/g, '');
					let name = val.name.toLowerCase().replace(/\s+/g, '');
					let total = final_levels[final_levels.length-1].max_value;
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
					} 
					else if (index === rep.standing.tier) {
						return (
							<LinearProgress
								variant="determinate"
								value={normalise(rep.standing.value, rep.standing.max)}
								className={name}
								key={key}
								style={{width: widthLen(val.min_value, val.max_value, total , final_levels.length === 8)}}
							/>
						);
					} else if (index < rep.standing.tier) {
						return (
							<LinearProgress
								variant="determinate"
								value={100}
								className={name}
								key={key}
								style={{width: widthLen(val.min_value, val.max_value, total, final_levels.length === 8)}}
							/>
						);
					} else {
						return (
							<LinearProgress
								variant="determinate"
								value={-4}
								className={name}
								key={key}
								style={{width: widthLen(val.min_value, val.max_value, total, final_levels.length === 8)}}
							/>
						);
					}
				})}
			</div>
		);	
}
export default RepProgress;

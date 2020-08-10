import React, { useEffect, useContext } from "react";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import BnetContext from "../../context/BnetContext";

function Character(props) {
  // console.log(props);
  let token = useContext(BnetContext);
  useEffect(() => {
    if (token) {
      let name = props.character.name;
      let realm = props.character.realm;
      let region = props.character.region;
      let lang;
      if (region.toLowerCase() === "us") {
        lang = "en_US";
      } else {
        lang = "en_GB";
      }
      fetch(
        `https://${region}.api.blizzard.com/profile/wow/character/${realm}/${name}/achievements?namespace=profile-${region}&locale=${lang}&access_token=${token}`
      )
        .then((response) => response.json())
        .then((character) => {
          console.log(character.achievements);
          let parents = character.achievements.filter(function (ach) {
            // console.log(ach.criteria?.child_criteria);
            return ach.criteria?.child_criteria;
          });
          console.log(parents);
        });
    }
  }, [
    props.character.name,
    props.character.realm,
    props.character.region,
    token,
  ]);
  return (
    <div className="character-panel">
      {props.character?.name}
      <IconButton
        aria-label="delete"
        onClick={() => {
          props.deleteCharacter(props.index);
        }}
      >
        <DeleteIcon />
      </IconButton>
    </div>
  );
}

export default Character;

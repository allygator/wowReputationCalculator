import React, { useState, useEffect } from "react";

import Search from "../Search";
import Character from "./Character";

function Comp() {
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState("");
  function addCharacter(name, realm, region) {
    console.log(!name, !realm, !region);
    if (!name || !realm || !region) {
      setError("Please fill out all fields before adding a character");
    } else if (characters.length === 5) {
      setError(
        "You can only add 5 characters, please delete one to add another."
      );
    } else {
      setCharacters([
        ...characters,
        { name: name, realm: realm, region: region },
      ]);
      setError("");
    }
  }
  function deleteCharacter(index) {
    characters.splice(index, 1);
    setCharacters([...characters]);
    setError("");
  }

  // useEffect(() => {
  //   console.log(characters);
  // }, [characters, characters.length]);

  return (
    <div className="comp">
      <Search addCharacter={addCharacter}>
        Achievement Compare can compare up to 5 players achievements at once.
        Add each player below.
      </Search>
      {error && <div id="error">{error}</div>}
      <div id="all-characters">
        {characters.map(function (character, index) {
          return (
            <Character
              character={character}
              index={index}
              key={character.name + index}
              deleteCharacter={deleteCharacter}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Comp;

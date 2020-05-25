import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Collapse from "@material-ui/core/Collapse";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";

import RealmsList from "./Realms";
import Reputation from "./Reputation";

function Calc() {
  let { region, realm, name } = useParams();
  const [token, setToken] = useState("");
  const [options, setOptions] = useState({
    name: "",
    realm: "",
    region: "",
    hideComplete: false,
    isSubmitted: false,
    isCompleted: false,
    showSearch: true,
    thumbnail: "",
    formattedName: "",
    formattedRealm: "",
    submittedRegion: "",
    submittedRealm: "",
    submittedName: "",
    completedCount: 0,
    faction: true,
  });
  const [reps, setReps] = useState([]);

  useEffect(() => {
    if (region) {
      setOptions((o) => ({
        ...o,
        submittedRegion: region,
        submittedRealm: realm,
        submittedName: name,
        submittedisChecked: true,
        isSubmitted: true,
        showSearch: false,
      }));
    }
  }, [region, realm, name]);

  useEffect(() => {
    fetch("/.netlify/functions/gettoken")
      .then((response) => response.json())
      .then((json) => {
        setToken(json.token);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    let submittedName = options.submittedName;
    let submittedRealm = options.submittedRealm;
    let submittedRegion = options.submittedRegion;
    if (submittedName && token && submittedRegion && submittedRealm) {
      let regionFormat = submittedRegion.toLowerCase();
      let lang;
      if (regionFormat === "us") {
        lang = "en_US";
      } else {
        lang = "en_GB";
      }
      fetch(
        "https://" +
          regionFormat +
          ".api.blizzard.com/profile/wow/character/" +
          submittedRealm +
          "/" +
          submittedName +
          "/reputations?namespace=profile-" +
          regionFormat +
          "&locale=" +
          lang +
          "&access_token=" +
          token
      )
        .then((response) => response.json())
        .then((character) => {
          let alliance = character.reputations[1].faction.id === 47;
          let url =
            "https://render-" +
            regionFormat +
            ".worldofwarcraft.com/character/" +
            character.character.realm.slug +
            "/" +
            (character.character.id % 256) +
            "/" +
            character.character.id +
            "-avatar.jpg";
          setOptions((o) => ({
            ...o,
            thumbnail: url,
            formattedRealm: character.character.realm.name,
            formattedName: character.character.name,
            faction: alliance,
          }));
          setReps(character.reputations);
        });
    }
  }, [
    options.submittedName,
    token,
    options.submittedRegion,
    options.submittedRealm,
  ]);

  function setRealmData(realm, region) {
    setOptions({
      ...options,
      realm: realm,
      region: region,
    });
  }

  function setCompletedCount(number) {
    setOptions({
      ...options,
      completedCount: number,
    });
  }

  function showSearch() {
    setOptions({ ...options, showSearch: !options.showSearch });
  }

  let style = {};
  if (options.isSubmitted) {
    style.height = 0;
  }
  function enterPressed(event) {
    var code = event.keyCode || event.which;
    if (code === 13) {
      //13 is the enter keycode
      showReputations();
    }
  }
  const handleChange = (event) => {
    setOptions({ ...options, [event.target.name]: event.target.checked });
  };
  function showReputations(e) {
    setOptions({
      ...options,
      isSubmitted: true,
      showSearch: false,
      submittedName: options.name,
      submittedRealm: options.realm,
      submittedRegion: options.region,
      isCompleted: options.hideComplete,
    });
  }
  return (
    <div className="calc" id="calc">
      <div id="newSearch">
        {options.isSubmitted && (
          <Button variant="contained" id="inputButton" onClick={showSearch}>
            New Character Search
          </Button>
        )}
      </div>
      <div className="user-input-wrapper" onKeyPress={enterPressed}>
        <Collapse
          in={options.showSearch}
          style={{ style }}
          className="input-wrapper-collapse"
        >
          <div
            className={`user-input-box paper ${
              options.isSubmitted ? "" : "popout"
            } `}
          >
            <div id="selectionBoxes">
              {token && (
                <RealmsList realmSelection={setRealmData} token={token} />
              )}
              <div id="name">
                <TextField
                  id="characterName"
                  label="Character Name"
                  variant="outlined"
                  required={true}
                  onChange={(e) =>
                    setOptions({ ...options, name: e.target.value })
                  }
                  value={options.name}
                  fullWidth
                />
              </div>
            </div>
            <div id="hiddenTypes">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={options.hideComplete}
                    onChange={handleChange}
                    name="hideComplete"
                  />
                }
                label="Hide Completed Reputations"
              />
            </div>
            <Button
              variant="contained"
              id="submitButton"
              onClick={showReputations}
            >
              Submit
            </Button>
          </div>
        </Collapse>
      </div>
      <Card className={`characterCard ${options.isSubmitted ? "" : "hidden"}`}>
        <CardContent>
          <h2>{options.formattedName}</h2>
          <h3>{options.formattedRealm}</h3>
          <h3>
            {options.completedCount &&
              options.completedCount + " Completed Reputations"}
          </h3>
        </CardContent>
        {options.thumbnail && (
          <Avatar
            variant="rounded"
            alt="character thumbnail"
            src={options.thumbnail}
            id="profileIcon"
          />
        )}
      </Card>
      {options.submittedName && options.submittedRealm && token && (
        <Reputation
          completed={options.isCompleted}
          reps={reps}
          faction={options.faction}
          setCompletedCount={setCompletedCount}
        />
      )}
    </div>
  );
}

export default Calc;

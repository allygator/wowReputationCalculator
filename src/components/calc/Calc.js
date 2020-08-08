import React, { useEffect, useState } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import Collapse from "@material-ui/core/Collapse";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import clsx from "clsx";

import RealmsList from "../Realms";
import Reputation from "./Reputation";
import UserContext from "../../context/UserContext";

function Calc() {
  const location = useLocation();
  let { region, realm, name } = useParams();
  let history = useHistory();
  //BNet token
  const [token, setToken] = useState("");
  // const [reps, setReps] = useState([]);
  const [user, setUser] = useState({
    name: "",
    region: "",
    realm: "",
    faction: true,
    hideCompleted: false,
    reps: [],
  });
  const [loading, setLoading] = useState(false);
  const [inputFields, setFields] = useState({
    showSearch: true,
    name: "",
    realm: "",
    region: "",
    hideCompleted: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [thumbnail, setThumbnail] = useState("");
  const [formattedUser, setFormatted] = useState({ name: "", realm: "" });
  const [completedCount, setCount] = useState(0);

  useEffect(() => {
    if (
      region !== user.region &&
      realm !== user.realm &&
      name !== user.name &&
      region &&
      realm &&
      name
    ) {
      setLoading(true);
      let hidden = new URLSearchParams(location.search).get("hide");
      setUser((current) => ({
        ...current,
        name: name,
        region: region.toLowerCase(),
        realm: realm,
        hideCompleted: hidden,
      }));
    }
  }, [
    region,
    realm,
    name,
    user.region,
    user.realm,
    user.name,
    location.search,
  ]);

  useEffect(() => {
    fetch("/.netlify/functions/gettoken")
      .then((response) => response.json())
      .then((json) => {
        setToken(json.token);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (user.name && user.region && user.realm && token) {
      let name = user.name;
      let region = user.region;
      let realm = user.realm;
      let lang;
      if (region === "us") {
        lang = "en_US";
      } else {
        lang = "en_GB";
      }
      fetch(
        `https://${region}.api.blizzard.com/profile/wow/character/${realm}/${name}/reputations?namespace=profile-${region}&locale=${lang}&access_token=${token}`
      )
        .then((response) => response.json())
        .then((character) => {
          let isAlliance = character.reputations[1].faction.id === 47;
          let url = `https://render-${region}.worldofwarcraft.com/character/${
            character.character.realm.slug
          }/${character.character.id % 256}/${
            character.character.id
          }-avatar.jpg`;
          setThumbnail(url);
          setUser((current) => ({
            ...current,
            faction: isAlliance,
            reps: character.reputations,
          }));
          setFormatted((current) => ({
            ...current,
            realm: character.character.realm.name,
            name: character.character.name,
          }));
          setFields((fields) => ({ ...fields, showSearch: false }));
          setSubmitted(true);
        })
        .then(setLoading(false));
    }
  }, [user.name, user.realm, user.region, token]);

  function setRealmData(realm, region) {
    setFields({
      ...inputFields,
      realm: realm,
      region: region,
    });
  }

  function setCompletedCount(number) {
    setCount(number);
  }

  function showSearch() {
    setFields({ ...inputFields, showSearch: !inputFields.showSearch });
  }

  let style = {};
  if (submitted) {
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
    setFields({ ...inputFields, [event.target.name]: event.target.checked });
  };
  function showReputations(e) {
    if (inputFields.name && inputFields.realm && inputFields.region) {
      setFields({ ...inputFields, showSearch: false });
      setSubmitted(true);
      setLoading(true);
      if (inputFields.hideCompleted) {
        history.push(
          `/${inputFields.region.toLowerCase()}/${inputFields.realm}/${
            inputFields.name
          }?hide=true`
        );
      } else {
        history.push(
          `/${inputFields.region.toLowerCase()}/${inputFields.realm}/${
            inputFields.name
          }`
        );
      }
    }
  }

  return (
    <div className="calc" id="calc">
      <UserContext.Provider value={user}>
        <div id="newSearch">
          {submitted && (
            <Button variant="contained" id="inputButton" onClick={showSearch}>
              New Search
            </Button>
          )}
        </div>
        <div className="user-input-wrapper" onKeyPress={enterPressed}>
          <Collapse
            in={inputFields.showSearch}
            style={{ style }}
            className="input-wrapper-collapse"
          >
            <div
              className={clsx("user-input-box paper", !submitted && "popout")}
            >
              {submitted ? (
                ""
              ) : (
                <p>
                  RepCalc is designed as a more user friendly way of tracking
                  data about the repuations in World of Warcraft. Search your
                  character below to see your standings.
                </p>
              )}
              <div id="selectionBoxes">
                {token && inputFields.showSearch && (
                  <RealmsList realmSelection={setRealmData} />
                )}
                <div id="name">
                  <TextField
                    id="characterName"
                    label="Character Name"
                    required={true}
                    onChange={(e) =>
                      setFields({ ...inputFields, name: e.target.value })
                    }
                    value={inputFields.name}
                    fullWidth
                  />
                </div>
              </div>
              <div id="hiddenTypes">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={inputFields.hideCompleted}
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
        {user.reps.length > 0 && (
          <Card className={clsx("characterCard")}>
            <CardContent>
              <h2>{formattedUser.name}</h2>
              <h3>{formattedUser.realm}</h3>
              <h3>{completedCount > 0 && completedCount + " Completed"}</h3>
            </CardContent>
            {thumbnail && (
              <Avatar
                variant="rounded"
                alt="character thumbnail"
                src={thumbnail}
                id="profileIcon"
              />
            )}
          </Card>
        )}
        {loading ? "Loading..." : ""}
        {user.reps.length > 0 && !loading && (
          <Reputation setCompletedCount={setCompletedCount} />
        )}
      </UserContext.Provider>
    </div>
  );
}

export default Calc;

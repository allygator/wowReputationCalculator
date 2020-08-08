import React, { useState } from "react";

import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";

import RealmsList from "./Realms";

function Search(props) {
  let label = "Add";

  const [inputFields, setFields] = useState({
    name: "",
    realm: "",
    region: "",
  });

  function setRealmData(realm, region) {
    setFields({
      ...inputFields,
      realm: realm,
      region: region,
    });
  }

  const handleChange = (event) => {
    setFields({ ...inputFields, [event.target.name]: event.target.checked });
  };

  function submit() {
    props.addCharacter(inputFields.name, inputFields.realm, inputFields.region);
  }

  function enterPressed(event) {
    var code = event.keyCode || event.which;
    if (code === 13) {
      //13 is the enter keycode
      submit();
    }
  }

  return (
    <div className="search" onKeyPress={enterPressed}>
      {props?.children && <div>{props.children}</div>}
      <div id="fields">
        <RealmsList realmSelection={setRealmData} />
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
        {props?.character && (
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
        )}

        <Button variant="contained" id="submitButton" onClick={submit}>
          {label}
        </Button>
      </div>
    </div>
  );
}

export default Search;

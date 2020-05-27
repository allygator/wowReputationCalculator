import React, { useState, useEffect } from "react";
import Select from "react-select";

function RealmList(props) {
  const [options, setOptions] = useState({
    error: null,
    isLoaded: false,
    selectedRealm: "",
    selectedOption: null,
  });
  const [eu, setEU] = useState([]);
  const [us, setUS] = useState([]);

  function handleChange(selectedOption) {
    setOptions({ ...options, selectedOption: selectedOption });
    props.realmSelection(selectedOption.value, selectedOption.group);
  }

  useEffect(() => {
    fetch(
      "https://us.api.blizzard.com/data/wow/realm/index?namespace=dynamic-us&locale=en_US&access_token=" +
        props.token
    )
      .then(
        (response) => response.json(),
        (othererror) => console.log(othererror)
      )
      .then(
        (realmList) => {
          setOptions((o) => ({ ...o, isLoaded: true }));
          setUS(realmList.realms);
        },
        (error) => {
          setOptions((o) => ({ ...o, isLoaded: true, error: error }));
        }
      )
      .then(
        fetch(
          "https://eu.api.blizzard.com/data/wow/realm/index?namespace=dynamic-eu&locale=en_GB&access_token=" +
            props.token
        )
          .then(
            (response) => response.json(),
            (othererror) => console.log(othererror)
          )
          .then(
            (realmList) => {
              setOptions((o) => ({ ...o, isLoaded: true }));
              setEU(realmList.realms);
            },
            (error) => {
              setOptions((o) => ({ ...o, isLoaded: true, error: error }));
            }
          )
      )
      .then(setOptions((current) => ({ ...current, isLoaded: true })));
  }, [props.token]);

  // const portalTargetElement = document.getElementById("calc");
  const { error, isLoaded } = options;
  var USOptions = [];
  var EUOptions = [];
  for (let realm of us) {
    USOptions.push({ value: realm.slug, label: realm.name, group: "US" });
  }
  for (let realm of eu) {
    EUOptions.push({ value: realm.slug, label: realm.name, group: "EU" });
  }
  const groupedOptions = [
    {
      label: "US",
      options: USOptions,
    },
    {
      label: "EU",
      options: EUOptions,
    },
  ];
  const groupStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderBottom: "1px solid grey",
  };
  const formatGroupLabel = (data) => (
    <div style={groupStyles}>
      <span>{data.label}</span>
    </div>
  );
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <Select
        id="realmSelector"
        onChange={handleChange}
        options={groupedOptions}
        formatGroupLabel={formatGroupLabel}
        placeholder="Realm"
      />
    );
  }
}

export default RealmList;

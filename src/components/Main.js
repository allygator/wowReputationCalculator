import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Calc from "./calc/Calc";
import BnetContext from "../context/BnetContext";

function Main() {
  const [token, setToken] = useState("");

  useEffect(() => {
    fetch("/.netlify/functions/gettoken")
      .then((response) => response.json())
      .then((json) => {
        setToken(json.token);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <BnetContext.Provider value={token}>
      <Switch>
        <Redirect from="/example" to="/us/queldorei/elilla" />
        <Route path="/:region/:realm/:name" component={Calc} />
        <Route path="/" component={Calc} />
      </Switch>
    </BnetContext.Provider>
  );
}

export default Main;

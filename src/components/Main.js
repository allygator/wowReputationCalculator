import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Calc from "./Calc";

function Main() {
  return (
    <Switch>
      <Route exact path="/" component={Calc} />
      <Redirect from="/example" to="/us/queldorei/elilla" />
      <Route path="/:region/:realm/:name" component={Calc} />
    </Switch>
  );
}

export default Main;

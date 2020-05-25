import React from "react";
import logo from "../logo.svg";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

function Header() {
  return (
    <header className="App-header">
      <div className="siteInfo">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">RepCalc</h1>
      </div>
      <nav>
        <Link to="/">
          <Button variant="contained">Reputation Calculator</Button>
        </Link>
      </nav>
    </header>
  );
}

export default Header;

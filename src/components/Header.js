import React from "react";
import logo from "../logo.svg";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="App-header">
      <div className="siteInfo">
        <img src={logo} className="App-logo" alt="logo" />
        <Link to="/">
          <h1 className="App-title">RepCalc</h1>
        </Link>
      </div>
    </header>
  );
}

export default Header;

import React from "react";
import classes from "./Logo.module.css";

const Logo = (props) => {
  return (
    <ul className="navbar-nav">
      <li className="nav-item">
        <a className={"navbar-brand mr-auto " + classes.Logo} href="/">
          SM<span className={classes.Span}>ART ENE</span>RGY
        </a>
      </li>
    </ul>
  );
};

export default Logo;

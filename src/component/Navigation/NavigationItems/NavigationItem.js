import React from "react";
import { Link } from "react-router-dom";
import classes from "./NavigationItem.module.css";

const NavigationItems = (props) => {
  let Cssclass = [classes.NavigationItems];
  if (props.active) {
    Cssclass.push(classes.active);
  }
  return (
    <div className={Cssclass.join(" ")}>
      <Link to={props.link} label="Home">
        {props.title}
      </Link>
    </div>
  );
};
export default NavigationItems;

import React from "react";

import classes from "./FloatingActionButton.module.css";

const FloatingActionButton = (props) => {
  return (
    <div className={classes.FloatingActionButton} onClick={props.clicked}>
      <div>{props.children}</div>
    </div>
  );
};
export default FloatingActionButton;

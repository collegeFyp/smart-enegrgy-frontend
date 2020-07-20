import React from "react";
import NavigationItem from "../NavigationItems/NavigationItem";
import classes from "./SideNav.module.css";

const SideNav = (props) => {
  const sideNavClass = [classes.SideNav];

  if (props.sideNav) {
    sideNavClass.push(classes.Open);
  } else {
    sideNavClass.push(classes.Close);
  }
  return (
    <div className={sideNavClass.join(" ")}>
      <NavigationItem link="/" title="Home" sidenav={props.sidenav} active />
      <NavigationItem link="/" title="User" sidenav={props.sidenav} />
    </div>
  );
};
export default SideNav;

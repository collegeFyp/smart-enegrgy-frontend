import React from "react";
import classes from "./TopNav.module.css";
import Logo from "../../Logo/Logo";
import {NavLink} from 'react-router-dom'
import Aux from '../../../hoc/Aux/Aux';

const Navigation = ( props ) => {
  
  let authHeader = <Aux>
    <li className={ "nav-item " + classes.Action }>

    <NavLink
      to='/login'
      exact 
    >
        Login
    </NavLink>
    </li>
    <li className={ "nav-item " + classes.Action }>

    <NavLink
      to='/signup'
      exact
    >
        Sign Up
    </NavLink>
      </li>
  </Aux>
  if ( props.isAuthenticated ) {
    authHeader =
      <li className={ "nav-item " + classes.Action }>

      <NavLink
      to='/logout'
      exact
    >
        LogOut
    </NavLink>
      </li>
  }


  return (
    <nav className={"navbar navbar-dark bg-dark " + classes.Nav}>
      <i
        onClick={props.toggleSideNav}
        className={"fas fa-bars  " + classes.Bars}
      ></i>
      <Logo />

      <ul className="navbar-nav ml-auto">
        { authHeader}
        {/* <li className={"nav-item " + classes.Action}>
            <a className="nav-link" href="/">
              Login
            </a>
          </li> */}
      </ul>
    </nav>
  );
};
export default Navigation;

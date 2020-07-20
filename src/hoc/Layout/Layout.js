import React, { Component } from "react";
import Aux from "../Aux/Aux";
import SideNav from "../../component/Navigation/SideNav/SideNav";
import TopNav from "../../component/Navigation/Topnav/TopNav";
import { connect } from 'react-redux';


class Layout extends Component {
  state = {
    sideNav:false
  }

  toggleSideNav = () => {
    this.setState( {
      sideNav:!this.state.sideNav
    })
  }
  render() {
    return (
      <Aux>
        <TopNav isAuthenticated={ this.props.isAuthenticated } toggleSideNav={ this.toggleSideNav}/>
        { this.props.isAuthenticated
          ? <SideNav sideNav = {this.state.sideNav}/>
          : null }
        {this.props.children}
      </Aux>
    );
  }
}

const propsToState = state => {
  return {
    isAuthenticated: state.auth.token !== null

  }
}

export default connect(propsToState,null)(Layout);

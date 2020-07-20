import React, { Component } from "react";
import "./App.css";
import Layout from "./hoc/Layout/Layout";
import LoginForm from "./container/auth/LoginForm/LoginForm";
import { connect } from "react-redux";
import * as actions from "./store/action/index";
import Logout from "./container/auth/Logout/Logout";
import { Switch, Route } from "react-router-dom";
import User from "./container/Users/Users";
import Rooms from "./container/Room/Room";
import Devices from "./container/Devices/Devices";

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoLogin();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/" component={LoginForm} />
        <Route path="/login" component={LoginForm} />
        <Route path="/signup" component={LoginForm} />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={User} />
          <Route path="/rooms/:userId" exact component={Rooms} />
          <Route path="/devices/:roomId/:userId" exact component={Devices} />
        </Switch>
      );
    }

    return (
      <Layout isAuthenticated={this.props.isAuthenticated}>{routes}</Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoLogin: () => {
      dispatch(actions.autoCheckState());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);

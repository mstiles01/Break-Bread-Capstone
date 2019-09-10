import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Login from "./auth/Login";
import Register from "./auth/Register";


export default class ApplicationViews extends Component {
  isAuthenticated = () => sessionStorage.getItem("activeUser") !== null;
  activeUser = () => parseInt(sessionStorage.getItem("activeUser"));

  render() {
    console.log(this.activeUser());
    return (
      <React.Fragment>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />


      </React.Fragment>
    );
  }
}

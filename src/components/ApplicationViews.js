import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Login from "./auth/Login";
import Register from "./auth/Register";
import WelcomePage from "./welcome/WelcomePage";
import RecipeList from "./recipe/RecipeList"


export default class ApplicationViews extends Component {
  isAuthenticated = () => sessionStorage.getItem("activeUser") !== null;
  activeUser = () => parseInt(sessionStorage.getItem("activeUser"));

  render() {
    console.log(this.activeUser());
    return (
      <React.Fragment>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/welcome" component={WelcomePage} />
        <Route
          exact
          path="/recipes"
          render={props => {
            if (this.isAuthenticated()) {
              return <RecipeList activeUser={this.activeUser} {...props} />;

              // Remove null and return the component which will show news articles
            }
          }}
        />



      </React.Fragment>
    );
  }
}

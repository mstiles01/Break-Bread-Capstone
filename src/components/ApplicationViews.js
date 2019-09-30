import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Login from "./auth/Login";
import Register from "./auth/Register";
import WelcomePage from "./welcome/WelcomePage";
import RecipeList from "./recipe/RecipeList"
import RecipeDetail from "./recipe/RecipeDetail"
import MainView from "./profile/MainView"
import BookList from "./recipebook/BookList"
import RecipeBookList from "./recipebook/recipeBookList"
import ProfilePage from './profile/MainView'



export default class ApplicationViews extends Component {
  isAuthenticated = () => sessionStorage.getItem("credentials") !== null;
  activeUser = () => parseInt(sessionStorage.getItem("credentials"));

  render() {
    return (
      <React.Fragment>

        
        <Route exact path="/" render={props => {
          if (this.isAuthenticated()) {
            return <ProfilePage
              activeUser={this.activeUser}
              profile={this.profile}
              userId={parseInt(props.match.params.userId)}
              {...props}
            />
          } else {
            return <WelcomePage trigger={this.props.trigger} {...props}/>
          }
        }}  />


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

        <Route path="/recipes/:recipeId(\d+)" render={(props) => {
          // Pass the animalId to the AnimalDetailComponent
          return <RecipeDetail recipeId={parseInt(props.match.params.recipeId)} {...props} />
        }} />
        <Route
          exact
          path="/profile"
          render={props => {
            if (this.isAuthenticated()) {
              return <MainView activeUser={this.activeUser} {...props} />;
              // Remove null and return the component which will show news articles
            }
          }}
        />
        <Route
          exact
          path="/BookList"
          render={props => {
            if (this.isAuthenticated()) {
              return <BookList activeUser={this.activeUser} {...props} />;
              // Remove null and return the component which will show news articles
            }
          }}
        />
        <Route
          exact
          path="/recipeBooks/:recipeBookId(\d+)"
          render={props => {
            if (this.isAuthenticated()) {
              return <RecipeBookList activeUser={this.activeUser} bookId={parseInt(props.match.params.recipeBookId)} {...props} />;
              // Remove null and return the component which will show news articles
            }
          }}
        />





      </React.Fragment>
    );
  }
}

import React, { Component } from 'react';
import AuthenticationManager from '.././modules/AuthenticationManager';
import EditBioModal from './EditBioModal';
import ProfileManager from '../modules/ProfileManager'
import BookList from '../recipebook/BookList'
import RecipeBookManager from '../modules/RecipeBookManager'
import AddBookModal from '../recipebook/AddBookModal';
import "./ProfileStyle.css"





class MainView extends Component {
    state = {
        user: {
            username: "",
            bio: "",
            email: "",
            password: "",
        }
    }
    componentDidMount() {
        AuthenticationManager.getUser(this.props.activeUser()).then(user =>
            this.setState(user))

    }




    editBio = (obj, id) => {
        return ProfileManager.editBio(obj, id).then(() => {
            AuthenticationManager.getUser(this.props.activeUser()).then(user =>
                this.setState(user))
        })
    }

    addNewBook = recipeBooks => {
      return RecipeBookManager.postBook(recipeBooks).then(() => {
        RecipeBookManager.getAllBooks(this.props.activeUser()).then(books => {
              this.setState({
                recipeBooks: recipeBooks
              });
          });
      });

  }










    render() {
        return (
          <React.Fragment>
            <div className="profileBack">
             <div className="user__Info">
             <h1 className="username__text">User Name: <br></br>{this.state.username}</h1>
             <p className="aboutme">About Me:</p>
             <p className="aboutMeContent">
             {this.state.bio}</p>
             </div>
            <section className="edit__button__container">
              <EditBioModal editBio={this.editBio} {...this.props} />
            </section>

          <section className="recipe__book__container">
            <BookList   {...this.props}/>
          </section>
          </div>

          </React.Fragment>
        );
      }
}

export default MainView
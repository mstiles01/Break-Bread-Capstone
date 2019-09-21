import React, { Component } from 'react';
import AuthenticationManager from '.././modules/AuthenticationManager';
import EditBioModal from './EditBioModal';
import ProfileManager from '../modules/ProfileManager'
import BookList from '../recipebook/BookList'
import RecipeBookManager from '../modules/RecipeBookManager'


class MainView extends Component {
    state = {
        user: {
            username: "",
            bio: "",
            email: "",
            password: ""
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

    addNewBook = obj => {
      return RecipeBookManager.postBook(obj).then(() => {
        RecipeBookManager.getAllBooks(this.props.activeUser()).then(books => {
              this.setState({
                books: books
              });
          });
      });
  }



    render() {
        return (
          <React.Fragment>
             <div><h1>User Profile</h1></div>
             <h3>{this.state.username}</h3>
             <p>{this.state.bio}</p>
            <section className="button__container">
              <EditBioModal editBio={this.editBio} {...this.props} />
            </section>
          <section className="recipe__book__container">
            <BookList addNewBook={this.addNewBook} {...this.props}/>
          </section>

          </React.Fragment>
        );
      }
}

export default MainView
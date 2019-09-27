import React, { Component } from 'react'
import BookCard from './BookCard'
import RecipeBookManager from '../modules/RecipeBookManager'
import AddBookModal from './AddBookModal'
import './BookListStyle.css'

class BookList extends Component {
    state = {
      recipeBooks: [],

    }

   componentDidMount() {
    RecipeBookManager.getAllBooks()
    .then((recipeBooks) => {
        this.setState({
            recipeBooks: recipeBooks
        })
    })
   }

   addNewBook = obj => {
    return RecipeBookManager.postBook(obj).then(() => {
        RecipeBookManager.getAllBooks(this.props.activeUser()).then(recipeBooks => {
            this.setState({
              recipeBooks: recipeBooks
            });
        });
    });
}

   deleteRecipeBook = id => {
    return RecipeBookManager.deleteBook(id)
    .then(() => {
        RecipeBookManager.getAllBooks(()=>this.props.activeUser())
        .then((recipeBooks) => {
            this.setState({
                recipeBooks: recipeBooks
            });
        });
    });
   }

   render() {
    //  console.log(this.state.recipeBooks)
    // const activeUser = parseInt(sessionStorage.getItem("credentials"))
    // const checkUser = this.state.recipeBooks.userId === this.props.activeUser()
    return (
      <React.Fragment>
        <div className="bookListBack">
         <div className="BookHeader"><h1>Book List</h1></div>
        <section className="Addbutton__container">
          <AddBookModal addNewBook={this.addNewBook} {...this.props} />
        </section>

          <div className="Bookcard__container">
          {this.state.recipeBooks.map(recipeBook => (
          recipeBook.userId === this.props.activeUser() ?
             <div className="Bookcard__div" key={recipeBook.id}>
            <BookCard

              recipeBooks={recipeBook}
              editRecipeBook={this.editRecipeBook}
              deleteRecipeBook={this.deleteRecipeBook}
              {...this.props}
              />
              </div>
              : null
          ))}
          </div>
          </div>

      </React.Fragment>
    );
  }
}

export default BookList